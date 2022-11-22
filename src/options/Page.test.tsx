/**
 * @jest-environment jsdom
 */
import { setTimeout } from "node:timers/promises";
import { describe, test } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/testing-react";
import meta, { Default } from "./Page.stories.js";

describe("Page", () => {
  test("renders", async () => {
    const Story = composeStory(Default, meta);
    await act(async () => {
      render(<Story />);
      await setTimeout(0);
    });
    expect(screen.getByRole('heading', { name: /options/i })).toBeInTheDocument();
  });
});
