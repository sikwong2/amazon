// source: https://mui.com/base-ui/react-input/#hook

import * as React from 'react';
import { styled } from '@mui/system';
import { useInput } from '@mui/base/useInput';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { InputLabel } from '@mui/material';

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { getRootProps, getInputProps } = useInput(props);

  const inputProps = getInputProps();

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div {...getRootProps()} style={{ width: '100%' }}>
      <InputElement {...props} {...inputProps} />
    </div>
  );
});

export default function CustomTextField({
  label = '',
  placeholder = '',
  width = '100%',
  height = '2rem',
  inputLabel = '',
  ...rest
}) {
  return (
    <>
      {inputLabel && (
        <InputLabel
          sx={{ fontWeight: 'bold', fontSize: '13px', color: '#111111', pl: '2px', pb: '2px' }}
        >
          {inputLabel}
        </InputLabel>
      )}
      <CustomInput
        aria-label={label}
        id={label}
        name={label}
        placeholder={placeholder}
        style={{ width, height }}
        {...rest} // for other props
      />
    </>
  );
}

const InputElement = styled('input')(
  () => `
  width: 100%;
  font-family: 'Amazon Ember', sans-serif;
  font-size: 80%;
  line-height: normal;
  padding: 3px 7px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #888C8C;
  box-shadow: 0 1px 2px rgba(15,17,17,.15) inset;

  &:focus {
    background-color: #F7FEFF;
    border: 1px solid #007185;
    outline: none;
    box-shadow: 0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset
  }
`,
);
