import React from 'react'

export default React.createContext({
    meal:{name:'newMeal'},
    updateMeal: (newMeal) => {
        this.meal = newMeal
    }
})