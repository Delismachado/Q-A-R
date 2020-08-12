import styled from 'styled-components'

export const Header = styled.header`
  width: 100%;
  height: 20vh;
  padding: 3em;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #80495e;
  a {
    font-family: Roboto;
    font-weight: 100;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid;
    padding: 10px;
  }
  img {
    height: 5em;
  }
  @media (min-width: 700px) {
  }
`

export const Container = styled.div`
  width: 90%;
  max-width: 1990px;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  align-content: stretch;
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.8rem;
    line-height: 38px;
  }
`

/**
 * 
 * 

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
 */
