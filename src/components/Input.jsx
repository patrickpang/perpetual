import styled from 'react-emotion'

const Input = styled('input')`
  outline: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background: none;
  color: inherit;

  &::placeholder {
    color: inherit;
  }
`

export default Input
