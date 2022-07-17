
import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from "react";
import { WORDS } from "./Words";
const ROW_NUM = 2;
const WORD_LENGTH = 5;
// let randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];

export default function Home() {
  const chosenWord = WORDS[11];
  const [userInput, setUserInput] = useState("");
  const [currRow, setCurrRow] = useState(0)
  const [attempts, setAttempts] = useState(Array(ROW_NUM).fill(''))
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [attempts, userInput]);

  useEffect(() => {
    // console.log('userInput = ', userInput)
    placeNewWord(userInput, currRow)
    if (currRow >= ROW_NUM) {
      setGameOver(true)
    }
  }, [userInput, currRow])

  const handleKeydown = (e) => {
    let key = e.key.toLowerCase()
    const keyCondition = /^[a-zA-Z]$/

    //fn que actualice userInput
      let newWord = updateInput(key, currRow, keyCondition)
    
  }


  const updateInput = (key, row, keyCondition) => {
    let newWord;
    if (key == 'backspace') {
      setUserInput(prev => prev.slice(0,-1))
      return
    } 
    if (userInput.length < WORD_LENGTH && keyCondition.test(key)) {
      setUserInput(prev => prev + key)
      newWord = userInput
      return
    } 
    if (userInput.length == WORD_LENGTH && key == 'enter') {
      setCurrRow(row => row +1)
      setUserInput("")
      return
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
  randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  setUserInput("");
  setCurrRow(0)
  setAttempts(Array(ROW_NUM).fill(''))
  setGameOver(false)
  return
  }
  return (
    <div className={styles.app}>
        {chosenWord}
        {gameOver && <h1>GAME OVER
          <button type='button' onClick={(e) => resetGame(randomWord)}>PLAY AGAIN</button></h1>}
        {!gameOver && (
      <div className={styles.board}>
        <Board rows={ROW_NUM} userAttempts={attempts} wordToGuess={chosenWord} currRow={currRow} />
      </div>)}
        {userInput}
        <div className={styles.preview}>
          {JSON.stringify(attempts, null, 2)}
          <p>
            ARR LENGTH: {attempts.length}
          </p>
          <br></br>
          {currRow}
        </div>
      {randomWord}
    </div>
  );
}

const Board = ({ rows, userAttempts, wordToGuess, currRow }) => {
  if (currRow == rows){
    // setGameOver(true)
    // return
  }
  return (
    <div className={styles.cell}>
      {Array(rows).fill(null).map((_, ix) => {
      return <div className={styles.row}key={ix+1}><Row userWord={userAttempts[ix]} key={ix} cells={WORD_LENGTH} wordToGuess={wordToGuess} rowChecked={currRow > ix ? true : false}/></div>})}
    </div>
  )
}


const Row = ({ userWord, cells, wordToGuess, rowChecked }) => {

  return Array(cells).fill(userWord).map((letter, ix) => <Cell userLetter={userWord[ix]} cell-num={ix} key={ix} wordToGuess={wordToGuess} correctLetter={wordToGuess[ix]} rowChecked={rowChecked}/>)
}



const Cell = ({ wordToGuess, userLetter, correctLetter, rowChecked }) => {
  const ref = useRef()
  // if (wordToGuess.includes(userLetter) === false) {
  //   ref.current.style.backgroundColor = 'gray'
  // }
  if (rowChecked && wordToGuess.includes(userLetter)) {
    ref.current.style.backgroundColor = 'hsl(60, 100%, 78%)'

  }
  if (rowChecked && userLetter == correctLetter) {
    ref.current.style.backgroundColor = 'hsl(119, 62%, 63%)'
  }



  return (
    <h4 ref={ref} className={styles.cell}>[{userLetter}]</h4>
  )
}