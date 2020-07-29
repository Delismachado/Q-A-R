import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 24px;
    }

    input {
      background: #fff;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;

      & + input {
        margin-top: 8px;
      }
    }
    button {
      background: #fff;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      margin-top: 10px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`