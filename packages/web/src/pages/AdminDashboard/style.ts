import styled from 'styled-components'

import { Form } from '@unform/web'

// export const Container = styled.div`
//   width: 100%;
//   max-width: 1550px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 16px;
//   border: 1px solid;
//   background: #e3e2e2;
//   border-radius: 16px;
//   h1 {
//     margin-bottom: 8px;
//     font-family: Roboto, sans-serif;
//     font-size: 14px;
//   }
// `

// export const Content = styled.div`
//   width: 80%;
//   background: #c4c4c4;
//   box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
//   border-radius: 16px;
//   border: 1px solid;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 40px;
//   padding-bottom: 40px;
//   margin: 40px;

//   h2 {
//     margin-bottom: 10px;
//     font-family: Roboto, sans-serif;
//     text-align: center;
//   }
// `

export const StyledForm = styled(Form)`
  width: 100%;
  padding-left: 50%;
  padding-right: 50%;
  border: 12px;

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
    background-color: gray;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #80495e;
    color: white;
  }
`
