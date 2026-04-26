import { Game } from "./game/game";

const loggedIn = false;
export const game = new Game();

if (loggedIn)
{
    game.start();
}
