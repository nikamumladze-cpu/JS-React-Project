import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

it("უნდა გამოიძახოს onClick ფუნქცია დაჭერისას", () => {
  const handleClick = vi.fn();
  render(<button onClick={handleClick}>დამატება</button>);

  fireEvent.click(screen.getByText("დამატება"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
