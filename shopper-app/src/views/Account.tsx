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
      <h1> Your Account </h1>
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

  const accountCardGrid = () => {
    return (
      <Grid container spacing={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-orders.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png"}
            description={t('account-page.account.your-orders.description')}
            alt="Orders"
            onClick={() => handleNavigation('orderHistory')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.login-security.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png"}
            description={t('account-page.account.login-security.description')}
            alt="Login&security"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.prime.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime._CB433666831_.png"}
            description={t('account-page.account.prime.description')}
            alt="Prime"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-addresses.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png"}
            description={t('account-page.account.your-addresses.description')}
            alt="Addresses"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-business-account.title')}
            image={"https://m.media-amazon.com/images/G/01/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250197_.jpg"}
            description={t('account-page.account.your-business-account.description')}
            alt="Business-account"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.gift-cards.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png"}
            description={t('account-page.account.gift-cards.description')}
            alt="Gift-card"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-payments.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png"}
            description={t('account-page.account.your-payments.description')}
            alt="Payments"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-amazon-family.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png"}
            description={t('account-page.account.your-amazon-family.description')}
            alt="Family"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.digital-services.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png"}
            description={t('account-page.account.digital-services.description')}
            alt="Digital-services"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.archived-orders.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/10_archived_orders._CB654640573_.png"}
            description={t('account-page.account.archived-orders.description')}
            alt="Archived-orders"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-lists.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png"}
            description={t('account-page.account.your-lists.description')}
            alt="Lists"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.customer-service.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png"}
            description={t('account-page.account.customer-service.description')}
            alt="Customer"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountLogoCards
            title={t('account-page.account.your-messages.title')}
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/9_messages._CB654640573_.jpg"}
            description={t('account-page.account.your-messages.description')}
            alt="Messages"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
      </Grid>
    )
  }

  const orderAndShoppingPreferencesArr = [
    { name: t('account-page.ordering-and-shopping-preferences-box.your-addresses.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-payments.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-transactions.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.your-amazon-profile.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.1-click-settings.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.amazon-key-settings.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.language-preferences.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.manage-saved-ids.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.coupons.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.product-vouchers.name'), onClick: 'comingSoon' },
    { name: t('account-page.ordering-and-shopping-preferences-box.vat-registration-number.name'), onClick: 'comingSoon' }
  ];

  const digitalContentAndDevices = [
    { name: 'All things Alexa', onClick: 'comingSoon' },
    { name: 'Manage content and devices', onClick: 'comingSoon' },
    { name: 'Manage Digital Delivery', onClick: 'comingSoon' },
    { name: 'Your apps', onClick: 'comingSoon' },
    { name: 'Prime Video settings', onClick: 'comingSoon' },
    { name: 'Amazon Music settings', onClick: 'comingSoon' },
    { name: 'Manage Amazon Drive and photos', onClick: 'comingSoon' },
    { name: 'Twitch settings', onClick: 'comingSoon' },
    { name: 'Audible settings', onClick: 'comingSoon' },
    { name: 'Amazon Coins', onClick: 'comingSoon' },
    { name: 'Digital gifts you\'ve received', onClick: 'comingSoon' },
    { name: 'Digital and device forum', onClick: 'comingSoon' },
    { name: 'Comixology settings', onClick: 'comingSoon' }
  ];

  const membershipsAndSubscriptions = [
    { name: 'Memberships and subscriptions', onClick: 'comingSoon' },
    { name: 'Kindle Unlimited', onClick: 'comingSoon' },
    { name: 'Prime Video Channels', onClick: 'comingSoon' },
    { name: 'Music Unlimited', onClick: 'comingSoon' },
    { name: 'Subscribe & Save', onClick: 'comingSoon' },
    { name: 'Amazon Kids+', onClick: 'comingSoon' },
    { name: 'Audible membership', onClick: 'comingSoon' },
    { name: 'Your Essentials', onClick: 'comingSoon' },
    { name: 'Magazine subscriptions', onClick: 'comingSoon' },
    { name: 'One Medical membership for Prime members', onClick: 'comingSoon' },
    { name: 'Other subscriptions', onClick: 'comingSoon' }
  ];

  const communicationAndContent = [
    { name: 'Email subscriptions', onClick: 'comingSoon' },
    { name: 'Advertising preferences', onClick: 'comingSoon' },
    { name: 'Communication preferences', onClick: 'comingSoon' },
    { name: 'Shipment updates via text', onClick: 'comingSoon' },
    { name: 'Alexa shopping notifications', onClick: 'comingSoon' },
    { name: 'Videos you\'ve uploaded', onClick: 'comingSoon' },
    { name: 'Purchase Reminders', onClick: 'comingSoon' }
  ];

  const shoppingProgramsAndRentals = [
    { name: 'Buy now, pay over time', onClick: 'comingSoon' },
    { name: 'Third Party Credit Card Installment', onClick: 'comingSoon' },
    { name: 'Manage Your Amazon Family', onClick: 'comingSoon' },
    { name: 'Rentals by Amazon', onClick: 'comingSoon' },
    { name: 'Amazon Household', onClick: 'comingSoon' },
    { name: 'No-Rush rewards summary', onClick: 'comingSoon' },
    { name: 'Teens Program', onClick: 'comingSoon' },
    { name: 'Pets', onClick: 'comingSoon' },
    { name: 'Shop with Points', onClick: 'comingSoon' },
    { name: 'Amazon Second Chance', onClick: 'comingSoon' },
    { name: 'Benefits balance', onClick: 'comingSoon' }
  ];

  const otherPrograms = [
    { name: 'Account Linking', onClick: 'comingSoon' },
    { name: 'Amazon credit cards', onClick: 'comingSoon' },
    { name: 'Your seller account', onClick: 'comingSoon' },
    { name: 'Amazon Pay', onClick: 'comingSoon' },
    { name: 'Manage your trade-ins', onClick: 'comingSoon' },
    { name: 'Amazon Web Services', onClick: 'comingSoon' },
    { name: 'Amazon tax exemption program', onClick: 'comingSoon' },
    { name: 'Your Interests', onClick: 'comingSoon' },
    { name: 'In-Store Promo Wallet', onClick: 'comingSoon' }
  ];

  const manageYourData = [
    { name: 'Request your data', onClick: 'comingSoon' },
    { name: 'Manage apps & services with data access', onClick: 'comingSoon' },
    { name: 'Close Your Amazon Account', onClick: 'comingSoon' },
    { name: 'Privacy Notice', onClick: 'comingSoon' }
  ];

  const accountCardGridLinks = () => {
    return (
      <Grid container spacing={0.1}>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Ordering and Shopping preferences"
            list = {orderAndShoppingPreferencesArr}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Digital content and devices"
            list={digitalContentAndDevices}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Memberships and subscriptions"
            list = {membershipsAndSubscriptions}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Communication and content"
            list = {communicationAndContent}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Shopping programs and rentals"
            list = {shoppingProgramsAndRentals}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Other programs"
            list = {otherPrograms}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AccountCardBox
            title="Manage your data"
            list = {manageYourData}
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
