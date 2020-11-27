import React, { useEffect, useRef, useState } from 'react'
import {
  Radio,
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps
} from '@chakra-ui/react'

import { useField } from '@unform/core'

export interface RadioGroupOptions {
  label: string
  value: string
}

interface IRadioProps extends Omit<RadioGroupProps, 'children'> {
  name: string
  options: RadioGroupOptions[]
}

const RadioGroup: React.FC<IRadioProps> = ({
  name,
  options,
  ...rest
}: IRadioProps) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue(ref) {
        console.log(ref)
        return ref.current
      }
    })
  }, [fieldName, registerField, inputRef])

  return (
    <ChakraRadioGroup name={fieldName} defaultValue={defaultValue} {...rest}>
      {options.map(op => (
        <Radio
          key={op.value}
          value={op.value}
          onChange={e => {
            console.log(e)
            inputRef.current = op.value
          }}
        >
          {op.label}
        </Radio>
      ))}
    </ChakraRadioGroup>
  )
}

export default RadioGroup
