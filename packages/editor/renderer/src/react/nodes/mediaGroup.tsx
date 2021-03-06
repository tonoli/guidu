import MediaFilmStrip from '@uidu/media-filmstrip';
import * as React from 'react';
import { PureComponent } from 'react';

export default class MediaGroup extends PureComponent<any> {
  render() {
    const content = this.renderStrip();
    return <div className="MediaGroup">{content}</div>;
  }

  renderStrip() {
    return <MediaFilmStrip files={[]}></MediaFilmStrip>;
  }
}
