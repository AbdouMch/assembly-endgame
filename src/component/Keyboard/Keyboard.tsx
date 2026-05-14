import styles from "./Keyboard.module.scss"

import KeyboardKey from "@/component/KeyboardKey"
import type { KeyState } from "@/types.ts"

type Props = {
    keys: KeyState[]
    onKeyClick: (lettre: string) => void
}

export default function Keyboard({ keys, onKeyClick }: Props) {
    return (
        <div className={`${styles.keyboardContainer} d-flex justify-content-center flex-wrap mt-5`}>
            {keys.map((key) => (
                <KeyboardKey
                    key={key.value}
                    value={key.value}
                    isHeld={key.isHeld}
                    isCorrect={key.isCorrect}
                    onClick={() => onKeyClick(key.value.toLowerCase())}
                />
            ))}
        </div>
    )
}
