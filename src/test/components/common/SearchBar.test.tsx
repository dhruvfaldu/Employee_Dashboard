import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '@/components/common/SearchBar'

describe('SearchBar', () => {
  test('renders a text input', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => { }} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('displays the current searchTerm value', () => {
    render(<SearchBar searchTerm="John" onSearchChange={() => { }} />)
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('John')
  })

  test('shows the placeholder text', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => { }} />)
    expect(screen.getByPlaceholderText('Search employees...')).toBeInTheDocument()
  })

  test('calls onSearchChange when user types', () => {
    const mockFn = vi.fn()
    render(<SearchBar searchTerm="" onSearchChange={mockFn} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Dhruv' } })
    expect(mockFn).toHaveBeenCalledWith('Dhruv')
  })

  test('calls onSearchChange with empty string when input is cleared', () => {
    const mockFn = vi.fn()
    render(<SearchBar searchTerm="Dhruv" onSearchChange={mockFn} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } })
    expect(mockFn).toHaveBeenCalledWith('')
  })
})