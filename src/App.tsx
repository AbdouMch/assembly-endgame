import styles from "./App.module.scss"

import { useState } from "react"
import Confetti from "react-confetti"

import { LANGUAGES } from "@/data/languages"
import { ALPHABET } from "@/data/constants"
import { getRandomWord } from "@/utils.ts"
import type { LanguageState, Key, WordLetter } from "@/types"

import Header from "@/component/Header"
import Keyboard from "@/component/Keyboard"
import FactionList from "@/component/FactionList"
import WordDisplay from "@/component/WordDisplay"
import Status from "@/component/Status"
import ResetButton from "@/component/ResetButton"

function App() {
    // Static variables
    const maxGuessesCount = LANGUAGES.length - 1

    // States
    const [currentWord, setCurrentWord] = useState<string>(getRandomWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    // Derived variables
    const wrongGuessesCount = guessedLetters.filter((l) => !currentWord.includes(l)).length

    const isGameLost = wrongGuessesCount >= maxGuessesCount
    const isGameWon = [...new Set(currentWord)].every((l) => guessedLetters.includes(l))
    const isGameOver = isGameLost || isGameWon

    const lastGuessedLetter = guessedLetters.at(-1) ?? ""
    const isLastGuessCorrect = guessedLetters.length > 0 && currentWord.includes(lastGuessedLetter)
    const lostLanguage =
        !isLastGuessCorrect && wrongGuessesCount > 0 ? LANGUAGES[wrongGuessesCount - 1].name : null

    const keyboard = ALPHABET.split("").map((letter): Key => {
        const held = guessedLetters.includes(letter)
        const exists = currentWord.includes(letter)
        const correct = held && exists

        return {
            value: letter,
            isHeld: held,
            isCorrect: correct,
        }
    })

    const wordLetters = currentWord.split("").map(
        (letter): WordLetter => ({
            value: letter,
            isFound: guessedLetters.includes(letter),
        }),
    )

    const languages = LANGUAGES.map((lang, index): LanguageState => {
        return {
            ...lang,
            lost: index < wrongGuessesCount,
        }
    })

    function handleKeyClick(letter: string): void {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters((prevGuessedLetters: string[]) => [...prevGuessedLetters, letter])
        }
    }

    function handleReset() {
        setCurrentWord(getRandomWord)
        setGuessedLetters([])
    }

    return (
        <>
            {isGameWon && <Confetti className={styles.confetti} />}
            <Header maxGuessesCount={maxGuessesCount} />
            <main className="container d-flex flex-column align-items-md-center">
                <Status
                    isGameLost={isGameLost}
                    isGameWon={isGameWon}
                    isGameOver={isGameOver}
                    lostLanguage={lostLanguage}
                />
                <FactionList languages={languages} />
                <WordDisplay letters={wordLetters} isGameLost={isGameLost} />
                <Keyboard keys={keyboard} isGameOver={isGameOver} onKeyClick={handleKeyClick} />
                {isGameOver && <ResetButton onClick={handleReset} />}
            </main>
        </>
    )
}

export default App
