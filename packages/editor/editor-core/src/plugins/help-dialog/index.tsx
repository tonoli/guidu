import { keymap } from 'prosemirror-keymap';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import * as React from 'react';
import { analyticsService } from '../../analytics';
import WithPluginState from '../../components/WithPluginState';
import * as keymaps from '../../keymaps';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../plugins/analytics';
import { EditorPlugin } from '../../types';
import { pluginKey as quickInsertPluginKey } from '../quick-insert';
import { HelpDialogLoader } from './ui/HelpDialogLoader';

export const pluginKey = new PluginKey('helpDialogPlugin');

export const openHelpCommand = (tr: Transaction, dispatch?: Function): void => {
  tr = tr.setMeta(pluginKey, true);
  if (dispatch) {
    dispatch(tr);
  }
};

export const closeHelpCommand = (tr: Transaction, dispatch: Function): void => {
  tr = tr.setMeta(pluginKey, false);
  dispatch(tr);
};

export const stopPropagationCommand = (e: Event): void => e.stopPropagation();

export function createPlugin(dispatch: Function, imageEnabled: boolean) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return { isVisible: false, imageEnabled };
      },
      apply(tr: Transaction, _value: any, state: EditorState) {
        const isVisible = tr.getMeta(pluginKey);
        const currentState = pluginKey.getState(state);
        if (isVisible !== undefined && isVisible !== currentState.isVisible) {
          const newState = { ...currentState, isVisible };
          dispatch(pluginKey, newState);
          return newState;
        }
        return currentState;
      },
    },
  });
}

const helpDialog = (): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'helpDialog',
        plugin: ({ dispatch, props: { legacyImageUploadProvider } }) =>
          createPlugin(dispatch, !!legacyImageUploadProvider),
      },
      {
        name: 'helpDialogKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },

  contentComponent({ editorView, appearance }) {
    return (
      <WithPluginState
        plugins={{
          helpDialog: pluginKey,
          quickInsert: quickInsertPluginKey,
        }}
        render={({ helpDialog = {} as any, quickInsert }) => (
          <HelpDialogLoader
            appearance={appearance}
            editorView={editorView}
            isVisible={helpDialog.isVisible}
            quickInsertEnabled={!!quickInsert}
            imageEnabled={helpDialog.imageEnabled}
          />
        )}
      />
    );
  },
});

const keymapPlugin = (): Plugin => {
  const list = {};
  keymaps.bindKeymapWithCommand(
    keymaps.openHelp.common!,
    (state, dispatch) => {
      let { tr } = state;
      const isVisible = tr.getMeta(pluginKey);
      if (!isVisible) {
        analyticsService.trackEvent('atlassian.editor.help.keyboard');
        tr = addAnalytics(tr, {
          action: ACTION.CLICKED,
          actionSubject: ACTION_SUBJECT.BUTTON,
          actionSubjectId: ACTION_SUBJECT_ID.BUTTON_HELP,
          attributes: { inputMethod: INPUT_METHOD.SHORTCUT },
          eventType: EVENT_TYPE.UI,
        });
        openHelpCommand(tr, dispatch);
      }
      return true;
    },
    list,
  );
  return keymap(list);
};

export default helpDialog;