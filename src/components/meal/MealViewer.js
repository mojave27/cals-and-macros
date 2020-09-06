import React, { useEffect, useState } from 'react'
// import { Button, Divider, Input } from 'semantic-ui-react'
import MealTable from '../table/MealTable/MealTable'
import retrieveMeals from '../../apis/retrieveMeals'
import styles from './Meal.module.css'

const MealViewer = props => {
  const [meals, setMeals] = useState([])
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    retrieive()
  }, [])

  const retrieive = async () => {
    const response = await retrieveMeals('')
    setMeals(response)
  }

  return (
    <div className={styles.container}>
      {meals.map((meal, index) => {
        return (
          <div key={`${meal}-${index}`}>
            <label>{meal.name}</label>
            <MealTable viewOnly={true} foodList={meal.foodList} />
          </div>
        )
      })}
    </div>
  )
}

export default MealViewer
