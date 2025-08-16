
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Library from '../src/components/Library'

const mockReducer = (state = { library: [] }, action) => {
  switch (action.type) {
    case 'REMOVE_SONG':
      return { ...state, library: state.library.filter(song => song.trackId !== action.payload) }
    default:
      return state
  }
}

const renderWithRedux = (component, initialState = { library: [] }) => {
  const store = createStore(mockReducer, initialState)
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  }
}

describe('Library Component', () => {
  test('renders library header', () => {
    renderWithRedux(<Library />)
    expect(screen.getByText('Mi Biblioteca Musical')).toBeInTheDocument()
  })

  test('shows empty state when no songs', () => {
    renderWithRedux(<Library />)
    expect(screen.getByText('Tu biblioteca está vacía')).toBeInTheDocument()
    expect(screen.getByText('0 canciones en tu biblioteca')).toBeInTheDocument()
  })

  test('displays correct song count', () => {
    const initialState = {
      library: [
        { trackId: 1, trackName: 'Song 1', artistName: 'Artist 1' },
        { trackId: 2, trackName: 'Song 2', artistName: 'Artist 2' }
      ]
    }
    renderWithRedux(<Library />, initialState)
    expect(screen.getByText('2 canciones en tu biblioteca')).toBeInTheDocument()
  })

  test('uses correct CSS classes for styling', () => {
    renderWithRedux(<Library />)
    const container = document.querySelector('.max-w-4xl')
    expect(container).toBeInTheDocument()
  })

  test('renders with proper structure', () => {
    renderWithRedux(<Library />)
    // Check for main container structure
    expect(document.querySelector('.bg-white.rounded-lg.shadow-lg')).toBeInTheDocument()
  })
})
