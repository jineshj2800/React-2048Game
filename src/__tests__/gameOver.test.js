import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameOver from "../components/GameOver";

test("display Game Over message when game ends", () => {
  const gameState = [2, 4, 2, 4, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 2];
  render(<GameOver gameState={gameState} />);
  expect(screen.getByText(/game over/i)).toHaveTextContent("Game Over !!");
});

test("clicking the try again button when game ends", async () => {
  const gameState = [2, 4, 2, 4, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 2];
  const onTryAgain = jest.fn();
  render(<GameOver gameState={gameState} onTryAgain={onTryAgain} />);

  userEvent.click(screen.getByRole("button", { name: /try again/i }));

  expect(onTryAgain).toHaveBeenCalledTimes(1);
  screen.debug();
});
