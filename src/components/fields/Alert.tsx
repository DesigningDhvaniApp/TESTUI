import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export const DAlert = ({ type, message }: AlertProps) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  )
}
