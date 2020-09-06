import React, { useEffect, useRef } from 'react'
import {
  Input as ChakraInput,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex
} from '@chakra-ui/core'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

interface IInputProps extends InputProps<HTMLInputElement> {
  name: string
  label?: string
}

const LabeledInput: React.FC<IInputProps> = ({
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
    <FormControl paddingTop="1rem" isInvalid={!!error}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <ChakraInput
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

export default LabeledInput
