// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = '';
})

const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  button: 0,
})
test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  const root = createRoot(div)

  act(() => root.render(<Counter />))
  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  act(() => increment.dispatchEvent(clickEvent))
  expect(message.textContent).toBe('Current count: 1')

  act(() => decrement.dispatchEvent(clickEvent))
  expect(message.textContent).toBe('Current count: 0')

  div.remove()
})

/* eslint no-unused-vars:0 */
