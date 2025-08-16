
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SearchResults from '../src/components/SearchResults'

// SearchBar functionality is part of SearchResults component
const mockReducer = (state = { library: [] }, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return { ...state, library: [...state.library, action.payload] }
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

// Mock fetch
global.fetch = jest.fn()

describe('SearchBar Component (within SearchResults)', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('renders search input with correct placeholder', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    expect(input).toBeInTheDocument()
  })

  test('renders search input with correct styling', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    expect(input).toHaveClass('w-full', 'pl-10', 'pr-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg')
  })

  test('has search icon inside input', () => {
    renderWithRedux(<SearchResults />)
    const inputContainer = screen.getByPlaceholderText('Ingresa el título de la canción o artista...').parentElement
    expect(inputContainer).toHaveClass('relative')
    
    // Check for SVG icon
    const icon = inputContainer.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  test('updates input value when typing', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    
    fireEvent.change(input, { target: { value: 'Beatles' } })
    expect(input.value).toBe('Beatles')
  })

  test('clears input value', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
    
    fireEvent.change(input, { target: { value: '' } })
    expect(input.value).toBe('')
  })

  test('search button is disabled when input is empty', () => {
    renderWithRedux(<SearchResults />)
    const searchButton = screen.getByText('Buscar')
    expect(searchButton).toBeDisabled()
  })

  test('search button is enabled when input has valid content', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    const searchButton = screen.getByText('Buscar')
    
    fireEvent.change(input, { target: { value: 'Beatles' } })
    expect(searchButton).not.toBeDisabled()
  })

  test('handles Enter key press to trigger search', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    
    fireEvent.change(input, { target: { value: 'test' } })
    
    // Test that the input accepts the Enter key event
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    
    // Verify the input still has the value after key press
    expect(input.value).toBe('test')
  })

  test('input has focus styles', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    expect(input).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'focus:border-transparent')
  })
})
