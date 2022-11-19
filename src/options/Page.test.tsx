/**
 * @jest-environment jsdom
 */
import { describe, test } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/testing-react";
import meta, { Default } from "./Page.stories.js";

describe("Page", () => {
  test("renders", () => {
    const Story = composeStory(Default, meta);
    render(<Story />);
    expect(screen.getByRole('heading', { name: /options/i })).toBeInTheDocument();
  });
});
