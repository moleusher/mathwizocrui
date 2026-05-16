import type { Meta, StoryObj } from "@storybook/react";
import { ImagePreview } from "../src/components/ImagePreview";

const meta: Meta<typeof ImagePreview> = {
  title: "Components/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImagePreview>;

export const Default: Story = {
  args: {
    src: "https://placehold.co/800x600/e2e8f0/475569?text=Sample+Exam+Paper",
    alt: "Sample exam paper",
  },
};

export const NotZoomable: Story = {
  args: {
    src: "https://placehold.co/400x200/e2e8f0/475569?text=Thumbnail",
    zoomable: false,
  },
};

export const ErrorState: Story = {
  args: {
    src: "https://invalid.example/404.png",
    alt: "Broken image",
    errorContent: <span className="text-red-500">⚠️ Image not found</span>,
  },
};
