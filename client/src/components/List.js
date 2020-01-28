import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.span`
    font-size: 18px;
`
const AddItemInput = styled.input`

`

export default function CheckList(props) {

    const {
        title,
        data,
        // data = [
        //     {
        //         id,
        //         listItem,
        //         isChecked
        //     }
        // ]
        ...rest
    } = props

    return (
        <Container>
            <Title>{title}</Title>
            {data.map(item => (
            <div key={item.id}>{item.listItem} is {item.isChecked ? "checked" : "not checked"}</div>
            ))}
            <AddItemInput placeholder="Add Item"></AddItemInput>
        </Container>
    )
}