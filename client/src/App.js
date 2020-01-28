import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SideNav from "./components/SideNav";
import SideNavItem from "./components/SideNavItem";
import CheckList from "./components/List";

const URL = "https://localhost:44326";

const TitleLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const AddNewListInput = styled.input`
  align-self: center;
  margin: 1rem 0;
`;

const ListContainer = styled.div`
  border: solid 2px red;
  width: 70%;
`;

function App() {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(
    lists.length > 0 ? lists[0] : null
  );
  const [currentListData, setCurrentListData] = useState([]);
  const [newListInputValue, setNewListInputValue] = useState("");

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

  return (
    <TitleLayout>
      <SideNav>
        {lists.map(list => (
          <SideNavItem
            text={list.listName}
            key={list.id}
            onClick={() => handleSideNavItemClick(list)}
          />
        ))}
        <SideNavItem>
          <AddNewListInput
            value={newListInputValue}
            onChange={handleNewListInputOnChange}
            placeholder="Add New List"
          ></AddNewListInput>
          {newListInputValue.length > 0 && (
            <button onClick={() => handleAddNewListClick()}>+</button>
          )}
        </SideNavItem>
        {newListInputValue}
      </SideNav>
      <ListContainer>
        <h2>
          {currentList !== null
            ? lists.find(list => list.id === currentList).listName
            : ""}
        </h2>
        {currentListData && (
          <CheckList
            data={currentListData}
            isListSelected={currentList ? true : false}
          ></CheckList>
        )}
      </ListContainer>
    </TitleLayout>
  );
}

export default App;
