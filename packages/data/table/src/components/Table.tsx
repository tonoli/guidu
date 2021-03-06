import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { AgGridReact } from '@ag-grid-community/react';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import React, { useState } from 'react';
import CustomHeader from './headers';
import { getMainMenuItems } from './menu';

const Table = ({
  theme = 'uidu',
  columnDefs,
  rowData,
  onAddField = () => {},
  rowHeight = 32,
  groupRowHeightIncrementRatio = 1.2,
  ...otherProps
}) => {
  const [scrolled, setScrolled] = useState({ left: 0, top: 0 });
  let className = '';
  if (scrolled.left > 0) {
    className += ' ag-scrolled-left';
  }
  if (scrolled.top > 0) {
    className += ' ag-scrolled-top';
  }

  return (
    <div className={`ag-theme-${theme} h-100${className}`}>
      <AgGridReact
        suppressMaxRenderedRowRestriction
        modules={[
          ClientSideRowModelModule,
          RowGroupingModule,
          MenuModule,
          CsvExportModule,
          StatusBarModule,
          RangeSelectionModule,
        ]}
        // ref={innerRef}
        // enterprise features
        // groupDefaultExpanded={-1}
        // groupUseEntireRow
        // groupIncludeFooter
        groupSuppressBlankHeader
        // suppressAggFuncInHeader
        groupSuppressAutoColumn
        // community features
        componentWrappingElement="span"
        // defaultGroupSortComparator={(valueA, valueB) => {
        //   console.log(valueA);
        //   if (valueA === null) {
        //     return -1;
        //   }
        //   if (valueB === null) {
        //     return 1;
        //   }

        //   console.log(valueA);

        //   return +valueA.momentObj - +valueB.momentObj;
        // }}
        columnDefs={columnDefs.map(columnDef => ({
          ...columnDef,
          cellStyle: params => {
            return {
              ...columnDef.cellStyle,
              // account for borders
              lineHeight: `${
                params.node.group
                  ? rowHeight * groupRowHeightIncrementRatio - 2
                  : rowHeight - 2
              }px`,
            };
          },
          cellClassRules: {
            ...columnDef.cellClassRules,
            'ag-cell-sorter-active': params => {
              return params.api
                .getSortModel()
                .map(s => s.colId)
                .includes(params.colDef.colId);
            },
            'ag-cell-filter-active': params => {
              return Object.keys(params.api.getFilterModel()).includes(
                params.colDef.colId,
              );
            },
            'ag-cell-grouper-active': params => {
              return params.columnApi
                .getRowGroupColumns()
                .map(g => g.colId)
                .includes(params.colDef.colId);
            },
          },
        }))}
        rowData={rowData}
        animateRows
        enableCellChangeFlash
        suppressContextMenu
        getMainMenuItems={getMainMenuItems}
        getRowHeight={params => {
          if (params.node.group) {
            return rowHeight * groupRowHeightIncrementRatio;
          } else {
            return rowHeight;
          }
        }}
        defaultColDef={{
          resizable: true,
          sortable: true,
          editable: false,
          suppressMenu: false,
          headerComponentFramework: CustomHeader,
          minWidth: 140,
        }}
        columnTypes={{
          avatar: {},
          addField: {},
          address: {},
          attachments: {},
          checkbox: {},
          contact: {},
          country: {},
          cover: {},
          currency: {},
          date: {},
          default: {},
          email: {},
          linkRecord: {},
          member: {},
          multipleSelect: {},
          number: {},
          paymentMethod: {},
          percent: {},
          phone: {},
          primary: {},
          progress: {},
          rating: {},
          singleSelect: {},
          string: {},
          text: {},
          uid: {},
          url: {},
          vote: {},
        }}
        rowHeight={rowHeight}
        onBodyScroll={({ left, top }) => setScrolled({ left, top })}
        {...otherProps}
      />
    </div>
  );
};

export default Table;
