import styles from "./Keyboard.module.scss"

import KeyboardKey from "@/component/KeyboardKey"
import type { KeyState } from "@/types.ts"

type Props = {
    keys: KeyState[]
}

export default function Keyboard({ keys }: Props) {
    return (
        <div className={`${styles.keyboardContainer} d-flex justify-content-center flex-wrap mt-5`}>
            {keys.map((key) => (
                <KeyboardKey
                    key={key.value}
                    value={key.value}
                    isHeld={key.isHeld}
                    isCorrect={key.isCorrect}
                />
            ))}
        </div>
    )
}
