import type { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "../src/components/ImageUpload";

const meta: Meta<typeof ImageUpload> = {
  title: "Components/ImageUpload",
  component: ImageUpload,
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    showPreview: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  args: {
    label: "Drop files here or click to browse",
    hint: "Supports PDF, PNG, JPEG (max 50MB)",
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Upload exam paper",
    hint: "PNG or PDF, up to 25MB",
  },
};

export const Error: Story = {
  args: {
    label: "Upload failed",
    error: "File is too large. Maximum size is 10MB.",
  },
};

export const ImageOnly: Story = {
  args: {
    accept: "image/*",
    label: "Drop an image here",
    hint: "PNG, JPEG, or WebP",
  },
};
