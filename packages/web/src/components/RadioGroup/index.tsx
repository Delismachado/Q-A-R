import React, { useEffect, useRef, useState } from 'react'
import {
  Radio,
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps
} from '@chakra-ui/core'

import { useField } from '@unform/core'

export interface RadioGroupOptions {
  label: string
  value: string
}

interface IRadioProps extends RadioGroupProps {
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
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: function (field) {
        console.log(field)
        return selected
      }
    })
  }, [fieldName, registerField, selected])

  return (
    <ChakraRadioGroup {...rest}>
      {options.map(op => (
        <Radio
          key={op.value}
          value={op.value}
          name={fieldName}
          onInput={e => setSelected(op.value)}
        >
          {op.label}
        </Radio>
      ))}
    </ChakraRadioGroup>
  )
}

export default RadioGroup
