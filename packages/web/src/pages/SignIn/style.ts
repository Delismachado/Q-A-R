import styled from 'styled-components'

import { Form } from '@unform/web'

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
