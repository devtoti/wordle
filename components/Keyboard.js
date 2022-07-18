import {useState, useEffect} from 'react'
import styles from '../styles/Keyboard.module.css'
import keypress from '../public/mp3/typewriter.mp3'

export default function Keyboard({handleClick}) {
    const [currInput, setCurrInput] = useState('')
    const sound = new Audio(keypress)
    const keyPress = (e) => {
        sound.play()
        handleClick(e)
    }
    const Keyrow = ({row}) => {
        return (
            <div className={styles.keyrow}>
                {row.map(key => <div className={styles.key}
                onClick={keyPress}>
                    {key}
                    </div>
                    )}
                
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {currInput}
        <div className={styles.keyboard}>
            
           <Keyrow row={row1} />
           <Keyrow row={row2} />
           <Keyrow row={row3} />
            {/* {row2} */}
        </div>
        </div>
    )
}

    const row1 = [
        "q", 
        "w", 
        "e", 
        "r", 
        "t", 
        "y", 
        "u", 
        "i", 
        "o", 
        "p", 
        "backspace",
    ]
    
    const row2 = [
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "enter",
    ]
    const row3 = [
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
    ]