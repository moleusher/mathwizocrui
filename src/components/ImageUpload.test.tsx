import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageUpload } from "./ImageUpload";

function createMockFile(name: string, type: string, size = 1024): File {
  const file = new File(["x".repeat(size)], name, { type });
  return file;
}

const getInput = () => document.querySelector('input[type="file"]') as HTMLInputElement;
const getDropzone = () => document.querySelector('[data-slot="image-upload"]') as HTMLElement;

describe("ImageUpload", () => {
  // ── rendering ──
  it("renders label and hint", () => {
    render(<ImageUpload />);
    expect(screen.getByText("Drop files here or click to browse")).toBeInTheDocument();
    expect(screen.getByText("Supports PDF, PNG, JPEG (max 50MB)")).toBeInTheDocument();
  });

  it("renders custom label and hint", () => {
    render(<ImageUpload label="Upload" hint="Custom hint" />);
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("Custom hint")).toBeInTheDocument();
  });

  it("renders with data-slot attribute", () => {
    render(<ImageUpload />);
    expect(document.querySelector('[data-slot="image-upload"]')).toBeInTheDocument();
  });

  it("renders Browse Files button", () => {
    render(<ImageUpload />);
    expect(screen.getByText("Browse Files")).toBeInTheDocument();
  });

  // ── error state ──
  it("shows error message", () => {
    render(<ImageUpload error="File too large" />);
    expect(screen.getByText("File too large")).toBeInTheDocument();
  });

  // ── single file selection ──
  it("calls onFilesSelected with a single file", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<ImageUpload onFilesSelected={fn} />);

    const input = getInput();
    const file = createMockFile("page1.png", "image/png");
    await user.upload(input, file);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith([file]);
  });

  it("shows preview after selecting an image", async () => {
    const user = userEvent.setup();
    render(<ImageUpload />);

    const input = getInput();
    const file = createMockFile("page1.png", "image/png");
    await user.upload(input, file);

    // Preview mode is active — Browse Files button should no longer be in empty state
    expect(screen.queryByText("Drop files here or click to browse")).not.toBeInTheDocument();
  });

  it("shows 1 file selected after single file upload", async () => {
    const user = userEvent.setup();
    render(<ImageUpload multiple={false} />);

    const input = getInput();
    await user.upload(input, createMockFile("page1.png", "image/png"));

    expect(screen.getByText("1 file selected")).toBeInTheDocument();
  });

  it("shows 2 files selected after multi-file upload", async () => {
    const user = userEvent.setup();
    render(<ImageUpload multiple />);

    const input = getInput();
    const files = [createMockFile("p1.png", "image/png"), createMockFile("p2.png", "image/png")];
    await user.upload(input, files);

    expect(screen.getByText("2 files selected")).toBeInTheDocument();
  });

  // ── skips oversized files ──
  it("skips files over maxSize", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<ImageUpload onFilesSelected={fn} maxSize={500} />);

    const input = getInput();
    await user.upload(input, createMockFile("big.png", "image/png", 1000));

    expect(fn).not.toHaveBeenCalled();
  });

  // ── drag and drop ──
  it("handles single file drop", () => {
    const fn = vi.fn();
    render(<ImageUpload onFilesSelected={fn} />);

    const dropzone = getDropzone();
    const file = createMockFile("drop.png", "image/png");
    const files = [file] as unknown as FileList;

    fireEvent.drop(dropzone, { dataTransfer: { files } });

    expect(fn).toHaveBeenCalledWith([file]);
  });

  // ── data attributes ──
  it("sets data-has-files after upload", async () => {
    const user = userEvent.setup();
    render(<ImageUpload />);

    const input = getInput();
    await user.upload(input, createMockFile("img.png", "image/png"));

    expect(document.querySelector('[data-has-files]')).toBeInTheDocument();
  });
});
