import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const ThemeContext = createContext({
  isTheme: 'light',
  toggleTheme: () => {},
})

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isTheme, setIsTheme] = useState('light')

  const toggleTheme = useCallback(() => {
    setIsTheme(isTheme === 'light' ? 'dark' : 'light')
  }, [isTheme])

  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ isTheme, toggleTheme }), [isTheme, toggleTheme])}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
