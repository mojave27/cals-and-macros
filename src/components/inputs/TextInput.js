import React from 'react'
import styles from './TextInput.module.css'

const TextInput = props => {

    return (
        <input 
            className={styles.textInput}
            type='text'
            name={props.name}
            placeholder={props.placeholder ? props.placeholder : ''}
        />
    )
}

export default TextInput