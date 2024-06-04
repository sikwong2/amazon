import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import LanguageButton from './Language';
import CustomButton from './Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from 'next-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { LoginContext } from '../context/Login';
import { useSearch } from '../context/SearchContext';
import { PageContext } from '@/context/Page';
import { CartContext } from '@/context/Cart';
import { MemberInfo } from '@/graphql/member/schema';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: 'rgba(35,47,62)',
}));

const Search = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: 'white',
	overflow: 'hidden',
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
	flexGrow: 2,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
	color: 'black',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: `calc(0.5em + ${theme.spacing(2)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#FFA41C',
	cursor: 'pointer',
	borderTopRightRadius: theme.shape.borderRadius,
	borderBottomRightRadius: theme.shape.borderRadius,
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
	color: 'black',
}));

const customButtonStyles: React.CSSProperties = {
	backgroundColor: 'rgba(35,47,62)',
	color: 'rgba(242,242,242)',
	textTransform: 'none',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export default function TopBar() {
	const { t } = useTranslation('common');
	const loginContext = React.useContext(LoginContext);
	const pageContext = React.useContext(PageContext);
	const cartContext = React.useContext(CartContext);
	const { searchValue, setSearchValue, handleSearch } = useSearch();
	const [deliveryAddress, setDeliveryAddress] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const [numberOfItems, setNumberOfItems] = useState(0);  // This will hold the total count of items

	const router = useRouter();

	const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleSignIn = () => {
		router.push('/login');
	};

	const handleSignOut = () => {
		loginContext.setUserName('');
		loginContext.setAccessToken('');
		loginContext.setId('');
		loginContext.setRole('');
	}

	const handleOrders = () => {
		// set page context to order history
		pageContext.setPage('orderHistory');
		router.push('/');
	};

	const handleCart = () => {
		pageContext.setPage('cart');
		router.push('/');
	};

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const fetchUserInfo = async (memberId: string): Promise<MemberInfo | undefined> => {
		try {
			const query = {
				query: `query getMemberInfo {
				getMemberInfo(memberId: "${memberId}") {
					name
					address
				}
			}`,
			};
			const res = await fetch('/api/graphql', {
				method: 'POST',
				body: JSON.stringify(query),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const json = await res.json();
			if (json.errors) {
				console.log('GraphQL Errors:', json.errors);
				throw new Error('Error fetching user info');
			}
			return json.data.getMemberInfo;
		} catch (error) {
			console.error('Error fetching user info:', error);
			throw error;
		}
	};

	const fetchUserAddress = async () => {
		try {
			const response = await fetchUserInfo(loginContext.id);
			if (response) {
				if (response.address.length > 15) {
					setDeliveryAddress(response.address.substring(0, 15) + '...')
				} else if (response.address.length === 0) {
					setDeliveryAddress('Santa Cruz, CA 95060');
				} else {
					setDeliveryAddress(response.address);
				}
			} else {
				console.error('User info not found');
			}
		} catch (error) {
			console.error('Error fetching user address:', error);
		}
	};

	React.useEffect(() => {
		let totalItems = 0;
		const cart = cartContext.cart;
		const productIds = Object.keys(cartContext.cart);
		for (let i = 0; i < productIds.length; i++) {
			totalItems += cart[productIds[i]];
		}
		setNumberOfItems(totalItems);
	}, [cartContext.cart]);

	React.useEffect(() => {
		if (loginContext.accessToken.length > 0) {
			fetchUserAddress();
		}
	}, [loginContext.accessToken]);

	const signInButton = (
		<CustomButton
			style={customButtonStyles}
			label='sign-in'
			variant='text'
			sx={{ ml: 2, width: {xs: '100%', sm: 'auto'} }}
			onClick={handleSignIn}
			caps={false}>
			{t("topbar.Sign-in")}
		</CustomButton>
	)

	const helloUsernameButton = (
		<CustomButton
			style={customButtonStyles}
			label='user'
			variant='text'
			sx={{ ml: 2, width: {xs: '100%', sm: 'auto'} }}
			onClick={handleSignOut}
			caps={false}
		>
			{t("topbar.Hello") + " " + loginContext.userName}
		</CustomButton>
	)

	const addressButton = (
		<CustomButton
			style={customButtonStyles}
			label='delivery-address'
			variant='text'
			onClick={loginContext.accessToken.length === 0 ? handleSignIn : undefined}
			caps={false}
			disabled={loginContext.accessToken.length > 0}
      sx={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}
		>
			{loginContext.accessToken.length === 0 ? t("topbar.Deliver-to") + t(" Santa Cruz, CA 95060") : `${t("topbar.Deliver-to")} ${deliveryAddress}`}
		</CustomButton>
	)

	const orderHistoryButton = (
		<CustomButton
			style={customButtonStyles}
			label='orders'
			variant='text'
			sx={{ ml: 2, width: {xs: '100%', sm: 'auto'} }}
			onClick={handleOrders}
			caps={false}
		>
			{t("topbar.Orders")}
		</CustomButton>
	)

	const cartButton = (
		<CustomButton 
			style={customButtonStyles} 
			label='cart' 
			variant='text' 
			sx={{ ml: 2, width: {xs: '100%', sm: 'auto'} }} 
			onClick={handleCart}
		>
			<div style={{ position: "relative", display: "flex", alignItems: "center" }}>
				<ShoppingCartIcon style={{ fontSize: 30 }} />
				<div style={{
					position: "absolute",
					top: "36%",
					left: "22%",
					transform: "translate(-50%, -50%)",
					color: '#FFA41C',
					fontWeight: "bold",
					fontSize: 11,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
					{numberOfItems}
				</div>
				<span style={{ marginLeft: 8 }}>{t("topbar.Cart")}</span>
			</div>
		</CustomButton>
	)

	const menuButton = (
		<>
		<MenuIcon onClick={handleMenuOpen} aria-label='menu' style={{ marginTop: '5px' }}/> 
		<Menu
			anchorEl={null}
			open={menuOpen}
			onClose={handleMenuClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			MenuListProps={{
				sx: customButtonStyles
			}}
			PaperProps={{
				style: {
					marginTop: '40px',
				},
			}}
		>
			<MenuItem>
				{loginContext.accessToken.length === 0 && signInButton}
				{loginContext.accessToken.length > 0 && helloUsernameButton}
			</MenuItem>
			<MenuItem>
				<LanguageButton sx={{ ml: 2, width:'100%' }} variant='text' />
			</MenuItem>
			<MenuItem sx={{ ml:2 }}>
				{addressButton}
			</MenuItem>
			<MenuItem>
				{orderHistoryButton}
			</MenuItem>
			<MenuItem>
				{cartButton}
			</MenuItem>
			</Menu>
		</>
	)

	return (
		<Box sx={{ flexGrow: 1 }}>
			<StyledAppBar position="static">
				<Toolbar>
					<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
						<Logo width={60} />
            <Box sx={{ display: {xs:'none', sm:'none', md: 'flex'} }}>
						  {addressButton}
            </Box>
						<Search>
							<SearchInput
								placeholder={t("topbar.Search") as string}
								inputProps={{ 'aria-label': 'search', value: searchValue, onChange: handleSearchInputChange, onKeyDown: handleKeyDown }}
							/>
							<SearchIconWrapper aria-label='search-icon' onClick={handleSearch}>
								<StyledSearchIcon />
							</SearchIconWrapper>
						</Search>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'flex'} }}>
					  <LanguageButton sx={{ ml: 2 }} variant='text' />
						{loginContext.accessToken.length === 0 && signInButton}
						{loginContext.accessToken.length > 0 && helloUsernameButton}
						{orderHistoryButton}
						{cartButton}
					</Box>
					<Box sx={{ display: {xs: 'block', sm: 'none' } }}>
						{menuButton}
					</Box>
				</Toolbar>
			</StyledAppBar>
		</Box>
	);
}
