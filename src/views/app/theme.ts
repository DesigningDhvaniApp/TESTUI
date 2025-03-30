import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  // fonts: {
  //   body: "'Poppins', sans-serif",
  //   heading: "'Poppins', sans-serif",
  // },
  fonts: {
    // body: "'Open Sans', serif",
    // heading: "'Open Sans', serif",
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  fontWeights: {
    body: 700, // Normal weight for body text
    heading: 700, // Bold weight for headings
  },
  colors: {
    brand: {
      blue: '#4164e3',
      cadet: '#8998a8',
      dark: '#243156',
      gray: '#a0acb9',
      green: '#36c537',
      light: '#e9ebee',
      pure: '#fafafb',
      slate: '#77889a',
      white: '#fcfdfe',
      yellow: '#ed9b13',
      teal: '#38B2AC', // Adding teal color in your brand palette
      tealHover: '#319795', // Dimmed teal color for hover
      tealDisabled: '#2C7A7B', // Dimmed teal color for disabled state
    },
  },
  components: {
    // Button: {
    //   variants: {
    //     solid: {
    //       color: 'white',
    //       bg: 'teal',
    //       _hover: { bg: 'brand.tealHover' }, // Dim the teal color on hover
    //       _active: { bg: 'teal' },
    //       _focus: { boxShadow: 'none' },
    //       _disabled: {
    //         bg: 'brand.tealDisabled', // Dim the teal color when disabled
    //         cursor: 'not-allowed',
    //         _hover: { bg: 'brand.tealDisabled' }
    //       },
    //       borderRadius: '0',
    //     },
    //     // outline: {
    //     //   bg: 'transparent',
    //     //   borderWidth: '1px',
    //     //   color: 'brand.cadet',
    //     //   borderColor: 'brand.light',
    //     //   _hover: { bg: 'brand.white' },
    //     //   _active: { bg: 'brand.light' },
    //     //   _focus: { boxShadow: 'none' },
    //     //   _disabled: {
    //     //     bg: 'brand.tealDisabled', // Dim the teal color when disabled
    //     //     color: 'brand.light',
    //     //     cursor: 'not-allowed',
    //     //     _hover: { bg: 'brand.tealDisabled' }
    //     //   },
    //     // },
    //   },
    // },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
})
