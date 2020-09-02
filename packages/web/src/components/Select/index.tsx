import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'
import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  FormErrorMessage,
  SelectProps
} from '@chakra-ui/core'

export interface OptionType {
  label: string
  value: string
}

interface Props extends SelectProps {
  name: string
  label?: string
  options: OptionType[]
}

const Select: React.FC<Props> = ({ name, label, options, ...rest }: Props) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <FormControl paddingTop="2rem">
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      <ChakraSelect
        name={fieldName}
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {options.map(op => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </ChakraSelect>
      {error && <FormErrorMessage>{error} </FormErrorMessage>}
    </FormControl>
  )
}

/**
 *
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
 */

export default Select
