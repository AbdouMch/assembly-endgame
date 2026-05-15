import { useState } from "react"
import Header from "@/component/Header"

import { LANGUAGES } from "@/data/languages"
import { ALPHABET } from "@/data/constants"
import type { LanguageState, Key, WordLetter } from "@/types"
import Keyboard from "@/component/Keyboard"
import FactionList from "@/component/FactionList"
import WordDisplay from "@/component/WordDisplay"

function App() {
    let wrongGuesses = 0

    const note = "Let's get started!"
    const currentWord = "Hello"

    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())

    const keyboard = ALPHABET.split("").map((letter): Key => {
        const held = guessedLetters.has(letter.toLowerCase())
        const exists = currentWord.toLowerCase().includes(letter.toLowerCase())
        const correct = held && exists

        if (held && !exists) {
            wrongGuesses++
        }

        return {
            value: letter,
            isHeld: held,
            isCorrect: correct,
        }
    })

    const wordLetters = currentWord.split("").map(
        (letter): WordLetter => ({
            value: letter,
            isFound: guessedLetters.has(letter.toLowerCase()),
        }),
    )

    const languages = LANGUAGES.map((lang): LanguageState => {
        if (wrongGuesses > 0) {
            wrongGuesses--

            return {
                ...lang,
                isAlive: false,
            }
        }

        return {
            ...lang,
            isAlive: true,
        }
    })

    function handleKeyClick(lettre: string): void {
        setGuessedLetters((prevSet: Set<string>) => new Set([...prevSet, lettre]))
    }

    return (
        <>
            <Header />
            <main className="container d-flex flex-column align-items-md-center">
                <div className="d-flex justify-content-center flex-wrap mt-5">
                    <p>{note}</p>
                </div>
                <FactionList languages={languages} />
                <WordDisplay letters={wordLetters} />
                <Keyboard keys={keyboard} onKeyClick={handleKeyClick} />
            </main>
        </>
    )
}

export default App
