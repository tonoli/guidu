import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const Button = styled.button`
  height: 26px;
  width: 26px;
  background: ${colors.N900};
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${colors.N0};
  cursor: pointer;
  display: block;
`;

export const ButtonWrapper = styled.span`
  border: 1px solid transparent;
  margin: 1px;
  font-size: 0;
  display: flex;
  align-items: center;
  padding: 1px;
  border-radius: 6px;
  &:hover {
    border: 1px solid ${colors.N50};
  }
`;
