import {useCallback, useRef, useEffect} from "react";
import {game} from "../index";

export const GameUi = () =>
{
    const gameUiContainerRef = useRef<HTMLDivElement>(null);

    const clickUiToLockMouse = useCallback(() =>{
        gameUiContainerRef.current?.requestPointerLock({
            unadjustedMovement: true
        })
    }, []);

    useEffect(() =>
    {
        game.start();
        console.log(game);
        gameUiContainerRef.current?.addEventListener("click", clickUiToLockMouse);

        return () =>
        {
            game.unMount();
        }
    }, []);

    return (
        <div id = "gameUiContaier" ref = {gameUiContainerRef}>
        </div>
    );
};