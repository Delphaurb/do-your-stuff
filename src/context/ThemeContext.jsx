import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  cozyBrown: {
    id: 'cozyBrown',
    name: 'Cozy Brown',
    colors: {
      background: '#f4ecd8',
      boardBackground: '#3e2723', // Deep Woody Brown
      surface: '#e6dcc3',
      primary: '#8d6e63',
      secondary: '#d7ccc8',
      text: '#4e342e',
      accent: '#ffb74d',
      noteChecklist: '#fff9c4',
      noteHabit: '#c8e6c9',
      noteLongTerm: '#bbdefb',
    },
  },
  softPink: {
    id: 'softPink',
    name: 'Soft Pink',
    colors: {
      background: '#fce4ec',
      boardBackground: '#880e4f', // Deep Pink/Maroon
      surface: '#f8bbd0',
      primary: '#ec407a',
      secondary: '#f48fb1',
      text: '#880e4f',
      accent: '#ff80ab',
      noteChecklist: '#ffcdd2',
      noteHabit: '#e1bee7',
      noteLongTerm: '#f06292',
    },
  },
  oceanBlue: {
    id: 'oceanBlue',
    name: 'Ocean Blue',
    colors: {
      background: '#e3f2fd',
      boardBackground: '#0d47a1', // Deep Blue
      surface: '#bbdefb',
      primary: '#1976d2',
      secondary: '#64b5f6',
      text: '#0d47a1',
      accent: '#448aff',
      noteChecklist: '#b3e5fc',
      noteHabit: '#b2dfdb',
      noteLongTerm: '#90caf9',
    },
  },
  darkMode: {
    id: 'darkMode',
    name: 'Dark Mode',
    colors: {
      background: '#121212',
      boardBackground: '#000000', // Pitch Black
      surface: '#1e1e1e',
      primary: '#bb86fc',
      secondary: '#3700b3',
      text: '#e0e0e0',
      accent: '#03dac6',
      noteChecklist: '#333333',
      noteHabit: '#2c3e50',
      noteLongTerm: '#424242',
    },
  },
  navyBlue: {
    id: 'navyBlue',
    name: 'Navy Blue',
    colors: {
      background: '#0a192f',
      boardBackground: '#020c1b', // Very Dark Navy
      surface: '#112240',
      primary: '#64ffda',
      secondary: '#233554',
      text: '#ccd6f6',
      accent: '#64ffda',
      noteChecklist: '#172a45',
      noteHabit: '#1e3a8a',
      noteLongTerm: '#1e40af',
    },
  },
  tokyoNight: {
    id: 'tokyoNight',
    name: 'Tokyo Night',
    colors: {
      background: '#1a1b26',
      boardBackground: '#16161e', // Dark Tokyo
      surface: '#24283b',
      primary: '#7aa2f7',
      secondary: '#414868',
      text: '#a9b1d6',
      accent: '#f7768e',
      noteChecklist: '#24283b',
      noteHabit: '#283e51',
      noteLongTerm: '#485e74',
    },
  },
  forestGreen: {
    id: 'forestGreen',
    name: 'Forest Green',
    colors: {
      background: '#e8f5e9',
      boardBackground: '#1b5e20', // Deep Forest Green
      surface: '#c8e6c9',
      primary: '#2e7d32',
      secondary: '#a5d6a7',
      text: '#1b5e20',
      accent: '#66bb6a',
      noteChecklist: '#dcedc8',
      noteHabit: '#a5d6a7',
      noteLongTerm: '#81c784',
    },
  },
  sunsetOrange: {
    id: 'sunsetOrange',
    name: 'Sunset Orange',
    colors: {
      background: '#fff3e0',
      boardBackground: '#bf360c', // Deep Burnt Orange
      surface: '#ffe0b2',
      primary: '#ef6c00',
      secondary: '#ffcc80',
      text: '#e65100',
      accent: '#ff9800',
      noteChecklist: '#ffcc80',
      noteHabit: '#ffab91',
      noteLongTerm: '#ffccbc',
    },
  },
  lavenderMist: {
    id: 'lavenderMist',
    name: 'Lavender Mist',
    colors: {
      background: '#f3e5f5',
      boardBackground: '#4a148c', // Deep Purple
      surface: '#e1bee7',
      primary: '#8e24aa',
      secondary: '#ce93d8',
      text: '#4a148c',
      accent: '#ab47bc',
      noteChecklist: '#e1bee7',
      noteHabit: '#d1c4e9',
      noteLongTerm: '#b39ddb',
    },
  },
  midnightPurple: {
    id: 'midnightPurple',
    name: 'Midnight Purple',
    colors: {
      background: '#311b92',
      boardBackground: '#12005e', // Very Dark Purple
      surface: '#4527a0',
      primary: '#b388ff',
      secondary: '#512da8',
      text: '#ede7f6',
      accent: '#7c4dff',
      noteChecklist: '#4527a0',
      noteHabit: '#512da8',
      noteLongTerm: '#5e35b1',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.cozyBrown);
  const [boardSkin, setBoardSkin] = useState('none');

  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themes[themeId]);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme, themes, boardSkin, setBoardSkin }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
