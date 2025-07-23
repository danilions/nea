import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: { open: true, onClose: () => {}, children: 'Modal content' },
};
export const Closed: Story = {
  args: { open: false, onClose: () => {}, children: 'Modal content' },
};
