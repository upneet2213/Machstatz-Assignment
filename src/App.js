import "./App.css";
import React, { useState, useEffect } from "react";
import { Display } from "./Pages/Display";
import { Form } from "./Pages/Form";
function App() {
  const [list, setList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      "http://3.6.93.159:7883/machstatz/get_all_users"
    );
    const data = await response.json();
    setList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const openForm = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      <div className="container">
        <button className="main-btn add" onClick={openForm}>
          <h4>Add User</h4>
        </button>
        <div className="display">
          {list.map((item) => {
            return (
              <Display item={item} key={item._id.$oid} fetchData={fetchData} />
            );
          })}
        </div>
        {isFormOpen ? (
          <Form closeForm={closeForm} list={list} fetchData={fetchData} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
