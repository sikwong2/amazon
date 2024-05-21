import { render} from '@testing-library/react'
import CustomLink from '@/components/Link';

it('Renders', async () => {
  render(
    <CustomLink href={''} label={''} children={undefined}/>
  )
});
