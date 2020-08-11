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
  padding: 40px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px; 
  
  h1 {
    margin-bottom: 8px;
    font-family: Roboto, sans-serif;
    font-size: 14px;
  }
  h2 {
    margin-bottom: 10px;
    margin-top: 50px;
    font-family: Roboto, sans-serif;
  }
  form {
    margin: 10px 0;
    width: 800px;
    text-align: center;
    margin-left: 100px;
    h1 {
      margin-bottom: 24px;
      font-size: 24px;
      font-family: Roboto, sans-serif;
    }

    input {
      background: #fff;
      border-radius: 10px;
      border: 2px solid #80495e;
      padding: 16px;
      width: 100%;      
      margin-bottom: 8px;
      margin-top: 8px;
    }
    button {
      background: #80495e;
      border-radius: 10px;      
      padding: 16px;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      transition: background-color 0.2s;
      color: #fff;
      font-size: 24px;
  } 
  button:hover {
    background-color: #62102f;
  } 

  div {      
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-style: none;    
  }
`
