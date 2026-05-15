import styles from "./LanguageChip.module.scss"

type Props = {
    name: string
    isAlive: boolean
    backgroundColor: string
    color: string
}

export default function LanguageChip({ name, isAlive, backgroundColor, color }: Props) {
    const chipStyle = {
        backgroundColor: backgroundColor,
        color: color,
        cursor: "none",
    }

    return (
        <div className={styles.chipContainer}>
            <span className={styles.chip} style={chipStyle}>
                {name}
            </span>
            {!isAlive && (
                <span className={styles.overlay}>
                    <i className="fa-solid fa-skull-crossbones"></i>
                </span>
            )}
        </div>
    )
}
