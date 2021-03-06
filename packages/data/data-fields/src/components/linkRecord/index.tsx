import { faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const LinkRecordField = loadable(() => import('./form'));
const LinkRecord: Field = {
  kind: 'linkRecord',
  name: (
    <FormattedMessage
      id="field.linkRecord.name"
      defaultMessage="Link to a record"
    />
  ),
  icon: <FontAwesomeIcon icon={faStream} />,
  description: (
    <FormattedMessage
      id="field.linkRecord.description"
      defaultMessage="Linked record fields contain blue tokens that represent links to other records."
    />
  ),
  form: LinkRecordField,
};

export default LinkRecord;
