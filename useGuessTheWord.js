import { useMemo, useState } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"

export function useGuessTheWord() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  const maxWrongGuesses = languages.length - 1

  const wrongGuessCount = useMemo(() => {
    return guessedLetters.filter(l => !currentWord.includes(l)).length
  }, [guessedLetters, currentWord])

  const isWon = useMemo(() => {
    return currentWord.split("").every(l => guessedLetters.includes(l))
  }, [currentWord, guessedLetters])

  const isLost = wrongGuessCount >= maxWrongGuesses
  const isOver = isWon || isLost

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function guess(letter) {
    if (isOver) return
    setGuessedLetters(prev => (prev.includes(letter) ? prev : [...prev, letter]))
  }

  function reset() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  return {
    currentWord,
    guessedLetters,
    wrongGuessCount,
    maxWrongGuesses,
    isWon,
    isLost,
    isOver,
    lastGuessedLetter,
    isLastGuessIncorrect,
    guess,
    reset
  }
}