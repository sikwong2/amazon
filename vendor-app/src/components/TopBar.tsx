import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import LanguageButton from './Language';
import CustomButton from './Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from 'next-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'rgba(35,47,62)', 
}));

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
    },
    marginLeft: theme.spacing(20), 
    flexGrow: 2,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2), // Adjust padding to align text to the left
        paddingRight: `calc(0.5em + ${theme.spacing(2)})`, // Space for the search icon on the right
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFA41C'
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: 'black', // Set the color of the search icon to black
}));

const customButtonStyles = {
    backgroundColor: 'rgba(35,47,62)', 
    color: 'rgba(242,242,242)', 
};


export default function TopBar() {
    const { t } = useTranslation('common');
    const [searchValue, setSearchValue] = React.useState('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
      alert('Search Value: ' + searchValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <CustomButton label='sign-in'>
                            <Logo width={80} />
                        </CustomButton>
                        <Search>
                            <SearchInput
                                placeholder={"Search…"}
                                inputProps={{ 'aria-label': 'search', value: searchValue, onChange: handleSearchInputChange, onKeyDown: handleKeyDown }}
                            />
                            <StyledSearchIcon onClick={handleSearch}/>
                        </Search>
                    </Box>
                    <LanguageButton sx={{ ml: 2 }} style={customButtonStyles} variant='text'/>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomButton style={customButtonStyles} label='sign-in' variant='text' sx={{ ml: 2 }}>
                            {t("Sign in")}
                        </CustomButton> 
                        <CustomButton style={customButtonStyles} label='orders' variant='text' sx={{ ml: 2 }}>
                            {t("Orders")}
                        </CustomButton>
                        <CustomButton style={customButtonStyles} label='cart' variant='text' sx={{ ml: 2 }}>
                            <ShoppingCartIcon />
                            {t("Cart")}
                        </CustomButton>
                    </Box>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}
