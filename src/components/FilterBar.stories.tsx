import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FilterBar } from "./QuestionList";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  args: {
    onFilterChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const All: Story = {
  args: {
    filter: "all",
    counts: { all: 12, wrong: 3, unmarked: 2 },
  },
};

export const Wrong: Story = {
  args: {
    filter: "wrong",
    counts: { all: 12, wrong: 3, unmarked: 2 },
  },
};

export const Unmarked: Story = {
  args: {
    filter: "unmarked",
    counts: { all: 12, wrong: 3, unmarked: 2 },
  },
};

export const Empty: Story = {
  args: {
    filter: "all",
    counts: { all: 0, wrong: 0, unmarked: 0 },
  },
};
