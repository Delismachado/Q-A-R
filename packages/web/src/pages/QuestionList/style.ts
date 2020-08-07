import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
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

    section {
      width: 100%;
      max-width: 380px;

      a {
        padding: 16px;
      }

      h1 {
        margin: 64px 0 32px;
        font-size: 26px;
      }

      p {
        font-size: 18px;
        color: #737380;
        line-height: 32px;
        margin: 16px;
      }
    }

    form {
      width: 100%;
      max-width: 450px;

      input,
      textarea {
        margin-top: 8px;
        width: 500px;
      }
      button {
        padding: 8px;
        margin-top: 8px;
        width: 500px;
        background: #a1aabc;
      }
    }
    h1 {
      margin: 64px 0 32px;
      font-size: 26px;
    }
    ul {
      margin: 64px 0 32px;
      font-size: 26px;
    }
  }
`
