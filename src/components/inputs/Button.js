import React from 'react'
import styles from './Button.module.css'

const Button = props => {

    const getClassName = props => {
        console.log(props)
        let className = styles.className ? props.className : 'default'
        return className
    }

    return (
        <button 
            className={styles[getClassName(props)]}
            tabIndex={props.tabIndex ? props.tabIndex : ''} 
            type='submit'
            name={props.name ? props.name : ''}
        >
        {props.text}
      </button>
    )
}

export default Button