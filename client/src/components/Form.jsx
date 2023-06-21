import React, { useState, useEffect } from "react";
import { addUserAction } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const users = useSelector((store) => {
    return store.users;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.name === "phone") {
      if (!isNaN(e.target.value)) {
        setValue((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      } else {
        return;
      }
    }
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    addUserAction(value, dispatch);
    toast.success(`User ${value.name} added Successfully`);
    setValue({ name: "", email: "", phone: "" });
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };
  useEffect(() => {
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={value.name}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            required={true}
            value={value.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            required={true}
            minLength={10}
            maxLength={10}
            value={value.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Form;
