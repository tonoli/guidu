import React, { Component } from 'react';
import NodeResolver from 'react-node-resolver';
import { TargetConsumer } from './SpotlightManager';

type Props = {
  /** a single child */
  children: React.ReactNode;
  /** the name to reference from Spotlight */
  name: string;
};

class SpotlightTarget extends Component<Props> {
  render() {
    return (
      <TargetConsumer>
        {targetRef =>
          targetRef ? (
            <NodeResolver innerRef={(targetRef as any)(this.props.name)}>
              {this.props.children}
            </NodeResolver>
          ) : (
            this.props.children
          )
        }
      </TargetConsumer>
    );
  }
}
export default SpotlightTarget;
