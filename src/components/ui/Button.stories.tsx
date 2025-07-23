import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
};
export const Hover: Story = {
  args: { children: 'Button' },
  parameters: { pseudo: { hover: true } },
};
export const Loading: Story = {
  args: { children: 'Loading...', disabled: true },
};
