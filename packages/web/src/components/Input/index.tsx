import React, { InputHTMLAttributes, useEffect, useRef } from 'react'

import { useField } from '@unform/core'
import { Container } from './style'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<IInputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <input ref={inputRef} {...rest} />
    </Container>
  )
}

export default Input
