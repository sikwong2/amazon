// source: https://mui.com/base-ui/react-input/#hook

import * as React from 'react';
import { styled } from '@mui/system';
import { useInput } from '@mui/base/useInput';
import { unstable_useForkRef as useForkRef } from '@mui/utils';

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { getRootProps, getInputProps } = useInput(props);

  const inputProps = getInputProps();

  // Make sure that both the forwarded ref and the ref returned from the getInputProps are applied on the input element
  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div {...getRootProps()}>
      <InputElement {...props} {...inputProps} />
    </div>
  );
});

interface CustomTextFieldProps {
  label: string,
  placeholder: string,
  width?: string,
}

// TODO:
// - ...rest
// - fonts
// sizing

export default function CustomTextField({ label='', placeholder='', width='', height='2.5rem', ...rest }) {
  return (
    <CustomInput 
      aria-label={label} 
      placeholder={placeholder}
      style={{ width, height} }
      {...rest} // for other props
    />
  )
}

const InputElement = styled('input')(
  ({ theme }) => `
  width: 300px;
  font-family: 'Amazon Ember', sans-serif;
  font-size: 100%;
  line-height: normal;
  padding: 3px 7px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #888C8C;
  box-shadow: 0 1px 2px rgba(15,17,17,.15) inset;

  &:focus {
    background-color: #f7feff;
    border: 0px solid #007185;
    box-shadow: 0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset
  }
`,
);