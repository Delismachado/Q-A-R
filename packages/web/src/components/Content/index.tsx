import React from 'react'

import { ContentStyle } from './styles'

export interface AuxProps {
  children: React.ReactNode
}

const Content: React.FC<AuxProps> = ({ children }: AuxProps) => {
  return <ContentStyle>{children}</ContentStyle>
}

export default Content
