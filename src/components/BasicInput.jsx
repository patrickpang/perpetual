import styled from 'react-emotion'

const BasicInput = styled('input')`
  outline: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background: none;
  color: inherit;
  font-weight: inherit;
  padding: 0;
  margin: 0;

  &::placeholder {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`

export default BasicInput
