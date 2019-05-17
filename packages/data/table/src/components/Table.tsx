import loadable from '@loadable/component';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';

const AgGridReact = (loadable as any).lib(() => import('ag-grid-react'));

export default class Table extends Component<any> {
  static defaultProps = {
    theme: 'balham',
  };

  render() {
    const { theme, innerRef } = this.props;
    return (
      <div className={`ag-theme-${theme} h-100`}>
        <AgGridReact fallback={<div>Loading...</div>}>
          {({ AgGridReact: Grid }) => (
            <Grid
              ref={innerRef}
              columnDefs={this.props.columnDefs}
              rowData={this.props.rowData}
              reactNext
              animateRows
              onGridReady={({ columnApi }) => columnApi.autoSizeAllColumns()}
              defaultColDef={{
                resizable: true,
                sortable: true,
                suppressMenu: true,
                editable: true,
              }}
              rowHeight={32}
              {...this.props}
            />
          )}
        </AgGridReact>
      </div>
    );
  }
}
