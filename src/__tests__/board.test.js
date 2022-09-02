import { render, screen } from "@testing-library/react";
import Board from "../components/Board/Board";

test("initial display of board", () => {
  const score = 0;
  const onScoreChange = jest.fn();
  const { rerender } = render(
    <Board score={score} onScoreChange={onScoreChange} />
  );
  screen.debug();
  expect(screen.queryByText(/[24]/i));
});
