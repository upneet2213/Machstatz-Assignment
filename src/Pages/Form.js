import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export const Form = ({ list, closeForm, fetchData }) => {
  const [newUser, setNewUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    let flag = 0;
    const myUser = {
      email,
      fist_name: firstName,
      last_name: lastName,
      pwd: password,
      username: userName,
    };
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setEmail("");
    setPassword("");
    list.map((item) => {
      if (item.username === myUser.username || item.email === myUser.email) {
        flag = 1;
      }
    });
    if (!email || !firstName || !lastName || !password || !userName) {
      flag = 2;
    }
    if (flag === 0) {
      setNewUser(myUser);
      document.getElementsByClassName("add").disabled = true;
      fetch("http://3.6.93.159:7883/machstatz/add_new_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myUser),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Created the new user successfully.");
          closeForm();
          fetchData();
        }
      });
      document.getElementsByClassName("add").disabled = false;
    } else if (flag === 1) {
      alert("User with provided email or username already exists");
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="form-overlay">
      <div className="form">
        <div className="form-header">
          <h4>Add User</h4>
          <button className="close-form" onClick={closeForm}>
            <FaWindowClose size="20px" />
          </button>
        </div>
        <div className="border"></div>
        <form action="" className="add-user">
          <div className="form-input">
            <label htmlFor="">
              <h4>First Name</h4>
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="">
              <h4>Last Name</h4>
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="">
              <h4>Profiles</h4>
            </label>
            <select name="profile" id="profile">
              <option value="value" selected disabled hidden>
                Please Select
              </option>
              <option value="frontend">FrontEnd</option>
              <option value="backend">BackEnd</option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="">
              <h4>Username</h4>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="">
              <h4>Email Address</h4>
            </label>
            <input
              type=""
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="">
              <h4>Password</h4>
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="border"></div>
        <div className="form-btns">
          <button className="form-btn cancel" onClick={closeForm}>
            Cancel
          </button>
          <button className="form-btn add" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
