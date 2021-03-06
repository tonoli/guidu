import { ShellBody, ShellHeader } from '@uidu/shell';
import React from 'react';

export default function DrawerLayout({ children, name }) {
  return (
    <>
      <ShellHeader className="px-3 px-xl-4">
        <h5 className="m-0">{name}</h5>
      </ShellHeader>
      <ShellBody scrollable>{children}</ShellBody>
    </>
  );
}
