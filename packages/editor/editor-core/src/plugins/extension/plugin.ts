import { ExtensionLayout } from '@atlaskit/adf-schema';
import { ExtensionHandlers, ProviderFactory } from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { findDomRefAtPos, findSelectedNodeOfType } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../components/PortalProvider';
import { Dispatch } from '../../event-dispatcher';
import { ExtensionConfig } from '../../types';
import { closestElement } from '../../utils';
import ExtensionNodeView from './nodeviews/extension';
import { getExtensionNode } from './utils';

export const pluginKey = new PluginKey('extensionPlugin');

export type ExtensionState = {
  element: HTMLElement | undefined;
  layout: ExtensionLayout;
  node: { pos: number; node: PMNode };
  allowBreakout: boolean;
  stickToolbarToBottom: boolean;
};

export default (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
  portalProviderAPI: PortalProviderAPI,
  allowExtension?: ExtensionConfig | boolean,
) =>
  new Plugin({
    state: {
      init: () => {
        let stickToolbarToBottom = true;
        let allowBreakout = false;

        if (typeof allowExtension === 'object') {
          stickToolbarToBottom = !!allowExtension.stickToolbarToBottom;
          allowBreakout = !!allowExtension.allowBreakout;
        }

        return {
          element: null,
          layout: 'default',
          showLayoutOptions: true,
          stickToolbarToBottom,
          node: null,
          allowBreakout,
        };
      },
      apply(tr, state: ExtensionState) {
        const nextPluginState = tr.getMeta(pluginKey);
        if (nextPluginState) {
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }

        return state;
      },
    },
    view: (editorView: EditorView) => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      return {
        update: (view: EditorView) => {
          const {
            dispatch: editorDispatch,
            state,
            state: { schema },
          } = view;

          /** this fetches the selected extn node, either by keyboard selection or click for all types of extns */
          const selectedExtNode = getExtensionNode(state);
          const selectedExtDomNode =
            selectedExtNode &&
            (findDomRefAtPos(selectedExtNode.pos, domAtPos) as HTMLElement);
          const pluginState = pluginKey.getState(state);

          if (!selectedExtNode && !pluginState.element) {
            return undefined;
          }

          const { extension, inlineExtension } = schema.nodes;

          const isNonContentExt = findSelectedNodeOfType([
            inlineExtension,
            extension,
          ])(state.selection);

          /** Non-content extension can be nested in bodied-extension, the following check is necessary for that case */
          const newElement =
            selectedExtNode && selectedExtDomNode!.querySelector
              ? isNonContentExt
                ? selectedExtDomNode!.querySelector('.extension-container') ||
                  selectedExtDomNode
                : closestElement(selectedExtDomNode!, '.extension-container') ||
                  selectedExtDomNode!.querySelector('.extension-container') ||
                  selectedExtDomNode
              : undefined;

          if (pluginState.element !== newElement) {
            editorDispatch(
              state.tr.setMeta(pluginKey, {
                ...pluginState,
                element: newElement,
                layout: selectedExtNode && selectedExtNode!.node.attrs.layout,
                node: selectedExtNode,
              }),
            );
            return true;
          }

          /** Required toolbar re-positioning */
          dispatch(pluginKey, {
            ...pluginState,
          });
          return true;
        },
      };
    },
    key: pluginKey,
    props: {
      nodeViews: {
        extension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        bodiedExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        inlineExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
      },
    },
  });