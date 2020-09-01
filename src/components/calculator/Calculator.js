import React from 'react'

function Calculator(props) {

  const handleChange = event => {
      props.handleChange(event)
  }

  const increasePercent = async () => {
      props.increasePercent()
  }

  const decreasePercent = async () => {
      props.decreasePercent()
  }

  return (
    <div className='w3-container' style={{ margin: '50px' }}>
      <table className='w3-table w3-border w3-striped w3-myfont'>
        <tbody className='w3-myfont w3-medium'>
          <tr>
            <th>adjust +/-</th>
            <th>item</th>
            <th>calories</th>
            <th>protein grams</th>
            <th>carb grams</th>
            <th>fat grams</th>
          </tr>
          <tr className='w3-border'>
            <td>
              <button
                className='w3-circle w3-theme-l2 w3-wide'
                onClick={decreasePercent}
              >
                {'-'}
              </button>
              <input
                className='w3-theme-l5'
                style={{ width: '75px', margin: '0px 10px' }}
                name='percent'
                type='text'
                value={props.percent}
                onChange={handleChange}
              />
              <button
                className='w3-circle w3-theme-l2'
                onClick={increasePercent}
              >
                {'+'}
              </button>
            </td>
            <td>
              <input
                name='item'
                type='text'
                value={props.item.item}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                style={{ width: '100px' }}
                name='cals'
                type='text'
                value={props.item.cals}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                style={{ width: '100px' }}
                name='protein'
                type='text'
                value={props.item.protein}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                style={{ width: '100px' }}
                name='carbs'
                type='text'
                value={props.item.carbs}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                style={{ width: '100px' }}
                name='fat'
                type='text'
                value={props.item.fat}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{props.macros.protein}</td>
            <td>{props.macros.carbs}</td>
            <td>{props.macros.fat}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Calculator
