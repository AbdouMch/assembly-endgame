import { WORDS } from "./data/words"
import { FAREWELL_MESSAGES } from "@/data/farewells.ts"

function getRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length)
}

export function getFarewellText(language: string): string {
    return FAREWELL_MESSAGES[getRandomIndex(FAREWELL_MESSAGES)].replace("{language}", language)
}

export function getRandomWord(): string {
    return WORDS[getRandomIndex(WORDS)]
}
