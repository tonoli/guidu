import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Trigger } from '../styled';
import { TimeFrameProps } from '../types';

export default class TimeFrame extends Component<TimeFrameProps> {
  render() {
    const {
      timeframes,
      activeTimeFrame,
      handleDateChange,
      onChange,
      from,
      to,
    } = this.props;
    console.log(this.props);

    const currentTimeFrame =
      typeof activeTimeFrame == 'string'
        ? timeframes.filter(t => t.key === activeTimeFrame)[0]
        : activeTimeFrame;

    return (
      <>
        <DropdownMenu
          trigger={
            <Trigger activeBg="#d0f0fd" className="btn">
              <span style={{ textTransform: 'initial' }}>
                {currentTimeFrame.key ? currentTimeFrame.name : 'Custom'}
              </span>
            </Trigger>
          }
          boundariesElement="scrollParent"
        >
          <DropdownItemGroup>
            {timeframes.map(timeframe => (
              <DropdownItem
                key={timeframe.key}
                onClick={e => {
                  e.preventDefault();
                  onChange(timeframe.key);
                }}
                isSelected={
                  currentTimeFrame.key && timeframe.key === currentTimeFrame.key
                }
              >
                {timeframe.name}
              </DropdownItem>
            ))}
          </DropdownItemGroup>
        </DropdownMenu>
        {/* <div className="d-flex">
          <FieldDateRangeStateless
            name="f"
            layout="elementOnly"
            from={from.toDate()}
            to={to.toDate()}
            onChange={handleDateChange}
            displayFormat="DD/MM/YY"
          />
        </div> */}
      </>
    );
  }
}
