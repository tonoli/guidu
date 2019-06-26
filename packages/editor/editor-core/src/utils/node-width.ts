import { absoluteBreakoutWidth, akEditorFullWidthLayoutWidth, gridMediumMaxWidth } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { BODIED_EXT_PADDING } from '../plugins/extension/ui/Extension/styles';
import { LAYOUT_COLUMN_PADDING, LAYOUT_OFFSET, LAYOUT_SECTION_MARGIN } from '../plugins/layout/styles';
import { WidthPluginState } from '../plugins/width';

/**
 * Calculates width of parent node of a nested node (inside layouts, extension)
 * If current node selection is not nested will return undefined
 */
export const getParentNodeWidth = (
  pos: number | undefined,
  state: EditorState,
  containerWidth: WidthPluginState,
  isFullWidthModeEnabled?: boolean,
) => {
  if (!pos) {
    return 0;
  }

  const node = getNestedParentNode(pos, state);
  if (!node) {
    return 0;
  }

  let layout = node.attrs.layout || 'default';
  const { schema } = state;
  const breakoutMark =
    schema.marks.breakout && schema.marks.breakout.isInSet(node.marks);
  if (breakoutMark && breakoutMark.attrs.mode) {
    layout = breakoutMark.attrs.mode;
  }
  let parentWidth = calcBreakoutNodeWidth(
    layout,
    containerWidth,
    isFullWidthModeEnabled,
  );

  if (node.type === schema.nodes.layoutSection) {
    parentWidth += LAYOUT_OFFSET * 2; // extra width that gets added to layout

    if (containerWidth.width > gridMediumMaxWidth) {
      parentWidth -= (LAYOUT_SECTION_MARGIN + 2) * (node.childCount - 1); // margin between sections

      const $pos = state.doc.resolve(pos);
      const column = findParentNodeOfTypeClosestToPos($pos, [
        state.schema.nodes.layoutColumn,
      ]);
      if (column && column.node && !isNaN(column.node.attrs.width)) {
        // get exact width of parent layout column using node attrs
        parentWidth = Math.round(parentWidth * column.node.attrs.width * 0.01);
      }
    }
  }

  // account for the padding of the parent node
  if (node.type === schema.nodes.layoutSection) {
    parentWidth -= LAYOUT_COLUMN_PADDING * 2;
  } else if (node.type === schema.nodes.bodiedExtension) {
    parentWidth -= BODIED_EXT_PADDING * 2;
  }

  parentWidth -= 2; // border

  return parentWidth;
};

const getNestedParentNode = (
  tablePos: number,
  state: EditorState,
): PMNode | null => {
  if (tablePos === undefined) {
    return null;
  }

  const $pos = state.doc.resolve(tablePos);
  const parent = findParentNodeOfTypeClosestToPos($pos, [
    state.schema.nodes.bodiedExtension,
    state.schema.nodes.layoutSection,
  ]);

  return parent ? parent.node : null;
};

const calcBreakoutNodeWidth = (
  layout: 'full-width' | 'wide' | string,
  containerWidth: WidthPluginState,
  isFullWidthModeEnabled?: boolean,
) => {
  return isFullWidthModeEnabled
    ? Math.min(
        containerWidth.lineLength as number,
        akEditorFullWidthLayoutWidth,
      )
    : absoluteBreakoutWidth(layout, containerWidth.width);
};
