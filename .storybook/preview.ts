import type { Preview } from "@storybook/react";
import "../src/tokens/globals.css";
import "../tokens/decisions-color-dark.css";
import "../tokens/decisions-color-light.css";
import "../tokens/decisions-spacing.css";
import "../tokens/decisions-typography.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fafbfc" },
        { name: "dark", value: "#1a1b1e" },
      ],
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
        ],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
