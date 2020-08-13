import styled from 'styled-components'
import { Form } from '@unform/web'

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
  padding: 100px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledForm = styled(Form)`
  width: 80%;
  padding-left: 5%;
  padding-right: 5%;
  input {
    background: #fff;
    border-radius: 10px;
    border: 2px solid #80495e;
    padding: 16px;
    width: 100%;
    margin-bottom: 10px;
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
`


/**
 * div {
    width: 100%;
    max-width: 500px;
  }
 */