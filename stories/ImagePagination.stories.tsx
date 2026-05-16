import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImagePagination } from "../src/components/ImagePagination";

const meta: Meta<typeof ImagePagination> = {
  title: "Components/ImagePagination",
  component: ImagePagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImagePagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <ImagePagination current={page} total={8} onPageChange={setPage} />;
  },
};

export const ThreePages: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <ImagePagination current={page} total={3} onPageChange={setPage} />;
  },
};

export const SinglePage: Story = {
  render: () => <ImagePagination current={1} total={1} onPageChange={() => {}} />,
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(25);
    return <ImagePagination current={page} total={50} onPageChange={setPage} />;
  },
};

export const NoEdges: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <ImagePagination current={page} total={10} onPageChange={setPage} showEdges={false} />;
  },
};
