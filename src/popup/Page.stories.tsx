import { ComponentStoryObj as ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureDefaultStore } from '../store/store.js';
import { Page } from './Page.js';
import { TabContext } from './tab.js';

type Meta = ComponentMeta<typeof Page>;
type Story = ComponentStory<typeof Page>;

const meta: Meta = {
  component: Page,
  decorators: [
    (story) => (
      <TabContext.Provider value={{ url: "https://example.com/@acct" }}>{story()}</TabContext.Provider>
    ),
    (story) => (
      <Provider store={configureDefaultStore()}>{story()}</Provider>
    ),
  ],
};
export { meta as default };

export const Default: Story = {};
