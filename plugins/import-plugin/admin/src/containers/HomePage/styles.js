import styled, { css } from "styled-components"

export const InputGroupWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  > div {
    padding-right: 3rem;
  }
`

export const Wrapper = styled.div`
  > * {
    margin-bottom: 1rem;
  }
`

export const Button = styled.button`
  display: inline-flex;
  padding: 1rem;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 5px;
  background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
  color: #000000;
`

export const InputForm = styled.div`
  > label {
    margin: 0.4rem;
  }
`
export const NoBullentUl = styled.ul`
  list-style-type: none;
`
