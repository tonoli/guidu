// @flow
import React, { Component } from 'react';
import { FieldPasswordStateless } from '../src';
import { inputDefaultProps } from '../examples-utils';

type State = {
  value: string | number,
};

export default class StatelessExample extends Component<void, State> {
  state = {
    value: '',
  };

  setValue = (e: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({ value: e.target.value });

  render() {
    return (
      <FieldPasswordStateless
        {...inputDefaultProps}
        label="Stateless Text Input Example"
        onChange={this.setValue}
        value={this.state.value}
      />
    );
  }
}