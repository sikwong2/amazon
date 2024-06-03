import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function LockButton() {
  return (
    <Tooltip title="Secure Link">
      <IconButton
        color="default"
        onClick={() => window.open('https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ&ref_=ox_spc_privacy&ie=UTF8', '_blank', 'noopener,noreferrer')}
        aria-label="lock-button"
      >
        <LockIcon />
      </IconButton>
    </Tooltip>
  );
}

export default LockButton;
