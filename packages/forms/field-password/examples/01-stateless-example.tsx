import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { FieldPasswordStateless } from '../src';

type State = {
  value: string | number;
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
