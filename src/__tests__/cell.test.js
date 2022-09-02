import { render, screen } from "@testing-library/react";
import Cell from "../components/Cell";

test("display cell with non-zero value", () => {
  const value = 4;
  render(<Cell value={value} />);
  expect(screen.getByText(/4/)).toHaveTextContent(value);
});

test("display cell with zero value", () => {
  const value = 0;
  render(<Cell value={value} />);
  expect(screen.queryByText(/[0-9]/)).not.toBeInTheDocument();
});
