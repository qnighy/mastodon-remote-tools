import { ComponentStoryObj as ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureDefaultStore } from '../store/store.js';
import { Page } from './Page.js';

type Meta = ComponentMeta<typeof Page>;
type Story = ComponentStory<typeof Page>;

const meta: Meta = {
  component: Page,
  decorators: [
    (story) => (
      <Provider store={configureDefaultStore()}>{story()}</Provider>
    )
  ],
};
export { meta as default };

export const Default: Story = {};
