import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CustomButton from '@/components/Button';
import { Box } from '@mui/material';

it('Renders', async () => {
  render(
    <Box aria-label="button box">
      <CustomButton pill />
      <CustomButton />
      <CustomButton color="info" variant="outlined" />
    </Box>,
  );
});
