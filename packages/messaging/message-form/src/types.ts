import { Message, MessageableProps } from '@uidu/message';
import * as React from 'react';
import { MentionProps } from 'react-mentions';

export type MessageFormActionProps = {
  /** The base styling to apply to the button. */
  name: string | React.ElementType;
  /** The base styling to apply to the button. */
  props: any;
};

export type MessageFormActionsProps = {
  /** The base styling to apply to the button. */
  name: string;
  /** The base styling to apply to the button. */
  children: Array<MessageFormActionProps>;
};

export type MessageFormProps = {
  /** The base styling to apply to the button. */
  actions?: Array<MessageFormActionsProps>;
  /** The base styling to apply to the button. */
  placeholder?: string;
  /** The base styling to apply to the button. */
  messageable: MessageableProps;
  /** The base styling to apply to the button. */
  message: Message;
  /** The base styling to apply to the button. */
  mentionables?: Array<MentionProps>;
  /** The base styling to apply to the button. */
  createMessage?: (messageable: MessageableProps, model: any) => any;
  /** The base styling to apply to the button. */
  updateMessage?: (
    messageable: MessageableProps,
    message: Message,
    model: any,
  ) => any;
  onReplyDismiss?: (event: React.MouseEvent) => void;
  /** The base styling to apply to the button. */
  onDismiss: () => void;
  /** The base styling to apply to the button. */
  onSubmit: () => void;
  /** The base styling to apply to the button. */
  attachments: Array<any>;
};

export type MessageFormState = {
  /** The base styling to apply to the button. */
  submitted: boolean;

  emojiPicker: boolean;

  submitLabel?: React.ReactElement;
};
