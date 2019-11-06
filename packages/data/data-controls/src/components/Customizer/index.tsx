import {
  DropdownItemGroupCheckbox,
  withToggleInteraction,
} from '@uidu/dropdown-menu';
import Item, { withItemFocus } from '@uidu/item';
import { ToggleStateless } from '@uidu/toggle';
import React, { Component } from 'react';
import { Settings } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DropdownMenu from '../../utils/DropdownMenu';

const DropdownItem = withToggleInteraction(
  withItemFocus(Item),
  ({ isSelected }) => {
    return (
      <ToggleStateless isChecked={isSelected} className="mr-2" size="xsmall" />
    );
  },
  () => 'checkbox',
);

export default class Toggler extends Component<any> {
  render() {
    const { columnDefs, onSortEnd, onToggle, api } = this.props;

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn">
            <Settings strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              <FormattedMessage
                id="guidu.data_controls.toggler.label"
                defaultMessage="Customize"
              />
            </span>
          </Trigger>
        }
      >
        <DropdownItemGroupCheckbox id="columnDefs">
          {columnDefs
            .filter(f => !f.pinned)
            .map(columnDef => (
              <DropdownItem
                id={columnDef.colId}
                defaultSelected
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle(columnDef.colId, !!columnDef.hide);
                }}
              >
                <div style={{ maxWidth: 160 }} className="text-truncate">
                  {columnDef.headerComponentParams &&
                  columnDef.headerComponentParams.menuIcon ? (
                    <small className="mr-2">
                      {columnDef.headerComponentParams.menuIcon}
                    </small>
                  ) : null}
                  {columnDef.headerName}
                </div>
              </DropdownItem>
            ))}
        </DropdownItemGroupCheckbox>
      </DropdownMenu>
    );
  }
}
