// @flow
import React from 'react';
import { uiduThemeProvider } from '@uidu/theme';
import { AkCodeBlock } from '../src';

const exampleCodeBlock = `  // React component
  class HelloMessage extends React.Component {
    render() {
      return (
        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }

  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    mountNode
  );
`;

export default function Component() {
  return (
    <uiduThemeProvider mode="dark">
      <AkCodeBlock language="java" text={exampleCodeBlock} />
    </uiduThemeProvider>
  );
}