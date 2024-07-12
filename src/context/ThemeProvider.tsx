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

  const memoValue = useMemo(
    () => ({ isTheme, toggleTheme }),
    [isTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={memoValue}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
