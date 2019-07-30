import DropdownMenu from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { Search } from 'react-feather';
import { Trigger } from '../../styled';
import { FinderProps } from './types';

export default class Finder extends Component<FinderProps> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <Search strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom right"
        onOpenChange={({ isOpen }) => {
          if (isOpen) {
            setTimeout(() => this.input.current.focus(), 200);
          }
        }}
      >
        <input
          ref={this.input}
          className="form-control shadow-none border-0"
          type="search"
          name=""
          placeholder="Cerca tra i contatti..."
          onChange={onChange}
        />
      </DropdownMenu>
    );
  }
}