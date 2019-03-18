// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  This package exports an number of different Message related components:

  - Message (Default Export)
  - [MessageLog](/packages/core/message/docs/log)
  - [MessageActions](/packages/core/message/docs/actions)
  - [MessageAttachments](/packages/core/message/docs/attachments)
  - [Skeleton](/packages/core/avatar/docs/skeleton)


  Use the \`Message\` component to represent a message exhanged in teams and private messages.
  Optionally, a presence to indicate online status can also be displayed.

  You can use the \`Presence\` component independently for contexts where the
  profile picture is not required (e.g. next to a username).

  ## Usage

  ${code`import Message, {
  MessageActions,
  MessageAttachments,
  MessageLog,
} from '@uidu/message';`}

  ${(
    <Example
      packageName="@uidu/message"
      Component={require('../examples/01-basic')}
      title="Message"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}
`;

// ${(
//     <Props
//       heading="Avatar Props"
//       props={require('!!extract-react-types-loader!../src/components/Avatar')}
//     />
//   )}