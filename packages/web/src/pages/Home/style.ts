import styled from 'styled-components'

export const Header = styled.header`
  width: 100%;
  padding: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #80495e;
  text-decoration: none;
  a {
    display: flex;
    color: #fff;
    font-weight: 700;
    font-style: none;
  }
  h1 {
    margin-right: 16px;
    display: flex;
    color: #fff;
    font-weight: 700;
    font-style: none;
    height: 20px;
  }
`

export const Container = styled.div`
  width: 90%;
  max-width: 1990px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  max-width: 860px;
  flex: 1;
  margin-top: 190px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 54px;
    text-decoration: none;
  }
  p {
    font-size: 24px;
    line-height: 38px;
    margin-top: 24px;
    text-decoration: none;
  }
  a {
    background: #80495e;
    height: 56px;
    border-radius: 10px;
    padding: 0 16px;
    color: #fff;
    width: 50%;
    font-weight: 500;
    text-decoration: none;
    margin-top: 100px;
    transition: background-color 0.2s;
    text-align: center;
    text-justify: center;
  }
  a:hover {
    background-color: #62102f;
  }
`
