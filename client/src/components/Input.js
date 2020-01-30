import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 2px;
    font-size: 1rem;
    border: solid 1px #616161;
`

export default function Input(props){

    return(
        <StyledInput {...props} />
    )
}