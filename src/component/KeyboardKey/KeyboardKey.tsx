import styles from "./KeyboardKey.module.scss"

type Props = {
    value: string
    isHeld: boolean
    isCorrect: boolean
    onClick: () => void
}

export default function KeyboardKey({ value, isHeld, isCorrect, onClick }: Props) {
    const keyStyle = {
        backgroundColor: isHeld && isCorrect ? "#10A95B" : isHeld ? "#EC5D49" : "#FCBA29",
    }

    return (
        <div>
            <button
                className={`${styles.key} btn`}
                style={keyStyle}
                disabled={isHeld}
                onClick={onClick}
            >
                {value}
            </button>
        </div>
    )
}
