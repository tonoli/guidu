import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Tooltip from '@uidu/tooltip';
import React, { Component } from 'react';
import { getProps, getStyledAvatar } from '../helpers';
import { mapProps, withPseudoState } from '../hoc';
import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import { Theme } from '../theme';
import { AvatarPropTypes } from '../types';
import { omit } from '../utils';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';
import AvatarImage from './AvatarImage';
import { propsOmittedFromClickData, validIconSizes } from './constants';
import Presence from './Presence';
import Status from './Status';

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line no-console
  }
};

class Avatar extends Component<AvatarPropTypes> {
  ref?: HTMLElement;

  static defaultProps = {
    appearance: 'circle',
    enableTooltip: true,
    size: 'medium',
  };

  createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

  clickAnalyticsCaller = () => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      return this.createAndFireEventOnAtlaskit({
        action: 'clicked',
        actionSubject: 'avatar',

        attributes: {
          componentName: 'avatar',
          packageName,
          packageVersion,
        },
      })(createAnalyticsEvent);
    }
    return undefined;
  };

  // expose blur/focus to consumers via ref
  blur = () => {
    if (this.ref) this.ref.blur();
  };

  focus = () => {
    if (this.ref) this.ref.focus();
  };

  // disallow click on disabled avatars
  // only return avatar data properties
  guardedClick = (event: KeyboardEvent | MouseEvent) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled || typeof onClick !== 'function') return;

    const item = omit(this.props, ...propsOmittedFromClickData);

    const analyticsEvent = this.clickAnalyticsCaller();

    onClick({ item, event }, analyticsEvent);
  };

  // enforce status / presence rules
  /* eslint-disable no-console */
  renderIcon = () => {
    const { appearance, borderColor, presence, status } = this.props;
    const showPresence = Boolean(presence);
    const showStatus = Boolean(status);

    // no icon needed
    if (!showStatus && !showPresence) {
      return null;
    }

    // cannot display both
    if (showStatus && showPresence) {
      warn('Avatar supports `presence` OR `status` properties, not both.');
      return null;
    }

    // only support particular sizes
    if (validIconSizes.indexOf(this.props.size) === -1) {
      warn(
        `Avatar size "${String(this.props.size)}" does NOT support ${
          showPresence ? 'presence' : 'status'
        }`,
      );
      return null;
    }

    // we can cast here because we already know that it is a valid icon size
    const { size } = this.props;

    const indicator = (() => {
      if (showPresence) {
        const customPresenceNode =
          typeof presence === 'object' ? presence : null;

        return (
          <PresenceWrapper appearance={appearance} size={size}>
            <Presence
              borderColor={borderColor}
              presence={!customPresenceNode && (presence as any)}
              size={size}
            >
              {customPresenceNode}
            </Presence>
          </PresenceWrapper>
        );
      }

      // showStatus
      const customStatusNode = typeof status === 'object' ? status : null;

      return (
        <StatusWrapper appearance={appearance} size={size}>
          <Status
            borderColor={borderColor}
            status={!customStatusNode && (status as any)}
            size={size}
          >
            {customStatusNode}
          </Status>
        </StatusWrapper>
      );
    })();

    return indicator;
  };

  setRef = (ref?: HTMLElement) => {
    this.ref = ref;
  };

  render() {
    const {
      appearance,
      enableTooltip,
      name,
      size,
      src,
      stackIndex,
      onClick,
      theme,
    } = this.props;

    // distill props from context, props, and state
    const enhancedProps: AvatarPropTypes = getProps(this);

    // provide element type based on props
    // TODO: why not enhanced props?
    const Inner: any = getStyledAvatar(this.props);

    Inner.displayName = 'Inner';

    const AvatarNode = (
      <Theme.Provider value={theme}>
        <Outer size={size} stackIndex={stackIndex}>
          <Inner
            ref={this.setRef}
            {...enhancedProps}
            onClick={onClick != null ? this.guardedClick : undefined}
          >
            <AvatarImage
              alt={name}
              appearance={appearance}
              size={size}
              src={src}
            />
          </Inner>
          {this.renderIcon()}
        </Outer>
      </Theme.Provider>
    );

    return enableTooltip && name ? (
      <Tooltip content={name} className="d-flex">
        {AvatarNode}
      </Tooltip>
    ) : (
      AvatarNode
    );
  }
}

export const AvatarWithoutAnalytics = mapProps({
  appearance: props => props.appearance || Avatar.defaultProps.appearance, // 1
  isInteractive: props =>
    Boolean(
      (typeof props.enableTooltip !== 'undefined'
        ? props.enableTooltip
        : Avatar.defaultProps.enableTooltip) && props.name,
    ), // 2
})(withPseudoState(Avatar as any));

export default withAnalyticsContext({
  componentName: 'avatar',
  packageName,
  packageVersion,
})(withAnalyticsEvents()(AvatarWithoutAnalytics));