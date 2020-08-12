import React from 'react'

import { ContainerStyle } from './styles'

export interface AuxProps {
  children: React.ReactNode
}

const Container: React.FC<AuxProps> = ({ children }: AuxProps) => {
  return <ContainerStyle>{children}</ContainerStyle>
}

export default Container
