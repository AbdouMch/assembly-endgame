import styles from "./MissingLetter.module.scss"
import { clsx } from "clsx"

type Props = {
    value: string
    isFound: boolean
    isGameLost: boolean
}

export default function MissingLetter({ value, isFound, isGameLost }: Props) {
    return (
        <span
            className={clsx(styles.letter, {
                [styles.gameLost]: !isFound && isGameLost,
            })}
        >
            {isFound || isGameLost ? value : ""}
        </span>
    )
}
