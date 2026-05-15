import styles from "./Header.module.scss"

export default function Header() {
    return (
        <header className={`${styles.header} d-flex flex-column align-items-center`}>
            <h1>Assembly : Endgame</h1>
            <p>
                Guess the word in under 8 attempts to keep the programming world safe from Assembly!
            </p>
        </header>
    )
}
