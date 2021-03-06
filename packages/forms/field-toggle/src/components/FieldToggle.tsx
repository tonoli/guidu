import { ComponentHOC } from '@uidu/field-base';
import { ToggleStateless } from '@uidu/toggle';
import React, { PureComponent } from 'react';
import StyledWrapper from '../styled';

class FieldToggle extends PureComponent<any> {
  private element;

  static defaultProps = {
    value: false,
    className: 'list-group-item list-group-action',
    onBlur: () => {},
    onChange: () => {},
  };

  handleChange = value => {
    const { onChange, onSetValue, name } = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { onChange, onSetValue, name, value } = this.props;
    onSetValue(!value);
    onChange(name, !value);
  };

  render() {
    const { onChange, className, label, id, value, ...otherProps } = this.props;

    return (
      <StyledWrapper className={className} onClick={this.handleClick}>
        <label htmlFor={id} className="mb-0 mr-5">
          {label}
        </label>
        <ToggleStateless
          {...otherProps}
          isChecked={value}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
      </StyledWrapper>
    );
  }
}

export default ComponentHOC(FieldToggle);
