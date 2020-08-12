import styled from 'styled-components'

import { Form } from '@unform/web'

export const Container = styled.div`
  width: 100%;
  max-width: 1550px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  border: 1px solid;
  background: #e3e2e2;
  border-radius: 16px;
`

export const Content = styled.div`
  width: 80%;
  background: #c4c4c4;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin: 40px;
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
