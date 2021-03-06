import Contact from '@uidu/contact';
import { Shell } from '@uidu/widgets';
// import AnimatedCheck from 'components/AnimatedCheck';
// import ContactForm from 'organization/components/contacts/form';
import React, { Component } from 'react';
import { ArrowLeft, X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DonateProps, DonateState } from '../types';
import Confirmation from './steps/Confirmation';
import Donation from './steps/Donation';
import Pay from './steps/Pay';
import Preferences from './steps/Preferences';

export default class Donate extends Component<DonateProps, DonateState> {
  private slider = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      donation: props.donation,
      activeSlide: 0,
      provider: null,
    };
  }

  createDonation = token => {
    const { donationCampaign, onCreate } = this.props;
    const { donation } = this.state;
    console.log(token);
    return onCreate(donation, token);
    // return apiCall(
    //   'post',
    //   donation.recurrence === 'month'
    //     ? `/campaigns/${donationCampaign.id}/subscriptions`
    //     : `/campaigns/${donationCampaign.id}/donations`,
    //   {
    //     stripeToken: token.id,
    //     card: token.card,
    //     donation,
    //   },
    // )
    //   .then(response => {
    //     this.setState(
    //       {
    //         donation: response.data,
    //         paymentFormSubmitted: true,
    //         paymentFormError: null,
    //       },
    //       () => this.slider.next(),
    //     );
    //   })
    //   .catch(error => {
    //     this.setState({
    //       paymentFormSubmitted: true,
    //       paymentFormError: error.response.data.error.message,
    //     });
    //   });
  };

  render() {
    const {
      currentMember,
      currentOrganization,
      donationCampaign,
      providers,
      stripe,
    } = this.props;
    const { donation, activeSlide } = this.state;

    const slides = [
      {
        key: 'donation',
        header: {
          itemBefore: (
            <div className="navbar-header">
              <a className="navbar-brand d-flex align-items-center">
                <X />
              </a>
            </div>
          ),
          name: (
            <FormattedMessage
              defaultMessage="Donate now"
              id="guidu.donate.donation.name"
            />
          ),
        },
        component: (
          <div className="container my-3 my-md-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <Donation
                  {...this.props}
                  providers={providers}
                  onSave={newDonation => {
                    this.setState(
                      {
                        ...newDonation,
                      },
                      () =>
                        setTimeout(
                          () => (this.slider.current as any).next(),
                          500,
                        ),
                    );
                  }}
                />
              </div>
            </div>
          </div>
        ),
      },
    ];

    slides.push({
      key: 'preferences',
      header: {
        itemBefore: (
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                e.preventDefault();
                (this.slider.current as any).prev();
              }}
            >
              <ArrowLeft />
            </a>
          </div>
        ),
        name: (
          <>
            <h5 className="m-0">{donation.amount}</h5>
            <span>Personalizza</span>
          </>
        ),
      },
      component: (
        <div className="container my-3 my-md-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {donation.subscription ? (
                <p>Registrati</p>
              ) : (
                <Preferences
                  {...this.props}
                  // submitted={loadingSection !== 'contact'}
                  donation={donation}
                  onSave={newContact => {
                    this.setState({
                      contact: newContact,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ),
    });

    slides.push({
      key: 'contact',
      header: {
        itemBefore: (
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                e.preventDefault();
                (this.slider.current as any).prev();
              }}
            >
              <ArrowLeft />
            </a>
          </div>
        ),
        name: (
          <FormattedMessage
            defaultMessage="Contact information"
            id="guidu.donate.donation.contact"
          />
        ),
      },
      component: (
        <div className="container my-3 my-md-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Contact
                {...this.props}
                submitted
                contact={currentMember}
                onSave={() =>
                  setTimeout(() => (this.slider.current as any).next(), 500)
                }
              />
            </div>
          </div>
        </div>
      ),
    });

    slides.push({
      key: 'pay',
      header: {
        itemBefore: (
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                e.preventDefault();
                (this.slider.current as any).prev();
              }}
            >
              <ArrowLeft />
            </a>
          </div>
        ),
        name: (
          <FormattedMessage
            defaultMessage="Donate now"
            id="guidu.donate.donation.payment"
          />
        ),
      },
      component: (
        <div className="container px-0">
          {donation.amount && <Pay provider={{ id: 'card' }} {...this.props} />}
        </div>
      ),
    });

    slides.push({
      key: 'confirmation',
      header: {
        itemBefore: (
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                window.alert('esci');
              }}
            >
              <X />
            </a>
          </div>
        ),
        name: (
          <FormattedMessage
            defaultMessage="Done!"
            id="guidu.donate.donation.done"
          />
        ),
      },
      component: <Confirmation {...this.props} donation={donation} />,
    });

    return (
      <Shell slides={slides} ref={this.slider} currentMember={currentMember} />
    );
  }
}
