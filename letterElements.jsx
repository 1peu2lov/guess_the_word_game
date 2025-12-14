import { clsx } from "clsx";

export default function LettersDisplay({ currentWord, guessedLetters, isLost }) {
  return (
    <section className="word">
      {currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isLost || guessedLetters.includes(letter);
        const letterClassName = clsx(
          isLost && !guessedLetters.includes(letter) && "missed-letter"
        );

        return (
          <span key={index} className={letterClassName}>
            {shouldRevealLetter ? letter.toUpperCase() : ""}
          </span>
        );
      })}
    </section>
  );
}