import styled from 'styled-components';

export default styled.div<{ hovered: boolean; }>`
  right: 0;
  top: -25px;
  position: absolute;
  ${props => (props.hovered ? 'visibility: visible' : 'visibility: hidden')}
  ${props => (props.hovered ? 'opacity: 1' : 'opacity: 0')}
`;
