import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Content = styled.div`
  width: 100%;
  padding: 20px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  align-items: center;
  h1 {
    margin-bottom: 16px;
  }
  h2 {
    margin-bottom: 16px;
  }
  form {
    margin: 10px 0;
    width: 500px;
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
      margin-bottom: 8px;
      margin-top: 8px;
    }
    button {
      background: #a1aabc;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
  }  
`
