import styles from "./KeyboardKey.module.scss"

type Props = {
    value: string
    isHeld: boolean
    isCorrect: boolean
    onClick: () => void
}

export default function KeyboardKey({ value, isHeld, isCorrect, onClick }: Props) {
    return (
        <div>
            <button
                className={`${styles.key} btn ${isCorrect ? styles.correct : isHeld ? styles.wrong : ""}`}
                disabled={isHeld}
                onClick={onClick}
            >
                {value}
            </button>
        </div>
    )
}
