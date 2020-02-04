import React from "react";
import styled from "styled-components";
import { SuccessButton } from "./Buttons";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AddListItemInput = styled(Input)`
  margin: 1rem;
`

export default function CheckList(props) {
  const {
    data,
    // data = [
    //     {
    //         id,
    //         listItem,
    //         isChecked,
    //         contents
    //     }
    // ],
    isListSelected,
    newItemInputOnChange,
    newItemButtonOnClick,
    newItemInputValue,
    newItemInputOnKeyDown,
    ...rest
  } = props;

  return (
    <Container>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.contents} is {item.isChecked ? "checked" : "not checked"}
          </li>
        ))}
      </ul>
      {isListSelected && (
        <AddItemContainer>
          <AddListItemInput value={newItemInputValue} onKeyDown={newItemInputOnKeyDown} onChange={newItemInputOnChange} placeholder="Add Item"></AddListItemInput>
          <SuccessButton onClick={newItemButtonOnClick}>Add</SuccessButton>
        </AddItemContainer>
      )}
    </Container>
  );
}
