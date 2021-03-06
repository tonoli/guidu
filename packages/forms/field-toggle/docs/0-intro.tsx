import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  A Toggle component. It is a checkbox displayed in an alternative way.

  ## Usage

  ${code`import FieldToggle from '@uidu/field-toggle';`}

  The default export is a component that you can control and listen to events.

  ${(
    <Example
      packageName="@uidu/field-toggle"
      Component={require('../examples/0-stateful').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-stateful')}
    />
  )}

  ${(
    <Props
      heading="Toggle Default Props"
      props={require('!!extract-react-types-loader!../src/components/FieldToggle')}
    />
  )}
`;
