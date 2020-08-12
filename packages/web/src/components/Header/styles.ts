import styled from 'styled-components'

export const HeaderStyle = styled.div`
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