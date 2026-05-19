import styles from "./Header.module.scss"

import { clsx } from "clsx"

type Props = {
    maxGuessesCount: number
}

export default function Header({ maxGuessesCount }: Props) {
    return (
        <header className={clsx(styles.header, "d-flex flex-column align-items-center")}>
            <h1>Assembly : Endgame</h1>
            <p>
                Guess the word in under {maxGuessesCount} attempts to keep the programming world
                safe from Assembly!
            </p>
        </header>
    )
}
