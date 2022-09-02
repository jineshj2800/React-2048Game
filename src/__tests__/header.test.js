import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

test("check best score validation", () => {
  const score = 512;
  const higherNewScore = 684;
  const lowerNewScore = 600;
  const mockStorage = {};
  window.localStorage.getItem = (key) => mockStorage[key];
  window.localStorage.setItem = (key, value) => (mockStorage[key] = value);

  const { rerender } = render(<Header score={score} />);

  rerender(<Header score={higherNewScore} />);
  expect(screen.getByTestId("score")).toHaveTextContent(higherNewScore);
  expect(screen.getByTestId("best-score")).toHaveTextContent(higherNewScore);

  rerender(<Header score={lowerNewScore} />);
  expect(screen.getByTestId("score")).toHaveTextContent(lowerNewScore);
  expect(screen.getByTestId("best-score")).toHaveTextContent(higherNewScore);
});

test("display header with score and best score", () => {
  const score = 512;
  render(<Header score={score} />);
  expect(screen.getByText(/2048/i));
  expect(screen.getByTestId("score")).toHaveTextContent(score);
  expect(screen.getByTestId("best-score")).toHaveTextContent(score);
});
