import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddItemInput = styled.input``;

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
      { isListSelected && <AddItemInput placeholder="Add Item"></AddItemInput>}
    </Container>
  );
}
