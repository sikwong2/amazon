import TopBar from "@/components/TopBar";
import AccountCards from "@/components/AccountCards";
import { Box, Grid } from "@mui/material";

const testImage = require("@/assets/testlogo.jpg");

const title = () => {
  return (
    <h1> Your Account </h1>
  )
}

const accountCardGrid = () => {
  return (
    <Grid container spacing={0.1}>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Orders"
          image={testImage}
          description="Track, return, cancel an order, download invoice or buy again"
          alt="Orders"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Login & security"
          image={testImage}
          description="Edit login, name, and mobile number"
          alt="Login&security"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Prime"
          image={testImage}
          description="Manage your membership, view benefits, and payment settings"
          alt="Prime"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Addresses"
          image={testImage}
          description="Edit, remove or set default address"
          alt="Addresses"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your buisness account"
          image={testImage}
          description="Sign up for free to save with buisness-exclusive pricing and schedule deliveries to fit your buisness hours"
          alt="Buisness-account"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Gift Cards"
          image={testImage}
          description="View balance or redeem a card, and purchase a new Gift Card"
          alt="Gift-card"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Payments"
          image={testImage}
          description="View all transactions, manage payments methods and settings"
          alt="Payments"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Amazon Family"
          image={testImage}
          description="Manage profiles, sharing, and permissions in one place"
          alt="Family"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Digital Services and Device Support"
          image={testImage}
          description="Troubleshoot device issues, manage or cancel digital subscriptions"
          alt="Digital-services"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Archived orders"
          image={testImage}
          description="View and manage your archived orders"
          alt="Archived-orders"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Lists"
          image={testImage}
          description="View, modify, and share your list, or create new ones"
          alt="Lists"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Customer Service"
          image={testImage}
          description="Browse self service options, help articles or contact us"
          alt="Customer"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AccountCards
          title="Your Messages"
          image={testImage}
          description="Manage your account security settings"
          alt="Messages"
        />
      </Grid>
    </Grid>
  )
}

export function Account() {
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
          </Box>
        </Box>

      </div>
    </div>
  );
}
