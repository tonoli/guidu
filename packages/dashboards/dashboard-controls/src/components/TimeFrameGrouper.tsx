import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Server } from 'react-feather';
import { Trigger } from '../styled';
import { TimeFrameGrouperProps } from '../types';
import DropdownMenu from '../utils/DropdownMenu';

export default class TimeFrameGrouper extends Component<TimeFrameGrouperProps> {
  render() {
    const { groupers, onChange, activeGrouper } = this.props;
    const currentGrouper =
      groupers.filter(g => g.key === activeGrouper)[0] || groupers[0];

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d0f0fd" className="btn ml-3">
            <Server strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              {currentGrouper.name}
            </span>
          </Trigger>
        }
      >
        <DropdownItemGroup>
          {groupers.map(timeframeGrouper => (
            <DropdownItem
              key={timeframeGrouper.key}
              onClick={e => {
                e.preventDefault();
                onChange(timeframeGrouper.key);
              }}
            >
              {timeframeGrouper.name}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
