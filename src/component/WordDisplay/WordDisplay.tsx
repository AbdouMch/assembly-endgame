import styles from "./WordDisplay.module.scss"
import type { WordLetter } from "@/types.ts"
import MissingLetter from "@/component/MissingLetter"

type Props = {
    letters: WordLetter[]
}

export default function WordDisplay({ letters }: Props) {
    return (
        <div className={`${styles.lettersContainer} d-flex justify-content-center flex-wrap mt-5`}>
            {letters.map((letter, index) => (
                <MissingLetter key={index} value={letter.value} isFound={letter.isFound} />
            ))}
        </div>
    )
}
