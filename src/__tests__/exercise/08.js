// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function TestComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestComponent />)

  const message = screen.getByText(/current count/i)
  const incrementBtn = screen.getByRole('button', {name: /increment/i})
  const decrementBtn = screen.getByRole('button', {name: /decrement/i})

  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(incrementBtn)
  
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrementBtn)
  await userEvent.click(decrementBtn)
  expect(message).toHaveTextContent('Current count: -1')
})

/* eslint no-unused-vars:0 */
