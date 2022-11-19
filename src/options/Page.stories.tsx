import { ComponentStoryObj as ComponentStory, ComponentMeta } from '@storybook/react';
import { Page } from './Page.js';

type Meta = ComponentMeta<typeof Page>;
type Story = ComponentStory<typeof Page>;

const meta: Meta = {
  component: Page,
};
export { meta as default };

export const Default: Story = {};
