import { clsx } from "clsx";
import Confetti from "react-confetti";

import { languages } from "./languages";
import { getFarewellText } from "./utils";
import { useGuessTheWord } from "./useGuessTheWord";
import LanguageChips from "./LanguageChips";
import LettersDisplay from "./letterElements";
import Keyboard from "./Keyboard";

export default function GuessTheWord() {
  const {
    currentWord,
    guessedLetters,
    maxWrongGuesses,
    wrongGuessCount,
    isWon,
    isLost,
    isOver,
    isLastGuessIncorrect,
    guess,
    reset,
  } = useGuessTheWord();


  const gameStatusClass = clsx("game-status", {
    won: isWon,
    lost: isLost,
    farewell: !isOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
  if (!isOver && isLastGuessIncorrect) {
    return (
      <p className="farewell-message">
        {getFarewellText(languages[wrongGuessCount - 1]?.name)}
      </p>
    );
  }

  if (isWon) return (<><h2>You win!</h2><p>Well done! 🎉</p></>);
  if (isLost) return (<><h2>Game over!</h2><p>You lose! You need to start learning C++ 😭</p></>);

  return null;
}

  return (
    <main>
        <header>
            <h1>GuessTheWord : escape from IA</h1>
            <p>
            Guess the word within {maxWrongGuesses} attempts to keep the programming world
            safe from IA!
            </p>
        </header>

        <section aria-live="polite" role="status" className={gameStatusClass}>
            {renderGameStatus()}
        </section>

        <LanguageChips wrongGuessCount={wrongGuessCount} languages={languages} />

        <LettersDisplay currentWord={currentWord} guessedLetters={guessedLetters}
        isLost={isLost}/>

        <Keyboard currentWord={currentWord} guessedLetters={guessedLetters}
            isOver={isOver}
            guess={guess}/>

        {/* <section className="sr-only" aria-live="polite" role="status">
            {lastGuessedLetter ? (
            <p>
                {currentWord.includes(lastGuessedLetter)
                ? `Correct! The letter ${lastGuessedLetter} is in the word.`
                : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
                You have {maxWrongGuesses - wrongGuessCount} attempts left.
            </p>
            ) : (
            <p>Start guessing letters. You have {maxWrongGuesses} attempts.</p>
            )}

            <p>
            Current word:{" "}
            {currentWord
                .split("")
                .map((l) => (guessedLetters.includes(l) ? l + "." : "blank."))
                .join(" ")}
            </p>
        </section> */}


        {isOver && (
            <button className="new-game" onClick={reset}>
            New Game
            </button>
        )}

        {isWon && <Confetti />}
    </main>
  );
}
