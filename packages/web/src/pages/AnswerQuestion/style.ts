import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 50vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Content = styled.div`
  width: 100%;
  padding: 100px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 100%;
    max-width: 500px;
  }
`
