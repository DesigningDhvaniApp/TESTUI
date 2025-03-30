import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Loader.scss'
import { ChakraProvider, useToast } from '@chakra-ui/react'
import { theme } from './theme'
import toastManager from '../../components/Toast'
import StoryBoard from '../story'

export const App = () => {
  toastManager.setToast(useToast())

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<StoryBoard />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}
