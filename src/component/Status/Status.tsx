import styles from "./Status.module.scss"

import type { ReactElement } from "react"
import { clsx } from "clsx"

import { getFarewellText } from "@/utils"

type Props = {
    isGameLost: boolean
    isGameWon: boolean
    isGameOver: boolean
    lostLanguage: string | null
}

export default function Status({ isGameLost, isGameWon, isGameOver, lostLanguage }: Props) {
    function getStatus(): ReactElement | null {
        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }

        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        if (lostLanguage !== null) {
            return <p>{getFarewellText(lostLanguage)}</p>
        }

        return null
    }

    return (
        <section
            className={clsx(
                styles.status,
                "d-flex flex-column justify-content-center align-items-center",
                {
                    [styles.lost]: isGameLost,
                    [styles.won]: isGameWon,
                    [styles.farewell]: !isGameOver && null !== lostLanguage,
                },
            )}
        >
            {getStatus()}
        </section>
    )
}
