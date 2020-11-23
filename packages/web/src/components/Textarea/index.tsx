import React, { useEffect, useRef } from 'react'
import {
  Textarea as ChakraTextarea,
  TextareaProps,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

interface IInputProps extends TextareaProps {
  name: string
  label?: string
}

const Textarea: React.FC<IInputProps> = ({
  name,
  label,
  ...rest
}: IInputProps) => {
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
    <FormControl paddingTop="2rem" isInvalid={!!error}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <ChakraTextarea
        name={fieldName}
        id={fieldName}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default Textarea
