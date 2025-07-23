// src/components/ui/SearchBar.stories.tsx
import { SearchBar } from './SearchBar';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchBar> = {
  title: 'UI/SearchBar',
  component: SearchBar,
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => alert(`Search: ${query}`),
    placeholder: 'Search items...',
  },
};
