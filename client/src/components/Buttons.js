import styled from 'styled-components'

const Button = styled.button`
    border-radius: 2px;
    border: none;
    font-size: 1rem;
    height: 2rem;
`

export const PrimaryButton = styled(Button)`
    background-color: #007bff;
`

export const SuccessButton = styled(Button)`
    background-color: #28a745;
`

export const DangerButton = styled(Button)`
    background-color: #dc3545;
`
