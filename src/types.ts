export type Language = {
    name: string
    backgroundColor: string
    color: string
}

export type LanguageState = Language & {
    isAlive: boolean
}

export type Key = {
    value: string
    isHeld: boolean
    isCorrect: boolean
}

export type WordLetter = {
    value: string
    isFound: boolean
}
