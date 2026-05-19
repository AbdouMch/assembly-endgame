import styles from "./ResetButton.module.scss"
import { clsx } from "clsx"

type Props = {
    onClick: () => void
}

export default function ResetButton({ onClick }: Props) {
    return (
        <section className={clsx(styles.resetButton)}>
            <button className="btn" onClick={onClick}>
                New Game
            </button>
        </section>
    )
}
