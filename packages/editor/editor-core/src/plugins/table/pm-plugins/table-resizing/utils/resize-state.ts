import { tableCellMinWidth } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { insertColgroupFromNode } from './colgroup';
import {
  ColumnState,
  getCellsRefsInColumn,
  getColumnStateFromDOM,
} from './column-state';
import { growColumn, shrinkColumn } from './resize-logic';

export interface ResizeState {
  cols: ColumnState[];
  maxSize: number;
  colgroupChildren: HTMLCollection;
}

export const getResizeStateFromDOM = ({
  minWidth,
  maxSize,
  table,
  tableRef,
  start,
  domAtPos,
}: {
  minWidth: number;
  maxSize: number;
  table: PMNode;
  tableRef: HTMLTableElement;
  start: number;
  domAtPos: (pos: number) => { node: Node; offset: number };
}): ResizeState => {
  const colgroupChildren = insertColgroupFromNode(tableRef, table);

  return {
    // update state from DOM
    cols: Array.from(colgroupChildren).map((_, index) => {
      const cellsRefs = getCellsRefsInColumn(index, table, start, domAtPos);
      return getColumnStateFromDOM(cellsRefs, index, minWidth);
    }),
    maxSize,
    colgroupChildren,
  };
};

// Resize a given column by an amount from the current state
export const resizeColumn = (
  resizeState: ResizeState,
  colIndex: number,
  amount: number,
  selectedColumns?: number[],
): ResizeState => {
  const newState =
    amount > 0
      ? growColumn(resizeState, colIndex, amount, selectedColumns)
      : amount < 0
      ? shrinkColumn(resizeState, colIndex, amount, selectedColumns)
      : resizeState;

  updateColgroup(newState);

  return newState;
};

// updates Colgroup DOM node with new widths
export const updateColgroup = (state: ResizeState): void => {
  state.cols
    .filter(column => !!column.width) // if width is 0, we dont want to apply that.
    .forEach((column, i) => {
      (state.colgroupChildren[
        i
      ] as HTMLElement).style.width = `${column.width}px`;
    });
};

export const getTotalWidth = ({ cols }: ResizeState): number => {
  return cols.reduce((totalWidth, col) => totalWidth + col.width, 0);
};

// adjust columns to take up the total width
// difference in total columns widths vs table width happens due to the "Math.floor"
export const adjustColumnsWidths = (
  resizeState: ResizeState,
  maxSize: number,
): ResizeState => {
  const totalWidth = getTotalWidth(resizeState);
  const diff = maxSize - totalWidth;
  if (diff > 0 || (diff < 0 && Math.abs(diff) < tableCellMinWidth)) {
    let updated = false;
    return {
      ...resizeState,
      cols: resizeState.cols.map(col => {
        if (!updated && col.width + diff > col.minWidth) {
          updated = true;
          return { ...col, width: col.width + diff };
        }
        return col;
      }),
    };
  }

  return resizeState;
};

export const evenAllColumnsWidths = (resizeState: ResizeState): ResizeState => {
  const maxSize = getTotalWidth(resizeState);
  const evenWidth = Math.floor(maxSize / resizeState.cols.length);
  const cols = resizeState.cols.map(col => ({ ...col, width: evenWidth }));

  return adjustColumnsWidths({ ...resizeState, cols }, maxSize);
};

export const bulkColumnsResize = (
  resizeState: ResizeState,
  columnsIndexes: number[],
  sourceColumnIndex: number,
) => {
  const currentTableWidth = getTotalWidth(resizeState);
  const colIndex =
    columnsIndexes.indexOf(sourceColumnIndex) > -1
      ? sourceColumnIndex
      : sourceColumnIndex + 1;
  const sourceCol = resizeState.cols[colIndex];
  const seenColumns: {
    [key: number]: { width: number; minWidth: number; index: number };
  } = {};
  const widthsDiffs: number[] = [];
  const cols = resizeState.cols.map(col => {
    if (columnsIndexes.indexOf(col.index) > -1) {
      const diff = col.width - sourceCol.width;
      if (diff !== 0) {
        widthsDiffs.push(diff);
      }
      return { ...col, width: sourceCol.width };
    }
    return col;
  });

  let newState = {
    ...resizeState,
    cols: cols.map(col => {
      if (
        columnsIndexes.indexOf(col.index) > -1 ||
        // take from prev columns only if dragging the first handle to the left
        (columnsIndexes.indexOf(sourceColumnIndex) > -1 && col.index < colIndex)
      ) {
        return col;
      }
      while (widthsDiffs.length) {
        const diff = widthsDiffs.shift() || 0;
        const column = seenColumns[col.index] || col;
        const maybeWidth = column.width + diff;

        if (maybeWidth > column.minWidth) {
          seenColumns[column.index] = { ...column, width: maybeWidth };
        } else {
          widthsDiffs.push(maybeWidth - column.minWidth);
          seenColumns[column.index] = { ...column, width: column.minWidth };
          break;
        }
      }
      return seenColumns[col.index] || col;
    }),
  };

  // minimum possible table widths at the current layout
  const minTableWidth = resizeState.maxSize;
  // new table widths after bulk resize
  const newTotalWidth = getTotalWidth(newState);
  // when all columns are selected, what do we do when sum of columns widths is lower than min possible table widths?
  if (
    columnsIndexes.length === resizeState.cols.length &&
    newTotalWidth < minTableWidth
  ) {
    // table is not in overflow -> normal resize of a single column
    if (currentTableWidth === minTableWidth) {
      return resizeState;
    }
    // table is in overflow: keep the dragged column at its widths and evenly distribute columns
    // to recover from overflow state
    else {
      const columnWidth = Math.floor(
        (minTableWidth - sourceCol.width) / (newState.cols.length - 1),
      );
      newState = {
        ...resizeState,
        cols: newState.cols.map(col => {
          if (col.index === sourceCol.index) {
            return col;
          }

          return { ...col, width: columnWidth };
        }),
      };
    }
  }

  // fix total table widths by adding missing pixels to columns widths here and there
  return adjustColumnsWidths(newState, resizeState.maxSize);
};

export const areColumnsEven = (resizeState: ResizeState): boolean => {
  const newResizeState = evenAllColumnsWidths(resizeState);
  return newResizeState.cols.every(
    (col, i) => col.width === resizeState.cols[i].width,
  );
};
