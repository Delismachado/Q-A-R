import React, { useEffect, useRef } from 'react'
import { Input as ChakraInput, InputProps } from '@chakra-ui/core'

import { useField } from '@unform/core'

interface IInputProps extends InputProps<HTMLInputElement> {
  name: string
  label?: string
}

const Input: React.FC<IInputProps> = ({ name, ...rest }: IInputProps) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <ChakraInput
      name={fieldName}
      id={fieldName}
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    />
  )
}

export default Input
