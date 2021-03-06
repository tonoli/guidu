import { AtlaskitThemeProvider } from '@uidu/theme';
import Toggle from '@uidu/toggle';
import React, { Component } from 'react';
import { getAdorableAvatar, RANDOM_USERS } from '../examples-util/data';
import AvatarGroup from '../src';

function getStatus() {
  const chance = Math.random();
  switch (true) {
    case chance < 0.25:
      return 'approved';
    case chance < 0.5:
      return 'declined';
    default:
      return 'locked';
  }
}

const data = RANDOM_USERS.slice(0, 10).map(user => ({
  ...user,
  appearance: 'circle' as AppearanceType,
  enableTooltip: true,
  size: 'medium' as SizeType,
  src: getAdorableAvatar(user.email),
  status: getStatus(),
}));

type ThemeMode = 'light' | 'dark';

interface State {
  theme: ThemeMode;
}

export default class AvatarGroupWithStatus extends Component<{}, State> {
  state = {
    theme: 'light' as ThemeMode,
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
      <AtlaskitThemeProvider mode={this.state.theme}>
        <p>Dark Mode</p>
        <Toggle onChange={this.toggleTheme} />
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={data}
          size="large"
        />
      </AtlaskitThemeProvider>
    );
  }
}
