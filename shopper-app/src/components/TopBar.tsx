// source: https://mui.com/material-ui/react-app-bar/#app-bar-with-search-field

import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoginContext } from '@/context/Login';
import { useSearch } from '@/context/SearchContext';
import { PageContext } from '@/context/Page';
import { CartContext } from '@/context/Cart';
import { MemberInfo } from '@/graphql/member/schema';
import CustomDropdown from './Dropdown';
import Logo from './Logo';
import LanguageButton from './Language';
import CustomButton from './Button';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
	// height: '60px',
	backgroundColor: '#131921',
	'& .MuiToolbar-root': {
		padding: 0,
	}
}));

const Search = styled('div')(({ theme }) => ({
	display: 'flex',
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: 'white',
	overflow: 'hidden',
	flexGrow: 2,
	flexShrink: 1,
	marginLeft: theme.spacing(2),
	marginRight: theme.spacing(1),
	'&:focus-within': {
		outline: 'solid 3px #f90',
	}
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
	width: '100%',
	flexGrow: 1,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1),
		transition: theme.transitions.create('width'),
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
	backgroundColor: '#febd68',
	cursor: 'pointer',
	borderTopRightRadius: theme.shape.borderRadius,
	borderBottomRightRadius: theme.shape.borderRadius,
	'&:active': {
		outline: 'solid 3px #f90',
	},
	'&:hover': {
		backgroundColor: '#f3a847',
	},
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
	color: 'black',
}));

const CategoryDropdownWrapper = styled('div')(({ theme }) => ({
	height: '38px',
	left: 0,
	display: 'flex',
	backgroundColor: '#febd68',
	cursor: 'pointer',
	flexGrow: 0,
}));

const customButtonStyles: React.CSSProperties = {
	backgroundColor: 'inherit',
	color: 'inherit',
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
	const [category, setCategory] = useState('All');	// TODO: make this a context??

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

	const addressButton = (
		<CustomButton
			style={customButtonStyles}
			label='delivery-address'
			variant='text'
			onClick={loginContext.accessToken.length === 0 ? handleSignIn : undefined}
			caps={false}
			disabled={loginContext.accessToken.length > 0}
			sx={{
				width: {xs: '100%', sm: 'auto'}, 
				height: '60px',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				border: 'none',
				alignItems: 'stretch',
				p: 0,
				'&:hover': {
					backgroundColor: '#131921',
					border: '1px solid white',
				}
			}}
		>
			<Box sx={{ justifyContent: 'center', width: '20px' }}>
				<FmdGoodOutlinedIcon sx={{mt:'20px'}} fontSize='small'/>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1, width: '100%' }}>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', color: '#CCCCCC', alignItems: 'flex-end', mb: 0.5, fontSize: '0.85em' }}>
					{t("topbar.Deliver-to")}
				</Box>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-start', mb: 1,  fontSize: '1em' }}>
					<Typography variant='body2' noWrap fontWeight='bold' lineHeight='1'>
						{loginContext.accessToken.length === 0 ?  'Santa Cruz, CA 95060' : deliveryAddress}
					</Typography>
				</Box>
			</Box>
		</CustomButton>
	)

	const searchBar = (
		<Search>
			<CategoryDropdownWrapper>
				<CustomDropdown 
					label={'category'} 
					variant='noLabel'
					values={[]}  // TODO: get all categories from DB 
					selectedValue={category} 
					setSelectedValue={setCategory}
					sx={{
						display: 'flex',
						flexGrow: 0,
						'& .MuiFormControl-root': {
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							borderTopLeftRadius: 'inherit',
							borderBottomLeftRadius: 'inherit',
							padding: '0px 4px 0px 4px',
							justifyContent: 'center',
							alignItems: 'center',
							flexGrow: 0,
							'&:active': {
								outline: 'solid 3px #f90',
							},
						},
						'& .MuiInputBase-root': {
							color: '#555',
							flexGrow: 0,
							maxWidth: '20vh',
							overflow: 'hidden',
							textOverflow: 'clip',
						},
						'&& .MuiSelect-select.MuiSelect-select': {
							px:'4px'
						},
					}}
				/>
			</CategoryDropdownWrapper>
			<SearchInput
				placeholder={t("topbar.Search") as string}
				inputProps={{ 'aria-label': 'search', value: searchValue, onChange: handleSearchInputChange, onKeyDown: handleKeyDown }}
				sx={{ flexGrow: 1 }}
			/>
			<SearchIconWrapper aria-label='search-icon' onClick={handleSearch}>
				<StyledSearchIcon fontSize='medium'/>
			</SearchIconWrapper>
		</Search>
	)

	const signInButton = (
		<CustomButton
			style={customButtonStyles}
			label='sign-in'
			variant='text'
			sx={{ 
				width: {xs: '100%', sm: 'auto'}, 
				height: '60px',
				border: 'none',
				p: '0px 9px 0px 9px',
				'&:hover': {
					backgroundColor: '#131921',
					border: '1px solid white',
					borderRadius: '2px',
				},
			}}
			onClick={handleSignIn}
			caps={false}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1, width: '100%', maxWidth: '20vh', pt: '10px' }}>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-end', mb: 0.5, fontSize: '0.85em', }}>
					{t("topbar.Hello") + ", " + t("topbar.Sign-in")}
				</Box>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-start', mb: 1,  fontSize: '1em' }}>
					<Typography variant='body2' noWrap fontWeight='bold' lineHeight='1' letterSpacing='0.03em'>
						{t("topbar.Account")}
					</Typography>
					<ArrowDropDownIcon sx={{ height: '20px', width: '18px', color: '#a7acb2' }} />
				</Box>
			</Box>
		</CustomButton>
	)

	const helloUsernameButton = (
		<CustomButton
			style={customButtonStyles}
			label='sign-out'
			variant='text'
			sx={{ 
				width: {xs: '100%', sm: 'auto'}, 
				height: '60px',
				border: 'none',
				p: '0px 9px 0px 9px',
				'&:hover': {
					backgroundColor: '#131921',
					border: '1px solid white',
					borderRadius: '2px',
				},
			}}
			onClick={handleSignOut}
			caps={false}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1, width: '100%', maxWidth: '20vh', pt: '10px' }}>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-end', mb: 0.5, }}>
					<Typography variant='body2' noWrap fontSize='0.85em' lineHeight='1' letterSpacing='0.035em'>
						{t("topbar.Hello") + ", " + loginContext.userName}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-start', mb: 1,  fontSize: '1em' }}>
					<Typography variant='body2' noWrap fontWeight='bold' lineHeight='1' letterSpacing='0.035em'>
						{t("topbar.Account")}
					</Typography>
					<ArrowDropDownIcon sx={{ height: '20px', width: '18px', color: '#a7acb2' }} />
				</Box>
			</Box>
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
						<Logo width={60} style={{ padding: '5px' }}/>
            <Box sx={{ display: {xs:'none', sm:'none', md: 'flex'}, pl: 1, maxWidth: '25vh' }}>
						  {addressButton}
            </Box>
						{searchBar}
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
					  <LanguageButton />
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
