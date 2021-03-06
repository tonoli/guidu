import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import {
  ShellBody,
  ShellBodyWithSidebar,
  ShellBodyWithSpinner,
  ShellHeader,
} from '@uidu/shell';
import { buildColumns } from '@uidu/table';
import React, { Component } from 'react';
import 'react-big-calendar/lib/sass/styles';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import DataManager from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: '100%',
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const dataViews = [
  {
    id: 0,
    name: 'Tutti i contatti',
    kind: 'table',
    fields: [
      'id',
      'member',
      'amount',
      'country',
      'paymentMethod',
      'firstName',
      'gender',
      'phone',
      'createdAt',
      'addField',
    ],
    state: [
      {
        colId: 'id',
        hide: false,
        aggFunc: null,
        width: 60,
        pivotIndex: null,
        pinned: 'left',
        rowGroupIndex: null,
      },
      {
        colId: 'cover',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'avatar',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'member',
        hide: false,
        aggFunc: null,
        width: 359,
        pivotIndex: null,
        pinned: 'left',
        rowGroupIndex: null,
      },
      {
        colId: 'displayName',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'amount',
        hide: false,
        aggFunc: 'sum',
        width: 224,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'country',
        hide: false,
        aggFunc: null,
        width: 369,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'percent',
        hide: true,
        aggFunc: 'avg',
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'createdAt',
        hide: false,
        aggFunc: null,
        width: 211,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'updatedAt',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'gender',
        hide: false,
        aggFunc: null,
        width: 162,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'firstName',
        hide: false,
        aggFunc: null,
        width: 177,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'donationCampaign',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'phone',
        hide: false,
        aggFunc: null,
        width: 288,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'paymentMethod',
        hide: false,
        aggFunc: null,
        width: 227,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'custom-field-1',
        hide: true,
        aggFunc: null,
        width: 200,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
      {
        colId: 'addField',
        hide: false,
        aggFunc: null,
        width: 140,
        pivotIndex: null,
        pinned: null,
        rowGroupIndex: null,
      },
    ],
    filterModel: null,
  },
  {
    id: 1,
    name: 'Bigger donations',
    kind: 'table',
    fields: [
      'country',
      'paymentMethod',
      'member',
      'amount',
      'firstName',
      'gender',
      'phone',
      'addField',
      'createdAt',
    ],
    // groupers: [{ colId: 'country' }],
    sorters: [{ colId: 'amount', sort: 'desc' }],
    filterModel: { amount: { type: 'greaterThan', filter: 100 } },
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
    fields: ['avatar', 'cover', 'member', 'amount'],
    sorters: [{ colId: 'amount', sort: 'desc' }],
  },
  {
    id: 3,
    name: 'Galleria contatti',
    kind: 'gallery',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ colId: 'amount', sort: 'desc' }],
  },
  {
    id: 17,
    name: 'Galleria contatti x5',
    preferences: { columnCount: 5 },
    kind: 'gallery',
    fields: ['member', 'amount'],
    sorters: [{ colId: 'amount', sort: 'desc' }],
  },
  {
    id: 4,
    name: 'Calendario contatti',
    kind: 'calendar',
    primaryField: 'createdAt',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 5,
    name: 'Trello contatti',
    preferences: { primaryField: 'country' },
    kind: 'board',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 6,
    name: 'Timeline',
    primaryField: 'country',
    kind: 'timeline',
    fields: ['avatar', 'member', 'amount'],
  },
];

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataViews,
      currentView: dataViews[0],
      loaded: false,
      rendered: false,
      isAutoSaving: null,
    };
  }

  toggleView = view => {
    if (view.id !== this.state.currentView.id) {
      this.setState({
        rendered: false,
        currentView: view,
      });
    }
  };

  addView = dataview => {
    const newView = {
      id: this.state.dataViews.length + 1,
      kind: dataview.kind,
      name: `New ${dataview.name}`,
      fields: [],
    };
    this.setState({
      dataViews: [...this.state.dataViews, newView],
      currentView: newView,
    });
  };

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ loaded: true, rowData }));
  }

  updateView = async (currentView, props) => {
    this.setState({ isAutoSaving: 'in-progress' });
    const dataViews = this.state.dataViews.map(item => {
      if (item.id !== currentView.id) {
        return item;
      }
      return {
        ...item,
        ...props,
      };
    });
    const updatedView = {
      ...currentView,
      ...props,
    };
    await this.setState({
      dataViews,
      isAutoSaving: 'done',
      currentView: updatedView,
    });
    return updatedView;
  };

  render() {
    const {
      loaded,
      dataViews,
      currentView,
      rowData,
      isAutoSaving,
    } = this.state;

    return (
      <IntlProvider locale="en">
        <Router>
          <DataManager
            isAutoSaving={isAutoSaving}
            key={`table-for-${this.state.currentView.id}`}
            onItemClick={console.log}
            columnDefs={buildColumns([
              {
                kind: 'default',
                name: 'Default fields',
                columns: availableColumns,
              },
              {
                kind: 'custom',
                name: 'custom fields',
                columns: [
                  {
                    dataField: 'string',
                    colId: 'custom-field-1',
                    field: 'custom-field-1',
                    headerName: 'custom field 1',
                  },
                ],
              },
              {
                kind: 'system',
                name: 'System fields',
                columns: [
                  {
                    dataFieldParams: {
                      onFieldAdd: () => window.alert('add a field'),
                    },
                    dataField: 'addField',
                    colId: 'addField',
                    headerName: 'Add field',
                  },
                ],
              },
            ])}
            rowData={rowData}
            currentView={currentView}
            updateView={this.updateView}
            onFirstDataRendered={() => this.setState({ rendered: true })}
            // onGridReady={() => this.setState({ rendered: true })}
          >
            {({ renderControls, renderView, renderSidebar }) => (
              <>
                <ShellHeader className="px-3 px-xl-4">
                  {renderControls({
                    controls: {
                      viewer: {
                        visible: true,
                      },
                      finder: {
                        visible: true,
                      },
                      more: {
                        visible: true,
                        actions: [
                          {
                            name: 'Rename',
                            rename: true,
                          },
                        ],
                      },
                    },
                  })}
                  <DropdownMenu
                    trigger={
                      <button className="btn btn-primary">Switch view</button>
                    }
                    position="bottom right"
                  >
                    <DropdownItemGroup>
                      {dataViews.map(dataView => {
                        const d = byName[dataView.kind];
                        const { icon: Icon, color } = d;
                        return (
                          <DropdownItem
                            onClick={() => this.toggleView(dataView)}
                            elemBefore={<Icon size={14} color={color} />}
                          >
                            {dataView.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownItemGroup>
                    <DropdownItemGroup title="Create new">
                      {[
                        { id: 0, kind: 'table', name: 'Table' },
                        {
                          id: 1,
                          kind: 'gallery',
                          name: 'Griglia',
                        },
                        {
                          id: 2,
                          kind: 'calendar',
                          name: 'Calendario',
                        },
                        { id: 3, kind: 'board', name: 'Kanban' },
                        {
                          id: 4,
                          kind: 'timeline',
                          name: 'Timeline',
                        },
                      ].map(view => (
                        <DropdownItem
                          onClick={() => this.addView(view)}
                          elemBefore={<PlusCircle size={14} />}
                        >
                          Add a {view.kind} view
                        </DropdownItem>
                      ))}
                    </DropdownItemGroup>
                  </DropdownMenu>
                </ShellHeader>

                <ShellBody scrollable>
                  {!loaded ? (
                    <ShellBodyWithSpinner></ShellBodyWithSpinner>
                  ) : (
                    <ShellBodyWithSidebar
                      sidebar={
                        renderSidebar() && (
                          <div className="col-sm-3">{renderSidebar({})}</div>
                        )
                      }
                    >
                      <Transition in={this.state.rendered} timeout={duration}>
                        {state => (
                          <div
                            style={{
                              ...defaultStyle,
                              ...transitionStyles[state],
                            }}
                          >
                            {renderView({
                              viewProps: {
                                gallery: {
                                  gutterSize: 24,
                                },
                                list: {
                                  rowHeight: 96,
                                },
                                board: {},
                                table: {
                                  headerHeight: 48,
                                  rowHeight: 56,
                                },
                              },
                            })}
                          </div>
                        )}
                      </Transition>
                    </ShellBodyWithSidebar>
                  )}
                </ShellBody>
              </>
            )}
          </DataManager>
        </Router>
      </IntlProvider>
    );
  }
}
