import React, { useState, useEffect } from "react";
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
`

const AddListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddNewListInput = styled(Input)`
  margin: 1rem;
`;

function App() {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(
    lists.length > 0 ? lists[0].id : null
  );
  const [currentListData, setCurrentListData] = useState([]);
  const [newListInputValue, setNewListInputValue] = useState("");
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    axios
      .get(URL + "/api/Lists")
      .then(function(response) {
        // handle success
        // console.log(response.data);
        setLists(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  const handleSideNavItemClick = list => {
    axios
      .get(URL + "/api/Lists/" + list.id)
      .then(function(response) {
        setCurrentList(list.id);
        setCurrentListData(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const handleAddNewListClick = () => {
    axios
      .post(URL + "/api/Lists", { ListName: newListInputValue })
      .then(function(response) {
        // handle success
        console.log("add list success!");
        setLists([...lists, response.data]);
        setNewListInputValue("");
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const handleNewListInputOnChange = event => {
    setNewListInputValue(event.target.value);
  };

  const handleNewListInputOnKeyDown = event => {
    if (event.key === "Enter" && newListInputValue.length > 0) {
      handleAddNewListClick();
    }
  };

  const handleConfirmDeleteList = () => {
    var listToDelete = currentList
    var deleteIndex = lists.map(function(list){ return list.id}).indexOf(listToDelete)  
    setLists(lists.filter(list => list !== lists[deleteIndex]))
    setCurrentList(null)

    axios
      .delete(URL + "/api/Lists", {params: {id: listToDelete}})
      .then(function(response) {
      })
      .catch(function(error) {
        console.log(error);
      });
      
    setShowModal(false);
  }

  return (
    <TitleLayout>
      <SideNav>
        {lists.map(list => (
          <SideNavItem
            text={list.listName}
            key={list.id}
            onClick={() => handleSideNavItemClick(list)}
            isSelected={list.id === currentList}
          />
        ))}
        <AddListContainer>
          <AddNewListInput
            maxLength={20}
            value={newListInputValue}
            onChange={handleNewListInputOnChange}
            onKeyDown={handleNewListInputOnKeyDown}
            placeholder="Add New List"
          ></AddNewListInput>
          {newListInputValue.length > 0 && (
            <SuccessButton onClick={() => handleAddNewListClick()}>
              Add
            </SuccessButton>
          )}
        </AddListContainer>
      </SideNav>
      <ListContainer>
        {currentList !== null ? (
          <>
            <ListHeader>
        <HeaderText>{/*lists.find(list => list.id === currentList).listName */ currentList}</HeaderText>
              <DangerButton onClick={() => setShowModal(true)}>Delete</DangerButton>
            </ListHeader>
            {currentListData && (
              <CheckList
                data={currentListData}
                isListSelected={currentList ? true : false}
              ></CheckList>
            )}
          </>
        ) : (
          <h2>Please select a list</h2>
        )}
      </ListContainer>
      <ConfirmationModal showModal={showModal} title="Delete List" text="Are you sure?" onNoClick={() => setShowModal(false)} onYesClick = {handleConfirmDeleteList} />
    </TitleLayout>
  );
}

export default App;
