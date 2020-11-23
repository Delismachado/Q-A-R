import React, { useEffect, useRef, useState } from 'react'
import {
  Checkbox,
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxGroupProps
} from '@chakra-ui/react'

import { useField } from '@unform/core'

export interface CheckboxGroupOptions {
  label: string
  value: string
}

interface ICheckboxProps extends CheckboxGroupProps {
  name: string
  options: CheckboxGroupOptions[]
}

const CheckboxGroup: React.FC<ICheckboxProps> = ({
  name,
  options,
  ...rest
}: ICheckboxProps) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const [selectedState, setSelectedState] = useState([])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        return selectedState
      }
    })
  }, [fieldName, registerField, selectedState])

  return (
    <ChakraCheckboxGroup {...rest} onChange={setSelectedState}>
      {options.map(op => (
        <Checkbox key={op.value} value={op.value} name={fieldName}>
          {op.label}
        </Checkbox>
      ))}
    </ChakraCheckboxGroup>
  )
}

export default CheckboxGroup
