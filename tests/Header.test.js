
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Since Header is part of the main App component, we'll test the header section of App
import App from '../app/page'

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

describe('Header Component (within App)', () => {
  test('renders header with correct styling', () => {
    renderWithRedux(<App />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white/80', 'backdrop-blur-sm', 'border-b', 'border-gray-200', 'sticky', 'top-0', 'z-50')
  })

  test('displays main title with icon', () => {
    renderWithRedux(<App />)
    expect(screen.getByText('Biblioteca Musical')).toBeInTheDocument()
    
    // Check for the Music icon (SVG element)
    const musicIcon = document.querySelector('svg')
    expect(musicIcon).toBeInTheDocument()
  })

  test('renders navigation buttons with correct text', () => {
    renderWithRedux(<App />)
    expect(screen.getByRole('button', { name: /buscar canciones/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mi biblioteca/i })).toBeInTheDocument()
  })

  test('search button is active by default', () => {
    renderWithRedux(<App />)
    const searchButton = screen.getByRole('button', { name: /buscar canciones/i })
    expect(searchButton).toHaveClass('bg-blue-600', 'text-white', 'shadow-lg')
  })

  test('library button becomes active when clicked', () => {
    renderWithRedux(<App />)
    const libraryButton = screen.getByRole('button', { name: /mi biblioteca/i })
    
    fireEvent.click(libraryButton)
    
    expect(libraryButton).toHaveClass('bg-purple-600', 'text-white', 'shadow-lg')
  })

  test('navigation buttons have correct icons', () => {
    renderWithRedux(<App />)
    
    // Check that there are SVG elements (icons) in the navigation
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(2) // At least search, library, and main music icons
  })

  test('title has gradient text styling', () => {
    renderWithRedux(<App />)
    const title = screen.getByText('Biblioteca Musical')
    expect(title).toHaveClass('text-2xl', 'font-bold', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'bg-clip-text', 'text-transparent')
  })

  test('buttons have hover effects', () => {
    renderWithRedux(<App />)
    const searchButton = screen.getByRole('button', { name: /buscar canciones/i })
    const libraryButton = screen.getByRole('button', { name: /mi biblioteca/i })
    
    // Check for hover classes (these are applied via CSS, but we can check they exist in className)
    expect(searchButton.className).toContain('transition-all')
    expect(libraryButton.className).toContain('transition-all')
  })
})
