import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';

const FieldLoader = ({ withLabel }) => (
  <ContentLoader
    height={withLabel ? 74 : 44}
    width={400}
    speed={2}
    backgroundColor="rgb(76, 86, 106)"
    backgroundOpacity={0.085}
    foregroungColor="rgb(76, 86, 106)"
    foregroungOpacity={0.385}
  >
    {withLabel && (
      <rect
        x="0"
        y="0"
        rx="4"
        ry="4"
        width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
        height="20"
      />
    )}
    <rect
      x="0"
      y={withLabel ? '30' : 0}
      rx="4"
      ry="4"
      width="100%"
      height="36"
    />
  </ContentLoader>
);

const CheckboxLoader = () => (
  <ContentLoader
    height={16}
    width={400}
    speed={2}
    primaryColor="rgb(76, 86, 106)"
    primaryOpacity={0.085}
    secondaryColor="rgb(76, 86, 106)"
    secondaryOpacity={0.385}
  >
    <rect x="0" y="0" rx="4" ry="4" width="16" height="16" />
    <rect
      x="22"
      rx="4"
      ry="4"
      width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
      height="16"
    />
  </ContentLoader>
);

const LoadableFieldText = (loadable as any).lib(() =>
  import('@uidu/field-text'),
);
const LoadableFieldNumber = (loadable as any).lib(() =>
  import('@uidu/field-number'),
);
const LoadableCheckbox = (loadable as any).lib(() => import('@uidu/checkbox'));
const LoadableSelect = (loadable as any).lib(() => import('@uidu/select'));
const LoadableFieldTextarea = (loadable as any).lib(() =>
  import('@uidu/field-textarea'),
);

export default class Field extends PureComponent<any> {
  static defaultProps = {
    options: [],
  };

  getValue = () => {
    const { answer } = this.props;
    return answer ? answer.value : false;
  };

  render() {
    const {
      kind,
      name,
      id,
      label,
      index,
      required,
      placeholder,
      help,
      preferences,
      options,
    } = this.props;

    const sharedProps = {
      key: `form-question-id-${id}`,
      label,
      name: name || `form_response[answers_attributes][${index}][value]`,
      required,
      placeholder,
      help,
      kind,
    };

    const selectProps = {
      options: preferences && preferences.shuffle ? options : options,
      value: this.getValue() || '',
      exposed: preferences && preferences.compact,
      shuffle: preferences && preferences.shuffle,
    };

    switch (kind) {
      case 'checkbox':
        return (
          <LoadableCheckbox fallback={<CheckboxLoader />}>
            {({ default: Checkbox }) => (
              <div className="my-3">
                <Checkbox
                  {...sharedProps}
                  {...this.props}
                  value={this.getValue() || false}
                  layout="elementOnly"
                />
              </div>
            )}
          </LoadableCheckbox>
        );
      case 'multipleSelect':
        return (
          <LoadableSelect fallback={<FieldLoader withLabel={!!label} />}>
            {({ default: Select }) => (
              <Select
                {...sharedProps}
                {...selectProps}
                {...this.props}
                isMulti
              />
            )}
          </LoadableSelect>
        );
      case 'singleSelect':
        return (
          <LoadableSelect fallback={<FieldLoader withLabel={!!label} />}>
            {({ default: Select }) => (
              <Select {...sharedProps} {...selectProps} {...this.props} />
            )}
          </LoadableSelect>
        );
      // case 'date':
      //   return <DateInput {...sharedProps} value={getValue() || false} />;
      // case 'geocoder':
      //   return <InputGeosuggest {...sharedProps} value={getValue() || ''} />;
      // case 'file':
      //   return <InputFile {...sharedProps} value={getValue() || false} />;
      case 'text':
        return (
          <LoadableFieldTextarea fallback={<FieldLoader withLabel={!!label} />}>
            {({ default: FieldTextarea }) => (
              <FieldTextarea
                {...sharedProps}
                className="form-control form-control-autosize"
                value={this.getValue() || ''}
              />
            )}
          </LoadableFieldTextarea>
        );
      case 'number':
        return (
          <LoadableFieldNumber fallback={<FieldLoader withLabel={!!label} />}>
            {({ default: FieldNumber }) => (
              <FieldNumber
                {...sharedProps}
                {...this.props}
                value={this.getValue() || null}
              />
            )}
          </LoadableFieldNumber>
        );
      // case 'short_text':
      //   return <Input {...sharedProps} type="text" value={getValue() || ''} />;
      // case 'time':
      //   return (
      //     <DateTimeInput
      //       {...sharedProps}
      //       type="text"
      //       value={getValue() || '13:00'}
      //     />
      //   );
      default:
        return (
          <LoadableFieldText fallback={<FieldLoader withLabel={!!label} />}>
            {({ default: FieldText }) => (
              <FieldText
                {...sharedProps}
                {...this.props}
                type={kind}
                value={this.getValue() || ''}
              />
            )}
          </LoadableFieldText>
        );
    }
  }
}
