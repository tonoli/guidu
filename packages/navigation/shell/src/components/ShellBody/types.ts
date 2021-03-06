export type ShellBodyProps = {
  /** required for managing shellbody on desktop and mobile environment */
  id?: string;
  className?: string;
  scrollable?: boolean | 'mobileOnly';
  shadowOnScroll?: boolean;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  children?: any;
};

export type ShellBodyState = {
  shadowedHeader: boolean;
};
