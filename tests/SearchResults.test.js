
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SearchResults from '../src/components/SearchResults'

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

describe('SearchResults Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('renders search header and input', () => {
    renderWithRedux(<SearchResults />)
    expect(screen.getByText('Buscar Canciones')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingresa el título de la canción o artista...')).toBeInTheDocument()
  })

  test('renders search button', () => {
    renderWithRedux(<SearchResults />)
    expect(screen.getByText('Buscar')).toBeInTheDocument()
  })

  test('updates search term on input change', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    
    fireEvent.change(input, { target: { value: 'test song' } })
    expect(input.value).toBe('test song')
  })

  test('disables search button when input is empty', () => {
    renderWithRedux(<SearchResults />)
    const searchButton = screen.getByText('Buscar')
    expect(searchButton).toBeDisabled()
  })

  test('enables search button when input has value', () => {
    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    const searchButton = screen.getByText('Buscar')
    
    fireEvent.change(input, { target: { value: 'test' } })
    expect(searchButton).not.toBeDisabled()
  })

  test('performs search on button click', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [
          {
            trackId: 1,
            trackName: 'Test Song',
            artistName: 'Test Artist'
          }
        ]
      })
    }
    fetch.mockResolvedValueOnce(mockResponse)

    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    const searchButton = screen.getByText('Buscar')
    
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })
  })

  test('displays loading state during search', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ results: [] })
    }
    fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100)))

    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    const searchButton = screen.getByText('Buscar')
    
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(searchButton)
    
    expect(screen.getByText('Buscando...')).toBeInTheDocument()
  })

  test('handles search errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    renderWithRedux(<SearchResults />)
    const input = screen.getByPlaceholderText('Ingresa el título de la canción o artista...')
    
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('Buscar')).toBeInTheDocument() // Should return to normal state
    })
  })
})
