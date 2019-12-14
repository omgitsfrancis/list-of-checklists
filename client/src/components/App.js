import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://localhost:44326";

function App() {
  const [lists, setLists] = useState([]);

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

  return (
    <div>
      <div>Learn React</div>
      {lists && (
        <div>
          {lists.map(list => (
            <div key={list.id}>{list.listName}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
