// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import { useCurrentPosition } from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location',  () => {
  const fakePosition = {
    coords:{
      latitude: 59,
      longitude: 45
    }
  }
  
  let setCurrentPositionMock
  function useCurrentPositionMock() {
    const state = React.useState([])
    setCurrentPositionMock = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useCurrentPositionMock)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setCurrentPositionMock([fakePosition])
  })
  
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords?.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords?.longitude}`,
  )
})

test('displays error message when geolocation is not supported', () => {
  const fakeError = new Error(
    'Geolocation is not supported or permission denied',
  )
  
  let setCurrentPositionMock
  function useCurrentPositionMock() {
    const state = React.useState([])
    setCurrentPositionMock = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useCurrentPositionMock)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => {
    setCurrentPositionMock([fakeError])
  })
  screen.debug()

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message)
})
/*
eslint
  no-unused-vars: "off",
*/
