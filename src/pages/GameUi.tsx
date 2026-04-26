import {useCallback, useRef, useEffect} from "react";

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
        gameUiContainerRef.current?.addEventListener("click", clickUiToLockMouse);
    }, []);


    return (
        <div id = "gameUiContaier" ref = {gameUiContainerRef}>
        </div>
    );
};