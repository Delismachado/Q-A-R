import styled from 'styled-components'

export const Container = styled.div`
  background: #80495e;
  header {
    width: 100%;
    padding: 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #80495e;
    font-family: Roboto, sans-serif;
    
      h1 {
        margin-right: 16px;
        display: flex;
        color: #fff;
        font-weight: 700;
        font-style: none;
        height: 20px;
      }
    }

    p {
      font-size: 16px;
      color: #fff;
      margin-left: 950px;
      margin-top: 10px;
    }

    button {
    background: #fff;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 5%;
    font-weight: 500;
    text-decoration-color: #fff;
    margin-top: 16px;
    transition: background-color 0.2s;
  }
  button:hover {
    background-color: #62102f;
  }
    
  }
`
