import TopBar from "@/components/TopBar";
import AccountLogoCards from "@/components/AccountLogoCards";
import { Box, Grid } from "@mui/material";
import { PageContext } from "@/context/Page";
import React from "react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import AccountCardBox from "@/components/AccountCardBox"
import { useTranslation } from 'next-i18next';

export function Account() {
  const pageContext = React.useContext(PageContext);
  const router = useRouter();
  const { t } = useTranslation('common');

  const title = () => {
    return (
      <h1> {t("account-page.your-account")} </h1>
    )
  }

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'account':
        pageContext.setPage('account')
        router.push('/')
        break;
      case 'orderHistory':
        pageContext.setPage('orderHistory')
        router.push('/');
        break;
      case 'comingSoon':
        pageContext.setPage('comingSoon')
        router.push('/')
        break;
      default:
        break;
    }
  };

  const mapAccountCardGrid = (arr: any) => {
    return (
      <Grid container spacing={0.1}>
        {arr.map((item: any, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <AccountLogoCards
              title={t(item.title)}
              image={item.image}
              description={t(item.description)}
              alt={item.alt}
              onClick={() => handleNavigation(item.onClick)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const accountCardData = [
  {
    title: 'account-page.account.your-orders.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png',
    description: 'account-page.account.your-orders.description',
    alt: 'Orders',
    onClick: 'orderHistory',
  },
  {
    title: 'account-page.account.login-security.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png',
    description: 'account-page.account.login-security.description',
    alt: 'Login & Security',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.prime.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime._CB433666831_.png',
    description: 'account-page.account.prime.description',
    alt: 'Prime',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-addresses.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png',
    description: 'account-page.account.your-addresses.description',
    alt: 'Addresses',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-business-account.title',
    image: 'https://m.media-amazon.com/images/G/01/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250197_.jpg',
    description: 'account-page.account.your-business-account.description',
    alt: 'Business-account',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.gift-cards.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png',
    description: 'account-page.account.gift-cards.description',
    alt: 'Gift-card',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-payments.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png',
    description: 'account-page.account.your-payments.description',
    alt: 'Payments',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-amazon-family.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png',
    description: 'account-page.account.your-amazon-family.description',
    alt: 'Family',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.digital-services.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png',
    description: 'account-page.account.digital-services.description',
    alt: 'Digital-services',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.archived-orders.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/10_archived_orders._CB654640573_.png',
    description: 'account-page.account.archived-orders.description',
    alt: 'Archived-orders',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-lists.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png',
    description: 'account-page.account.your-lists.description',
    alt: 'Lists',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.customer-service.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png',
    description: 'account-page.account.customer-service.description',
    alt: 'Customer',
    onClick: 'comingSoon',
  },
  {
    title: 'account-page.account.your-messages.title',
    image: 'https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/9_messages._CB654640573_.jpg',
    description: 'account-page.account.your-messages.description',
    alt: 'Messages',
    onClick: 'comingSoon',
  },
];


  const accountCardGrid = () => {
    return (
      mapAccountCardGrid(accountCardData)
    )
  }

  const orderAndShoppingPreferencesArr = [
    { name: t('account-page.ordering-and-shopping-preferences-box.your-addresses'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-payments'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-transactions'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-amazon-profile'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.1-click-settings'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.amazon-key-settings'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.language-preferences'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.manage-saved-ids'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.coupons'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.product-vouchers'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.vat-registration-number'), onClick: 'comingSoon' }
  ];

  const digitalContentAndDevices = [
    { name: t('account-page.digital-content-and-devices-box.all-things-alexa'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.manage-content-and-devices'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.manage-digital-delivery'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.your-apps'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.prime-video-settings'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.amazon-music-settings'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.manage-amazon-drive-and-photos'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.twitch-settings'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.audible-settings'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.amazon-coins'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.digital-gifts-received'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.digital-and-device-forum'), onClick: 'comingSoon' },
    { name: t('account-page.digital-content-and-devices-box.comixology-settings'), onClick: 'comingSoon' }
  ];


  const membershipsAndSubscriptions = [
    { name: t('account-page.memberships-and-subscriptions-box.memberships-and-subscriptions'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.kindle-unlimited'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.prime-video-channels'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.music-unlimited'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.subscribe-and-save'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.amazon-kids-plus'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.audible-membership'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.your-essentials'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.magazine-subscriptions'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.one-medical-membership'), onClick: 'comingSoon' },
    { name: t('account-page.memberships-and-subscriptions-box.other-subscriptions'), onClick: 'comingSoon' }
  ];


  const communicationAndContent = [
    { name: t('account-page.communication-and-content-box.email-subscriptions'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.advertising-preferences'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.communication-preferences'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.shipment-updates-via-text'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.alexa-shopping-notifications'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.videos-you-uploaded'), onClick: 'comingSoon' },
    { name: t('account-page.communication-and-content-box.purchase-reminders'), onClick: 'comingSoon' }
  ];

  const shoppingProgramsAndRentals = [
    { name: t('account-page.shopping-programs-and-rentals-box.buy-now-pay-over-time'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.third-party-credit-card-installment'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.manage-your-amazon-family'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.rentals-by-amazon'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.amazon-household'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.no-rush-rewards-summary'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.teens-program'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.pets'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.shop-with-points'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.amazon-second-chance'), onClick: 'comingSoon' },
    { name: t('account-page.shopping-programs-and-rentals-box.benefits-balance'), onClick: 'comingSoon' }
  ];

  const otherPrograms = [
    { name: t('account-page.other-programs-box.account-linking'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.amazon-credit-cards'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.your-seller-account'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.amazon-pay'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.manage-your-trade-ins'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.amazon-web-services'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.amazon-tax-exemption-program'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.your-interests'), onClick: 'comingSoon' },
    { name: t('account-page.other-programs-box.in-store-promo-wallet'), onClick: 'comingSoon' }
  ];

  const manageYourData = [
    { name: t('account-page.manage-your-data-box.request-your-data'), onClick: 'comingSoon' },
    { name: t('account-page.manage-your-data-box.manage-apps-services-data-access'), onClick: 'comingSoon' },
    { name: t('account-page.manage-your-data-box.close-your-amazon-account'), onClick: 'comingSoon' },
    { name: t('account-page.manage-your-data-box.privacy-notice'), onClick: 'comingSoon' }
  ];

  const accountCardGridLinks = () => {
    return (
      <Grid container spacing={0.1}>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.ordering-and-shopping-preferences')}
            list={orderAndShoppingPreferencesArr}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.digital-content-and-devices')}
            list={digitalContentAndDevices}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.memberships-and-subscriptions')}
            list={membershipsAndSubscriptions}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.communication-and-content')}
            list={communicationAndContent}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.shopping-programs-and-rentals')}
            list={shoppingProgramsAndRentals}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.other-programs')}
            list={otherPrograms}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title={t('account-page.titles.manage-your-data')}
            list={manageYourData}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <TopBar />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{
            width: '80%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Box sx={{ width: '100%', textAlign: 'left', marginLeft: '35px' }}>
              {title()}
            </Box>
            {accountCardGrid()}
            <Divider
              flexItem
              sx={{ mx: 2, borderWidth: '1px', margin: '20px' }}
            />
            {accountCardGridLinks()}
          </Box>
        </Box>
      </div>
    </div>
  );
}
