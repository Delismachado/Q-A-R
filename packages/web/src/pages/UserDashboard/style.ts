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
  padding: 20px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  align-items: center;
  h1 {
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 16px;
  }
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
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #c39999;
  }

  tr:hover {
    background-color: #fff;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #80495e;
    color: white;
  }
`
