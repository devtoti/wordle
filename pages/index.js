import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from "react";
import { WORDS } from "../components/Words";
import Keyboard from '../components/Keyboard';
const ROW_NUM = 6;
const WORD_LENGTH = 5;
const TIMEOUT = 3000

export default function Home() {
  const chosenWord = WORDS[11];
  const [randomWord, setRandomWord] = useState('')
  const [userInput, setUserInput] = useState("");
  const [currRow, setCurrRow] = useState(0)
  const [attempts, setAttempts] = useState(Array(ROW_NUM).fill(''))
  const [gameOver, setGameOver] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(false);


  useEffect(() => setRandomWord(WORDS[Math.floor(Math.random() * WORDS.length)]), [gameOver])
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [attempts, userInput]);

  useEffect(() => {
    placeNewWord(userInput, currRow)
    if (currRow >= ROW_NUM) {
      setGameOver(true)
    }
  }, [userInput, currRow, randomWord])

  const handleKeydown = (e) => {
    let key;
    if (e.key === undefined) {
      let key2 = e.target.innerText.toLowerCase()
      key = key2
    }
    else {
      let key3 = e.key.toLowerCase()
      key = key3
    }
    let prevRow = currRow - 1

    //fn que actualice userInput

    const keyCondition = /^[a-zA-Z]$/
    if (gameOver) return
    if (userInput !== randomWord) {
      if (attempts[prevRow] === randomWord) return
      if (key === 'backspace') {
        setUserInput(prev => prev.slice(0, -1))
      }
      if (userInput.length < WORD_LENGTH && keyCondition.test(key)) {
        setUserInput(prev => prev + key)
      }
    }
    if (userInput.length == WORD_LENGTH && key == 'enter') {
      setTimeout(() => {
        setCurrRow(row => row + 1)
        setUserInput("")
      }, 0)

    }
  }



  const placeNewWord = (word, row) => {
    let newAttempt;
    if (word.length <= WORD_LENGTH) {
      let newAttempt = [...attempts]
      newAttempt[row] = word;
      setAttempts(newAttempt)
    }
    return newAttempt;
  }



  const resetGame = (randomWord) => {
    // seWORDS[Math.floor(Math.random() * WORDS.length)];
    // console.log(randomWord)
    setUserInput("");
    setCurrRow(0)
    setAttempts(Array(ROW_NUM).fill(''))
    setGameOver(false)
    setRightAnswer(false)
  }


  return (
    <div className={styles.app}>
      {chosenWord}

      <div className={styles.board}>
        {gameOver && !rightAnswer && <>
          <h1 className={styles.gameover}>GAME OVER
            <button type='button' onClick={(e) => resetGame(randomWord)}>PLAY AGAIN</button></h1>
          <h3>The right word was&nbsp;
            <span>
              {randomWord}
            </span></h3>
        </>
        }

        {!gameOver && !rightAnswer && (
          <Board
            rows={ROW_NUM}
            userAttempts={attempts}
            userInput={userInput}
            wordToGuess={randomWord}
            currRow={currRow}
            setGameOver={setGameOver}
            setRightAnswer={setRightAnswer}
            rightAnswer={rightAnswer} />
        )}

        {gameOver && rightAnswer && (
          <div className={styles.gameover}>
            <h1>GOOD JOB
            </h1>
            <button type='button' onClick={(e) => resetGame(randomWord)}>PLAY AGAIN?</button>
          </div>
        )}

        {!gameOver && rightAnswer && <>
          <h1 className={styles.gameover}>GOOD JOB
            <button type='button' onClick={(e) => resetGame(randomWord)}>PLAY AGAIN&nbsp;?</button></h1>
        </>}

      </div>
      {userInput}
      <div className={styles.container2}>
        {/* {JSON.stringify(attempts, null, 2)}
        <p>
          ARR LENGTH: {attempts.length}
        </p>
        <br></br> */}
        {/* {currRow} */}
        <Keyboard handleClick={handleKeydown}/>
      </div>
      {/* {randomWord} */}
    </div>
  );
}

const Board = ({ rows, userAttempts, wordToGuess, currRow, ...props }) => {
  const { userInput, setGameOver, rightAnswer, setRightAnswer } = props

  if (rightAnswer) {
    console.log(rightAnswer)
  }
  return (

    Array(rows).fill(null).map((_, ix) => {
      return <div className={styles.row} key={ix + 1}>
        <Row
          userWord={userAttempts[ix]}
          key={ix}
          cells={WORD_LENGTH}
          wordToGuess={wordToGuess}
          setGameOver={setGameOver}
          setRightAnswer={setRightAnswer}
          rowChecked={currRow > ix}
        />
      </div>
    })

  )
}


const Row = ({ userWord, cells, wordToGuess, rowChecked, setGameOver, ...props }) => {

  const { setRightAnswer } = props

  if (rowChecked && userWord === wordToGuess) {
    setTimeout(() => {
      setRightAnswer(true)
      setGameOver(true)
    }
      , TIMEOUT)

  }

  return Array(cells).fill(userWord).map((letter, ix) =>
    <Cell
      userChar={userWord[ix]}
      cell-num={ix}
      key={ix}
      wordToGuess={wordToGuess}
      correctChar={wordToGuess[ix]}
      rowChecked={rowChecked}
      setRightAnswer={setRightAnswer}
    />)
}



const Cell = ({ wordToGuess, userChar, correctChar, rowChecked, setRightAnswer }) => {
  const ref = useRef()

  if (rowChecked) {
    const cell = ref.current?.style
    if (!wordToGuess.includes(userChar)) cell.backgroundColor = 'gray'
    if (wordToGuess.includes(userChar)) cell.backgroundColor = 'hsl(60, 100%, 78%)'
    if (userChar === correctChar) cell.backgroundColor = 'hsl(119, 62%, 63%)'
  }
  // console.log({ userChar, ref })

  return (
    <h4 ref={ref} className={styles.cell}>[{userChar}]</h4>
  )
}