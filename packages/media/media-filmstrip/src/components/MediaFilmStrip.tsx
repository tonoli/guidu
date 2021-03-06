import MediaCard from '@uidu/media-card';
import { ModalMediaViewer } from '@uidu/media-viewer';
import React, { Component, Fragment } from 'react';
import { FilmStrip } from '../styled';
import { MediaFilmStripProps, MediaFilmStripState } from '../types';

export default class MediaFilmStrip extends Component<
  MediaFilmStripProps,
  MediaFilmStripState
> {
  state = { currentModal: undefined };

  toggleModal = (index: number | undefined = undefined) => {
    this.setState({ currentModal: index });
  };

  render() {
    const { files, ...otherProps } = this.props;
    const { currentModal } = this.state;

    return (
      <Fragment>
        <FilmStrip>
          {files.map((image: any, index: number) => (
            <div
              key={image.id}
              style={{
                width: `calc(30% - 16px)`,
                display: 'inline-flex',
                marginRight: 8,
              }}
            >
              <MediaCard
                onOpen={() => this.toggleModal(index)}
                file={image}
                {...otherProps}
              />
            </div>
          ))}
        </FilmStrip>
        <ModalMediaViewer
          currentIndex={currentModal}
          files={files}
          onClose={() => this.toggleModal(null)}
        />
      </Fragment>
    );
  }
}
