import { useState } from "react"
import Header from "@/component/Header"

import { LANGUAGES } from "@/data/languages"
import { ALPHABET } from "@/data/constants"
import type { LanguageState, KeyState, WordLetter } from "@/types"
import Keyboard from "@/component/Keyboard"
import FactionList from "@/component/FactionList"
import WordDisplay from "@/component/WordDisplay"

function App() {
    const note = "Let's get started!"
    const currentWord = "Hello"

    const [languages] = useState<LanguageState[]>(() =>
        LANGUAGES.map((lang) => ({ ...lang, isAlive: true })),
    )

    const [keyboard] = useState<KeyState[]>(() =>
        ALPHABET.split("").map((letter) => ({ value: letter, isHeld: false, isCorrect: false })),
    )

    const [wordLetters] = useState<WordLetter[]>(() =>
        currentWord.split("").map((letter) => ({ value: letter, isFound: false })),
    )

    return (
        <>
            <Header />
            <main className="container d-flex flex-column align-items-md-center">
                <div className="d-flex justify-content-center flex-wrap mt-5">
                    <p>
                        Guess the word in under 8 attempts to keep the programming world safe from
                        Assembly!
                    </p>
                </div>
                <div className="d-flex justify-content-center flex-wrap mt-5">
                    <p>{note}</p>
                </div>
                <FactionList languages={languages} />
                <WordDisplay letters={wordLetters} />
                <Keyboard keys={keyboard} />
            </main>
        </>
    )
}

export default App
