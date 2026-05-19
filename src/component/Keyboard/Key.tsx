import styles from "./Key.module.scss"

import { clsx } from "clsx"

type Props = {
    value: string
    isHeld: boolean
    isCorrect: boolean
    isGameOver: boolean
    onClick: () => void
}

export default function Key({ value, isHeld, isCorrect, isGameOver, onClick }: Props) {
    const isDisabled = isHeld || isGameOver

    return (
        <button
            className={clsx(styles.key, styles.btn, "btn", {
                [styles.correct]: isCorrect,
                [styles.wrong]: isHeld && !isCorrect,
                [styles.disabled]: isDisabled,
            })}
            disabled={isDisabled}
            onClick={onClick}
        >
            {value}
        </button>
    )
}
