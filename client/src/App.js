import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import axios from "axios";
import SideNav from "./components/SideNav";
import SideNavItem from "./components/SideNavItem";
import CheckList from "./components/CheckList";
import Input from "./components/Input";
import { SuccessButton, DangerButton } from "./components/Buttons";
import { ConfirmationModal } from "./components/Modal";

const URL = "https://localhost:44326";

const TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const ListContainer = styled.div`
  width: 70%;
  margin: 0 2rem;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.h2`
  margin-right: 1rem;
`;

const AddListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddNewListInput = styled(Input)`
  margin: 1rem;
`;

const initialState = { lists: [], currentList: null, currentListData: [],  newListInputValue: "", newItemInputValue: "", showModal: false};

function appReducer(state, action) {
  switch (action.type) {
    case "update_lists":
      return { ...state, lists: action.data };
    case 'set_current_list':
      return { ...state, currentList: action.data };
    case 'set_current_list_data':
      return { ...state, currentListData: action.data };
    case 'set_new_list_input_value': 
      return { ...state, newListInputValue: action.data };
    case 'set_new_item_input_value':
      return { ...state, newItemInputValue: action.data }
    case 'show_modal':
      return { ...state, showModal: true };
    case 'hide_modal':
      return { ...state, showModal: false };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    updateLists();
  }, []);

  async function updateLists() {
    await axios
      .get(URL + "/api/Lists")
      .then(function(response) {
        dispatch({ type: 'update_lists', data: response.data})
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const handleSideNavItemClick = list => {
    if (list.id !== state.currentList) {
      axios
        .get(URL + "/api/Lists/" + list.id)
        .then(function(response) {
          dispatch( {type: "set_current_list", data: list.id})
          dispatch({ type: "set_current_list_data", data: response.data })
          dispatch({ type: "set_new_item_input_value", data: "" })
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const handleAddNewListClick = () => {
    axios
      .post(URL + "/api/Lists", { ListName: state.newListInputValue })
      .then(function(response) {
        console.log("add list success!");
        updateLists();
        dispatch({ type: 'set_new_list_input_value', data: "" })
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleNewListInputOnChange = event => {
    dispatch({ type: 'set_new_list_input_value', data: event.target.value })
  };

  const handleNewListInputOnKeyDown = event => {
    if (event.key === "Enter" && state.newListInputValue.length > 0) {
      handleAddNewListClick();
    }
  };

  const handleConfirmDeleteList = () => {
    var listToDelete = state.currentList;

    dispatch({ type:"set_current_list", data: null })

    axios
      .delete(URL + "/api/Lists", { params: { id: listToDelete } })
      .then(function(response) {
        updateLists();
      })
      .catch(function(error) {
        console.log(error);
      });

    dispatch({ type: 'hide_modal' })
  };

  const handleNewItemInputOnChange = event => {
    dispatch({ type: "set_new_item_input_value", data: event.target.value })

  };

  const handleNewItemButtonOnClick = () => {
    if(state.newItemInputValue.length > 0) {
      axios
        .post(URL + "/api/ListItems/", {
          listId: state.currentList,
          contents: state.newItemInputValue
        })
        .then(function(response) {
          dispatch({ type: "set_new_item_input_value", data: "" })
          axios.get(URL + "/api/Lists/" + state.currentList).then(function(response) {
            dispatch({ type: "set_current_list_data", data: response.data });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const handleNewItemInputOnKeyDown = event => {
    if (event.key === "Enter" && state.newItemInputValue.length > 0) {
      handleNewItemButtonOnClick();
    }
  };

  return (
    <TitleLayout>
      <SideNav>
        {state.lists.map(list => (
          <SideNavItem
            text={list.listName}
            key={list.id}
            onClick={() => handleSideNavItemClick(list)}
            isSelected={list.id === state.currentList}
          />
        ))}
        <AddListContainer>
          <AddNewListInput
            maxLength={20}
            value={state.newListInputValue}
            onChange={handleNewListInputOnChange}
            onKeyDown={handleNewListInputOnKeyDown}
            placeholder="Add New List"
          ></AddNewListInput>
          {state.newListInputValue.length > 0 && (
            <SuccessButton onClick={() => handleAddNewListClick()}>
              Add
            </SuccessButton>
          )}
        </AddListContainer>
      </SideNav>
      <ListContainer>
        {state.currentList !== null ? (
          <>
            <ListHeader>
              <HeaderText>
                {
                  state.lists.find(list => list.id === state.currentList).listName
                }
              </HeaderText>
              <DangerButton onClick={() => dispatch({ type: 'show_modal' })}>
                Delete
              </DangerButton>
            </ListHeader>
            {state.currentListData && (
              <CheckList
                newItemInputValue={state.newItemInputValue}
                newItemInputOnKeyDown={handleNewItemInputOnKeyDown}
                newItemInputOnChange={handleNewItemInputOnChange}
                newItemButtonOnClick={handleNewItemButtonOnClick}
                data={state.currentListData}
                isListSelected={state.currentList ? true : false}
              ></CheckList>
            )}
          </>
        ) : (
          <h2>Please select a list</h2>
        )}
      </ListContainer>
      <ConfirmationModal
        showModal={state.showModal}
        title="Delete List"
        text="Are you sure?"
        onNoClick={() =>  dispatch({ type: 'hide_modal' })}
        onYesClick={handleConfirmDeleteList}
      />
    </TitleLayout>
  );
}

export default App;
