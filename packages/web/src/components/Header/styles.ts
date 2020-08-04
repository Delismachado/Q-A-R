import styled from 'styled-components'

interface ContainerProps {
  size?: 'small' | 'large'
}

export const Container = styled.div<ContainerProps>`
  background: #6177a4;
  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    nav {
      margin: 0 auto;
      h1 {
        padding: 50px;
        color: #fff;
        text-decoration: none;
        font-size: 35px;
        font-style: bold;
        transition: opacity 0.2s;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`
