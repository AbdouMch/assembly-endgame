import styles from "./MissingLetter.module.scss"

type Props = {
    value: string
    isFound: boolean
}

export default function MissingLetter({ value, isFound }: Props) {
    return <span className={styles.letter}>{isFound ? value : ""}</span>
}
