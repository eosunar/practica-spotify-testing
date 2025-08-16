
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from '../app/page'

// Simple mock reducer for testing
const mockReducer = (state = { library: [] }, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return { ...state, library: [...state.library, action.payload] }
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

describe('App Component', () => {
  test('renders main header with title', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Biblioteca Musical')).toBeInTheDocument()
  })

  test('renders navigation buttons', () => {
    renderWithRedux(<App />)
    expect(screen.getByRole('button', { name: /buscar canciones/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mi biblioteca/i })).toBeInTheDocument()
  })

  test('shows search tab by default', () => {
    renderWithRedux(<App />)
    const searchButton = screen.getByRole('button', { name: /buscar canciones/i })
    expect(searchButton).toHaveClass('bg-blue-600')
  })

  test('switches to library tab when clicked', () => {
    renderWithRedux(<App />)
    const libraryButton = screen.getByRole('button', { name: /mi biblioteca/i })
    fireEvent.click(libraryButton)
    expect(libraryButton).toHaveClass('bg-purple-600')
  })

  test('renders footer', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Biblioteca Musical - Descubre y organiza tu música favorita')).toBeInTheDocument()
  })

  test('applies correct CSS classes for styling', () => {
    renderWithRedux(<App />)
    const mainContainer = document.querySelector('.min-h-screen')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('bg-gradient-to-br')
  })

  test('navigation buttons have correct icons', () => {
    renderWithRedux(<App />)
    // Check that lucide-react icons are rendered (they render as SVG elements)
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(0)
  })
})
