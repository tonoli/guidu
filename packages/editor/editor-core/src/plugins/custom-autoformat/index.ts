import { keydownHandler } from 'prosemirror-keymap';
import { EditorState, Plugin as PMPlugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import { buildHandler, completeReplacements } from './doc';
import { InputRule, triggerInputRule } from './input-rules';
import reducers from './reducers';
import {
  AutoformattingProvider,
  CustomAutoformatAction,
  CustomAutoformatState,
} from './types';
import { getPluginState, pluginKey } from './utils';

export const createPMPlugin = ({ providerFactory }: PMPluginFactoryParams) => {
  const rules: Array<InputRule> = [];

  return new PMPlugin({
    state: {
      init(): CustomAutoformatState {
        return {
          resolving: [],
          matches: [],
        };
      },

      apply(tr, prevPluginState: CustomAutoformatState): CustomAutoformatState {
        if (!prevPluginState) {
          return prevPluginState;
        }

        // remap positions
        const remappedPluginState: CustomAutoformatState = {
          ...prevPluginState,
          resolving: prevPluginState.resolving.map(candidate => ({
            ...candidate,
            start: tr.mapping.map(candidate.start),
            end: tr.mapping.map(candidate.end, -1),
          })),
        };

        const meta: CustomAutoformatAction | undefined = tr.getMeta(pluginKey);
        if (!meta) {
          return remappedPluginState;
        }

        return reducers(remappedPluginState, meta);
      },
    },
    props: {
      handleTextInput(view, from, to, text) {
        triggerInputRule(view, rules, from, to, text);
        return false;
      },
      handleKeyDown: keydownHandler({
        Enter: (_state: EditorState, _dispatch: any, view: EditorView) => {
          triggerInputRule(
            view,
            rules,
            view.state.selection.from,
            view.state.selection.to,
            '',
          );
          return false;
        },
      }),
    },

    view() {
      const handleProvider = (name: string, provider?: Promise<any>) => {
        if (name !== 'autoformattingProvider' || !provider) {
          return;
        }

        provider.then(
          async (autoformattingProvider: AutoformattingProvider) => {
            const ruleset = await autoformattingProvider.getRules();

            Object.keys(ruleset).forEach(rule => {
              const inputRule: InputRule = {
                matchTyping: new RegExp('(\\s+|^)' + rule + '(\\s)$'),
                matchEnter: new RegExp('(\\s+|^)' + rule + '()$'),
                handler: buildHandler(rule, ruleset[rule]),
              };

              rules.push(inputRule);
            });
          },
        );
      };

      providerFactory.subscribe('autoformattingProvider', handleProvider);

      return {
        update(view: EditorView) {
          const currentState = getPluginState(view.state);
          if (!currentState) {
            return;
          }

          // make replacements in document for finished autoformats
          if (currentState.matches) {
            completeReplacements(view, currentState);
          }
        },
        destroy() {
          providerFactory.unsubscribe('autoformattingProvider', handleProvider);
        },
      };
    },

    key: pluginKey,
  });
};

const customAutoformatPlugin = (): EditorPlugin => ({
  name: 'customAutoformat',

  pmPlugins() {
    return [{ name: 'customAutoformat', plugin: createPMPlugin }];
  },
});

export default customAutoformatPlugin;
