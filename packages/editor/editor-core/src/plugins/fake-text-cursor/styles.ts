// @ts-ignore: unused variable
import { colors } from '@uidu/theme';
import { css } from 'styled-components';

export const fakeCursorStyles = css`
  .ProseMirror {
    .ProseMirror-fake-text-cursor {
      display: inline;
      pointer-events: none;
      position: relative;
      height: 15px;
    }

    .ProseMirror-fake-text-cursor::after {
      content: '';
      display: inline;
      top: 0;
      position: absolute;
      height: 100%;
      border-right: 1px solid rgba(0, 0, 0, 0.4);
    }

    .ProseMirror-fake-text-selection {
      display: inline;
      pointer-events: none;
      position: relative;
      background-color: ${colors.B75};
    }
  }
`;
