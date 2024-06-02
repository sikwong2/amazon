import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { radioButtonTheme } from './Theme';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeliveryDate from '../components/DeliveryDate';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';


const RadioButton = ({ label, value, checked, onChange, offset, ...rest }: { label?: string, value?: string, checked?: boolean, onChange: React.ChangeEventHandler<HTMLInputElement>, offset: any }) => {
  const { t } = useTranslation('common');
  return (
    <ThemeProvider theme={radioButtonTheme}>
      <div style={{display: "flex"}}>
      <FormControlLabel
          control={<Radio
          checked={checked}
          onChange={onChange}
          size="small"
          value={value}
          {...rest}
        />}
        label={label}
        sx={{ alignItems: 'center', marginRight: '0.1px'}}
      />
        <div style={{ display: "flex", marginTop: '10px', fontSize: '14px', fontWeight: '700', color: '#007600', fontFamily: 'Arial'}}>
          <DeliveryDate offset={offset}></DeliveryDate>
      </div>
      </div>
      <Typography sx={{marginLeft: "27px"}}variant="body2">
        <span style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>{t("checkout.FREE")}</span> {offset <= 2 ? t("checkout.2-day-delivery") : t("checkout.amazon-day-delivery")}
      </Typography>
    </ThemeProvider >
  );
};

export default RadioButton;
