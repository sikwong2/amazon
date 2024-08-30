import TopBar from "@/components/TopBar";
import AccountCards from "@/components/AccountCards";
import { Box, Grid } from "@mui/material";
import { PageContext } from "@/context/Page";
import React from "react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import AccountCardBox from "@/components/AccountCardBox"

export function Account() {
  const pageContext = React.useContext(PageContext);
  const router = useRouter();

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
          <AccountCards
            title="Your Orders"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png"}
            description="Track, return, cancel an order, download invoice or buy again"
            alt="Orders"
            onClick={() => handleNavigation('orderHistory')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Login & security"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png"}
            description="Edit login, name, and mobile number"
            alt="Login&security"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Prime"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime._CB433666831_.png"}
            description="Manage your membership, view benefits, and payment settings"
            alt="Prime"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your Addresses"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png"}
            description="Edit, remove or set default address"
            alt="Addresses"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your buisness account"
            image={"https://m.media-amazon.com/images/G/01/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250197_.jpg"}
            description="Sign up for free to save with buisness-exclusive pricing and schedule deliveries to fit your buisness hours"
            alt="Buisness-account"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Gift Cards"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png"}
            description="View balance or redeem a card, and purchase a new Gift Card"
            alt="Gift-card"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your Payments"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png"}
            description="View all transactions, manage payments methods and settings"
            alt="Payments"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your Amazon Family"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png"}
            description="Manage profiles, sharing, and permissions in one place"
            alt="Family"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Digital Services and Device Support"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png"}
            description="Troubleshoot device issues, manage or cancel digital subscriptions"
            alt="Digital-services"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Archived orders"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/10_archived_orders._CB654640573_.png"}
            description="View and manage your archived orders"
            alt="Archived-orders"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your Lists"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png"}
            description="View, modify, and share your list, or create new ones"
            alt="Lists"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Customer Service"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png"}
            description="Browse self service options, help articles or contact us"
            alt="Customer"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AccountCards
            title="Your Messages"
            image={"https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/9_messages._CB654640573_.jpg"}
            description="Manage your account security settings"
            alt="Messages"
            onClick={() => handleNavigation('comingSoon')}
          />
        </Grid>
      </Grid>
    )
  }

  const orderAndShoppingPreferencesArr = [
    { name: 'Your Addresses', onClick: 'comingSoon' },
    { name: 'Your Payments', onClick: 'comingSoon' },
    { name: 'Your Transactions', onClick: 'comingSoon' },
    { name: 'Your Amazon profile', onClick: 'comingSoon' },
    { name: '1-Click settings', onClick: 'comingSoon' },
    { name: 'Amazon Key settings', onClick: 'comingSoon' },
    { name: 'Language preferences', onClick: 'comingSoon' },
    { name: 'Manage saved IDs', onClick: 'comingSoon' },
    { name: 'Coupons', onClick: 'comingSoon' },
    { name: 'Product Vouchers', onClick: 'comingSoon' },
    { name: 'VAT registration number', onClick: 'comingSoon' }
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
