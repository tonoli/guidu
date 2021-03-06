import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React, { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  password_reset_title: {
    id: 'guidu.devise.password_reset_title',
    defaultMessage: 'Reset your password',
    description: 'password_reset_title',
  },
  password_reset_description: {
    id: 'guidu.devise.password_reset_description',
    defaultMessage: 'Choose a new password to access your account',
    description: 'password_reset_description',
  },
  password_reset_primary_cta: {
    id: 'guidu.devise.password_reset_primary_cta',
    defaultMessage: 'Confirm',
    description: 'password_reset_primary_cta',
  },
  password_reset_secondary_cta: {
    id: 'guidu.devise.password_reset_secondary_cta',
    defaultMessage: 'Sign in',
    description: 'password_reset_secondary_cta',
  },
  password_reset_password_label: {
    id: 'guidu.devise.password_reset_email_label',
    defaultMessage: 'Insert a new password',
    description: 'password_reset_email_label',
  },
});

export default class PasswordReset extends Component<any> {
  handleSubmit = model => {
    const { resetPassword, onResetPassword } = this.props;
    return resetPassword(model).then(onResetPassword);
  };

  render() {
    const { location, routes } = this.props;

    const token =
      location.search !== ''
        ? queryString.parse(location.search.slice(1)).reset_password_token
        : '';

    return (
      <Form
        handleSubmit={this.handleSubmit}
        // submitted={false}
        footerRenderer={({ canSubmit, loading }) => (
          <>
            <FormFooter className="w-100">
              <FormSubmit
                className="btn-primary w-100"
                label={
                  <FormattedMessage {...messages.password_reset_primary_cta} />
                }
                loading={loading}
                canSubmit={canSubmit}
              />
            </FormFooter>
            <Link
              to={routes.sessions}
              className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
            >
              <FormattedMessage {...messages.password_reset_secondary_cta} />
            </Link>
          </>
        )}
      >
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.password_reset_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.password_reset_description} />
          </p>
        </div>
        <FieldText
          type="hidden"
          name="user[reset_password_token]"
          value={token}
          required
        />
        <FieldPassword
          type="password"
          label={
            <FormattedMessage {...messages.password_reset_password_label} />
          }
          name="user[password]"
          required
        />
      </Form>
    );
  }
}
