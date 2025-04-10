import {Colors} from './constants/Colors.ts'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
   [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",

  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'WorkSans-Black': ['WorkSans-Black', 'sans-serif'],
        'WorkSans-Bold': ['WorkSans-Bold', 'sans-serif'],
        'WorkSans-ExtraBold': ['WorkSans-ExtraBold', 'sans-serif'],
        'WorkSans-ExtraLight': ['WorkSans-ExtraLight', 'sans-serif'],
        'WorkSans-Light': ['WorkSans-Light', 'sans-serif'],
        'WorkSans-Medium': ['WorkSans-Medium', 'sans-serif'],
        'WorkSans-Regular': ['WorkSans-Regular', 'sans-serif'],
        'WorkSans-SemiBold': ['WorkSans-SemiBold', 'sans-serif'],
        'WorkSans-Thin': ['WorkSans-Thin', 'sans-serif'], 


        'WorkSans-Variable': ['WorkSans-Variable', 'sans-serif'],
        'WorkSans-Variable-Italic': ['WorkSans-Variable-Italic', 'sans-serif'],
        'WorkSans-Italic': ['WorkSans-Italic', 'sans-serif'],
        'WorkSans-Black-Italic': ['WorkSans-Black-Italic', 'sans-serif'],
        'WorkSans-Bold-Italic': ['WorkSans-Bold-Italic', 'sans-serif'],
        'WorkSans-ExtraBold-Italic': ['WorkSans-ExtraBold-Italic', 'sans-serif'],
        'WorkSans-ExtraLight-Italic': ['WorkSans-ExtraLight-Italic', 'sans-serif'],
        'WorkSans-Light-Italic': ['WorkSans-Light-Italic', 'sans-serif'],
        'WorkSans-Medium-Italic': ['WorkSans-Medium-Italic', 'sans-serif'],
        'WorkSans-Regular-Italic': ['WorkSans-Regular-Italic', 'sans-serif'],
        'WorkSans-SemiBold-Italic': ['WorkSans-SemiBold-Italic', 'sans-serif'],
        'WorkSans-Thin-Italic': ['WorkSans-Thin-Italic', 'sans-serif'],
        'WorkSans-ThinItalic': ['WorkSans-ThinItalic', 'sans-serif'],
        'WorkSans-LightItalic': ['WorkSans-LightItalic', 'sans-serif'],
        
      },

      colors: {
        light: {
          primary: Colors.light.primary,
          secondary: Colors.light.secondary,
          tertiary: Colors.light.tertiary,
          background: Colors.light.background,
          text: Colors.light.text,
        },
        dark: {
          primary: Colors.dark.primary,
          secondary: Colors.dark.secondary,
          tertiary: Colors.dark.tertiary,
          background: Colors.dark.background,
          text: Colors.dark.text,
        },
      },
    },
  },
  plugins: [],
}

