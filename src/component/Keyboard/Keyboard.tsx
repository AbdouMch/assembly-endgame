import styles from "./Keyboard.module.scss"

import { clsx } from "clsx"

import Key from "./Key"
import type { Key as KeyType } from "@/types.ts"

type Props = {
    keys: KeyType[]
    onKeyClick: (lettre: string) => void
    isGameOver: boolean
}

export default function Keyboard({ keys, onKeyClick, isGameOver }: Props) {
    return (
        <section className={clsx(styles.keyboardContainer, "mt-5")}>
            {keys.map((key) => (
                <Key
                    key={key.value}
                    value={key.value}
                    isHeld={key.isHeld}
                    isCorrect={key.isCorrect}
                    isGameOver={isGameOver}
                    onClick={() => onKeyClick(key.value.toLowerCase())}
                />
            ))}
        </section>
    )
}
