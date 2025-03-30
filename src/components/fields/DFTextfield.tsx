import { ChangeEvent, CSSProperties, FocusEvent } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

interface DFTextfieldProps {
  valueKey?: string
  name?: string
  required?: boolean
  label?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>, valueKey?: string) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>, valueKey?: string) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>, valueKey?: string) => void
  className?: string
  disabled?: boolean
  style?: CSSProperties
  type?: string
  helperText?: string
}

export const DFTextfield = ({
  valueKey,
  name,
  required,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  style,
  type,
  helperText,
}: DFTextfieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, valueKey)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event, valueKey)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event, valueKey)
    } else {
      event.target.select()
    }
  }

  return (
    <FormControl id={name} isDisabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required ?? false}
        disabled={disabled ?? false}
        style={{ ...style }}
        type={type ?? 'text'}
      />
      {helperText && <span className='text-xs text-red-600 p-1 rounded-md'>{helperText}</span>}
    </FormControl>
  )
}
