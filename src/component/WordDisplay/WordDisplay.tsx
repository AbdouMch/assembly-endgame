import styles from "./WordDisplay.module.scss"

import { clsx } from "clsx"

import type { WordLetter } from "@/types.ts"
import MissingLetter from "./MissingLetter"

type Props = {
    letters: WordLetter[]
    isGameLost: boolean
}

export default function WordDisplay({ letters, isGameLost }: Props) {
    return (
        <section
            className={clsx(
                styles.lettersContainer,
                "d-flex justify-content-center flex-wrap mt-5",
            )}
        >
            {letters.map((letter, index) => (
                <MissingLetter
                    key={index}
                    value={letter.value}
                    isFound={letter.isFound}
                    isGameLost={isGameLost}
                />
            ))}
        </section>
    )
}
