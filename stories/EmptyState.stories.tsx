import type { Meta, StoryObj } from "@storybook/react";
import {
  EmptyStateRoot,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "../src/components/EmptyState";
import { MathButton } from "../src/components/MathButton";

const meta: Meta<typeof EmptyStateRoot> = {
  title: "Components/EmptyState",
  component: EmptyStateRoot,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyStateRoot>;

// Reusable content
const NoResultsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/>
  </svg>
);

const UploadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

const ErrorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

export const NoResults: Story = {
  render: () => (
    <EmptyStateRoot>
      <EmptyStateIcon>{NoResultsIcon}</EmptyStateIcon>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search or upload a different document.
      </EmptyStateDescription>
    </EmptyStateRoot>
  ),
};

export const EmptyUpload: Story = {
  render: () => (
    <EmptyStateRoot>
      <EmptyStateIcon>{UploadIcon}</EmptyStateIcon>
      <EmptyStateTitle>Upload a document</EmptyStateTitle>
      <EmptyStateDescription>
        Drag and drop a PDF or image file to begin OCR analysis.
      </EmptyStateDescription>
      <EmptyStateAction>
        <MathButton>Browse Files</MathButton>
      </EmptyStateAction>
    </EmptyStateRoot>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <EmptyStateRoot>
      <EmptyStateIcon>{ErrorIcon}</EmptyStateIcon>
      <EmptyStateTitle>Something went wrong</EmptyStateTitle>
      <EmptyStateDescription>
        The analysis could not be completed. Please try again.
      </EmptyStateDescription>
      <EmptyStateAction>
        <MathButton variant="outline">Retry</MathButton>
      </EmptyStateAction>
    </EmptyStateRoot>
  ),
};

export const Minimal: Story = {
  render: () => (
    <EmptyStateRoot>
      <EmptyStateTitle>No data yet</EmptyStateTitle>
      <EmptyStateDescription>Start an analysis to see results here.</EmptyStateDescription>
    </EmptyStateRoot>
  ),
};
