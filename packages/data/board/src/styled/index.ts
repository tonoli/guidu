import { colors } from '@uidu/theme';
import styled from 'styled-components';
import { borderRadius, grid } from '../utils';

export const ParentContainer = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  overflow-x: auto;
  overflow-y: auto;
  padding: 16px 0px 0 16px;
`;

export const Container = styled.div`
  /* min-height: 100vh; */
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  height: 100%;
  display: inline-flex;
`;

export const ColumnContainer = styled.div`
  margin-right: ${grid * 2}px;
  display: flex;
  flex-direction: column;
`;

export const ColumnHeader = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.G50};
  }
`;

export const ColumnTitle = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;

const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  if (isDraggingOver) {
    return colors.R50;
  }
  if (isDraggingFrom) {
    return colors.T50;
  }
  return colors.N20;
};

export const ItemsListWrapper = styled.div<any>`
  background-color: ${props =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 20rem;
  min-width: 0;
  min-height: 0;
`;

const scrollContainerHeight: number = 400;

export const ItemsListDropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

export const ItemsListScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
export const ItemsListContainer = styled.div``;
/* stylelint-enable */

const getItemBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: any,
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.N0;
};

const getBorderColor = (isDragging: boolean, authorColors: any) =>
  isDragging ? authorColors.hard : 'transparent';

export const Item = styled.div<{
  isDragging?: boolean;
  isGroupedOver?: boolean;
  colors?: {
    hard?: string;
  };
}>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getItemBackgroundColor(
      props.isDragging,
      props.isGroupedOver,
      props.colors,
    )};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;