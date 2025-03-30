import { Button, Flex } from '@chakra-ui/react'
import { CSSProperties } from 'react'

interface DFButtonProps {
  onClick?: () => void
  label: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
  id?: string
  loading?: boolean
}

export const DFButton = ({ onClick, label, disabled, style, className, loading }: DFButtonProps) => {
  const handleClick = () => {
    if (!onClick) return
    onClick()
  }

  return (
    <Button
      style={{ ...style }}
      isDisabled={(disabled || loading) ?? false}
      onClick={handleClick}
      colorScheme='teal'
      variant='solid'
      borderRadius='0'
      className={className}
    >
      <Flex alignItems='center' justifyContent='center'>
        {label}
      </Flex>
    </Button>
  )
}
