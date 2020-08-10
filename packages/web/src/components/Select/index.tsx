import React, { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OptionType extends OptionTypeBase {}

export interface Props extends SelectProps<OptionType> {
  name: string
}

const Select: React.FC<Props> = ({ name, ...rest }: Props) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  )
}

export default Select
