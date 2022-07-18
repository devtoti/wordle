import { useState, useEffect } from 'react'
import styles from '../styles/Keyboard.module.css'
// import audio from './public/mp3/typewriter.mp3'
import { Howl, Howler } from 'howler';

export default function Keyboard({ handleClick }) {
    const [currInput, setCurrInput] = useState('')
    const [keySound, setKeySound] = useState(null)
    const [returnSound, setReturnSound] = useState(null)
    // const {Howl, Howler} = require('howler');

    useEffect(() => {
        const sound1 = new Howl({
            src: ['/mp3/key.mp3'],
            volume: 0.4
        });
        const sound2 = new Howl({
            src: ['/mp3/carriage-return.mp3'],
            volume: 0.2
        });
        setKeySound(sound1)
        setReturnSound(sound2)
    }, [])

    const keyPress = (e) => {
        // sound.play()
        if (e.target.innerText.toLowerCase() === 'enter') {
            returnSound.play()
        } else {

            keySound.play()
        }
        handleClick(e)
    }
    const Keyrow = ({ row }) => {
        return (
            <div className={styles.keyrow} >
                {row.map((key, ix) => <div className={styles.key}
                    onClick={keyPress} key={ix}>
                    {key}
                </div>
                )}

            </div>
        )
    }
    return (
     
            <div className={styles.keyboard}>

                <Keyrow row={row1} />
                <Keyrow row={row2} />
                <Keyrow row={row3} />
                {/* {row2} */}
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