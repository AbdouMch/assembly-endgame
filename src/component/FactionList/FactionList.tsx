import styles from "./FactionList.module.scss"

import { clsx } from "clsx"

import LanguageChip from "./LanguageChip"
import type { LanguageState } from "@/types.ts"

type Props = {
    languages: LanguageState[]
}

export default function FactionList({ languages }: Props) {
    return (
        <section
            className={clsx(
                styles.languagesContainer,
                "d-flex justify-content-center flex-wrap mt-5",
            )}
        >
            {languages.map((language) => (
                <LanguageChip
                    key={language.name}
                    name={language.name}
                    lost={language.lost}
                    backgroundColor={language.backgroundColor}
                    color={language.color}
                />
            ))}
        </section>
    )
}
