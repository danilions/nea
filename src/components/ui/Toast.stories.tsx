import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: { message: 'Info message', type: 'info' },
};
export const Success: Story = {
  args: { message: 'Success!', type: 'success' },
};
export const Error: Story = {
  args: { message: 'Error!', type: 'error' },
};
