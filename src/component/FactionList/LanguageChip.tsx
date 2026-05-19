import styles from "./LanguageChip.module.scss"
import { clsx } from "clsx"

type Props = {
    name: string
    lost: boolean
    backgroundColor: string
    color: string
}

export default function LanguageChip({ name, lost, backgroundColor, color }: Props) {
    const chipStyle = {
        backgroundColor: backgroundColor,
        color: color,
    }

    return (
        <span className={clsx(styles.chip, lost && styles.lost)} style={chipStyle}>
            {name}
        </span>
    )
}
