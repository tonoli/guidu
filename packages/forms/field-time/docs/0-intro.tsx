import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

  Text Field provides a form input.

  ## Usage

${code`
import FieldTime, { FieldTimeStateless } from '@uidu/field-text';
`}

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/00-basic-example').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/01-stateless-example').default}
      title="Stateless Example"
      source={require('!!raw-loader!../examples/01-stateless-example')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/02-form-example').default}
      title="Form Example"
      source={require('!!raw-loader!../examples/02-form-example')}
    />
  )}


  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldTime')}
      heading="FieldTime Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldTimeStateless')}
      heading="FieldTimeStateless Props"
    />
  )}

`;
