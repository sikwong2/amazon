import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CustomButton from '@/components/Button';
import { Box } from '@mui/material';

it('Renders', async () => {
  render(
    <Box aria-label="button box">
      <CustomButton label='button' pill />
      <CustomButton label='button1' />
      <CustomButton label='button2' color="info" variant="outlined" />
    </Box>,
  );
});
