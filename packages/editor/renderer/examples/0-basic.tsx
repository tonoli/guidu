import * as React from 'react';
import RendererDemo from './helper/RendererDemo';

export default function Example() {
  return (
      <RendererDemo allowColumnSorting={true} serializer="react" />
  );
}
