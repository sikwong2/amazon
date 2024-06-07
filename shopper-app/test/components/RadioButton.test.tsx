import { render } from '@testing-library/react';
import RadioButton from '@/components/RadioButton';

it('Renders', async () => {
  render(
    <RadioButton label='label' value='value' checked={true} onChange={()=>{}} offset={5}/>
  );
});
