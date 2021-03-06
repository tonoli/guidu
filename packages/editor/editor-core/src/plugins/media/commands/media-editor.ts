import { MediaBaseAttributes } from '@uidu/adf-schema';
import { createCommand, getPluginState } from '../pm-plugins/media-editor';

export const openMediaEditor = (pos: number, identifier: any) =>
  createCommand({
    type: 'open',
    identifier,
    pos,
  });

export const closeMediaEditor = () =>
  createCommand({
    type: 'close',
  });

export const setMediaContext = (context?: any) =>
  createCommand({
    type: 'setContext',
    context,
  });

export const uploadAnnotation = (newIdentifier: any, newDimensions: any) =>
  createCommand(
    {
      type: 'upload',
      newIdentifier,
    },
    (tr, state) => {
      const editingMedia = getPluginState(state).editor;
      if (!editingMedia) {
        return tr;
      }

      // remap pos across transactions being applied
      const pos = tr.mapping.map(editingMedia.pos);

      // get the old media node to copy attributes; ensure it's still media
      const oldMediaNode = tr.doc.nodeAt(pos);
      const { media } = state.schema.nodes;
      if (!oldMediaNode || oldMediaNode.type !== media) {
        return tr;
      }

      // update attributes
      const attrs: MediaBaseAttributes = {
        ...oldMediaNode.attrs,

        // @atlaskit/media-editor always gives id as string (better types would be nice...)
        id: newIdentifier.id as string,
        collection:
          newIdentifier.collectionName || oldMediaNode.attrs.collection,
        occurrenceKey: newIdentifier.occurrenceKey,

        width: newDimensions.width,
        height: newDimensions.height,
      };

      return tr.setNodeMarkup(pos, undefined, attrs);
    },
  );
