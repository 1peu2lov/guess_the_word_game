import { clsx } from "clsx";

export default function Keyboard({
  currentWord,
  guessedLetters,
  isOver,
  guess,
}) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return (
    <section className="keyboard">
      {alphabet.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);

        const className = clsx({
          correct: isCorrect,
          wrong: isWrong,
        });

        return (
          <button
            className={className}
            key={letter}
            disabled={isOver || isGuessed}
            aria-pressed={isGuessed}
            aria-label={`Letter ${letter}`}
            onClick={() => guess(letter)}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </section>
  );
}