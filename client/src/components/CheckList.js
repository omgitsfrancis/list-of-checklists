import React from "react";
import styled from "styled-components";
import { SuccessButton, DangerButton } from "./Buttons";
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
`;

const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > button {
    margin-right: 0.25rem;
  }
`;

const ListItem = styled.li`
  margin: 1rem;
  list-style: none;
  text-decoration: ${props => (props.checked ? "line-through" : "none")};
`;

export default function CheckList(props) {
  const {
    data,
    isListSelected,
    newItemInputOnChange,
    newItemButtonOnClick,
    newItemInputValue,
    newItemInputOnKeyDown,
    deleteItemOnClick,
    ...rest
  } = props;

  return (
    <Container>
      <ul {...rest}>
        {data.map(item => (
          <ListItemWrapper key={item.id}>
            <DangerButton id={item.id} onClick={deleteItemOnClick}>Delete</DangerButton>
            <ListItem>
              {item.contents}
            </ListItem>
          </ListItemWrapper>
        ))}
      </ul>
      {isListSelected && (
        <AddItemContainer>
          <AddListItemInput
            value={newItemInputValue}
            onKeyDown={newItemInputOnKeyDown}
            onChange={newItemInputOnChange}
            placeholder="Add Item"
          ></AddListItemInput>
          <SuccessButton onClick={newItemButtonOnClick}>Add</SuccessButton>
        </AddItemContainer>
      )}
    </Container>
  );
}
