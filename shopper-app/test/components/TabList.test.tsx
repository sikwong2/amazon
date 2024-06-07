import { render } from '@testing-library/react';
import { CustomTab, CustomTabPanel, CustomTabs, CustomTabsStyled } from '@/components/TabList';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <>
      <CustomTabs>
        <CustomTab/>
      </CustomTabs>
      <CustomTabPanel index={123} value={123}>
        CustomTabPanel
      </CustomTabPanel>
      <CustomTabsStyled/>
    </>

  );
});
