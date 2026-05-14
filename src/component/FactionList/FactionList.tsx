import styles from "./FactionList.module.scss"

import LanguageChip from "@/component/LanguageChip"
import type { LanguageState } from "@/types.ts"

type Props = {
    languages: LanguageState[]
}

export default function FactionList({ languages }: Props) {
    return (
        <div
            className={`${styles.languagesContainer} d-flex justify-content-center flex-wrap mt-5`}
        >
            {languages.map((language) => (
                <LanguageChip
                    key={language.name}
                    name={language.name}
                    isAlive={language.isAlive}
                    backgroundColor={language.backgroundColor}
                    color={language.color}
                />
            ))}
        </div>
    )
}
