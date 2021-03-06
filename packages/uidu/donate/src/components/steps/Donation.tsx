import FieldDownshift from '@uidu/field-downshift';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import Select from '@uidu/select';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Check } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Menu = props => <div className="card-deck" {...props} />;

function Item({
  item,
  highlightedIndex,
  index,
  selectedItem,
  onClick,
  scope = 'donations',
  ...rest
}) {
  console.log(selectedItem);

  const isSelected = selectedItem && selectedItem.id === item.id;
  const isHighlighted = highlightedIndex === index;

  return (
    <a
      key={index}
      href="#"
      className={classNames('card mb-3', {
        [`border-${scope}`]: isHighlighted || isSelected,
      })}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      {...rest}
    >
      <div className="card-header position-absolute w-100 bg-transparent border-0 text-right p-2">
        <span
          className={classNames('', {
            border: !isSelected,
            [`bg-${scope} text-white`]: isSelected,
          })}
          style={{
            height: 20,
            width: 20,
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
          }}
        >
          {isSelected && <Check size={16} />}
        </span>
      </div>
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center">
          {item.before && <div className="mr-3">{item.before}</div>}
          <div>
            <h4 className="m-0">{item.amount} €</h4>
            <h6 className="m-0">{item.name}</h6>
            {item.description && (
              <p className="mb-0 mt-1 text-muted">{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Donation({
  providers = [],
  pledges = [],
  currency = '€',
  onSave,
}) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [recurrence, setRecurrence] = useState('month');
  const [customAmount, setCustomAmount] = useState(null);

  const handleSubmit = async model => onSave(model);

  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <FormSubmit
          label={
            <FormattedMessage
              id="guidu.donate.donation.submit"
              defaultMessage={`Donate {selectedAmount} {recurrence, select,
                once {}
                month {each month}
              }`}
              values={{ selectedAmount: selectedAmount?.amount, recurrence }}
            />
          }
          loading={loading}
          canSubmit={canSubmit}
          className="px-5 btn-donations btn-block mb-3"
        />
      )}
    >
      <Select
        options={[
          {
            id: 'once',
            name: (
              <FormattedMessage
                defaultMessage="Once"
                id="guidu.donate.recurrence.once"
              />
            ),
          },
          {
            id: 'month',
            name: (
              <FormattedMessage
                defaultMessage="Monthly"
                id="guidu.donate.recurrence.monthly"
              />
            ),
          },
        ]}
        label={
          <FormattedMessage
            defaultMessage="Frequency"
            id="guidu.donate.recurrence.label"
          />
        }
        name="donation[recurrence]"
        value={recurrence}
        onChange={(_name, value) => setRecurrence(value)}
        required
      />
      {recurrence === 'month' && (
        <div className="alert alert-warning">
          <FormattedMessage
            defaultMessage="You can edit your recurring donation anytime"
            id="guidu.donate.recurring.warning"
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="donation[amount]" className="form-label mb-2">
          <FormattedMessage
            defaultMessage="Donation amount"
            id="guidu.donate.donation.amount.label"
          />
        </label>
        <FieldDownshift
          layout="elementOnly"
          name="donation[amount]"
          items={pledges}
          onChange={(_name, value) => {
            setCustomAmount(null);
            setSelectedAmount(value);
          }}
          value={customAmount ? null : selectedAmount}
          item={foo => <Item {...foo} />}
          menu={Menu}
          required={!customAmount}
        />
        <FormattedMessage
          defaultMessage="Or choose your donation amount"
          id="guidu.donate.amount.custom"
        >
          {placeholder => (
            <FieldText
              addonBefore={<span className="input-group-text">{currency}</span>}
              type="number"
              placeholder={placeholder}
              name="donation[amount]"
              layout="elementOnly"
              onChange={(_name, value) => {
                setCustomAmount(value);
                setSelectedAmount({ amount: value });
              }}
              value={selectedAmount?.amount}
              min="5"
              required
              {...(recurrence === 'month' && {
                addonAfter: (
                  <span className="input-group-text">
                    <FormattedMessage
                      defaultMessage="Monthly"
                      id="guidu.donate.recurrence.monthly"
                    />
                  </span>
                ),
              })}
            />
          )}
        </FormattedMessage>
      </div>
      <Select
        name="donation[payment_method]"
        label={
          <FormattedMessage
            defaultMessage="Payment method"
            id="guidu.donate.paymentMethod.label"
          />
        }
        options={providers}
        value={providers[0].id}
        required
      />
    </Form>
  );
}
