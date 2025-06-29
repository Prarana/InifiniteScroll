import React, { createContext, useState, useContext } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Create a custom hook to use the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

// The ThemeProvider component that provides the theme context
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(!dark);

  const theme = {
    dark,
    colors: {
      background: dark ? '#333' : '#fff',
      text: dark ? '#fff' : '#000',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
