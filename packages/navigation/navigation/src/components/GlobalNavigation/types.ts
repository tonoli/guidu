export type GlobalNavigationProps = {
  style?: CSS;
  body?: Array<any>;
  backgroundColor: string;
  footer?: Array<any>;
  header?: any;
  isOpen?: boolean;
  width: string;
  navigationWidth: number;
  navigationMinWidth?: string;
  showOverlay: boolean;
  showAfter?: number;
};

export type GlobalNavigationState = {
  isOpen: boolean;
};
