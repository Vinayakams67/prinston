import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  console.log(logdata);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    const res = await fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      toast.warn("invalid details", {
        position: "top-center",
      });
    } else {
      // console.log("data valid");
      toast.success("logged in successfully", {
        position: "top-center",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "light",
      });
      setData({ ...logdata, email: "", password: "" });
    }
  };

  return (
    <div>
      <>
        <section>
          <div className="sign_container">
            <div className="sign_header">
              <img src="./Pestkart.png" alt="amazon logo" />
            </div>
            <div className="sign_form">
              <form method="POST">
                <h1>Sign-In</h1>
                <div className="form_data">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    onChange={adddata}
                    value={logdata.email}
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form_data">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    onChange={adddata}
                    value={logdata.password}
                    name="password"
                    placeholder="Atleast 6 character"
                    id="password"
                  />
                </div>
                <button className="signin_btn" onClick={senddata}>
                  Continue
                </button>
              </form>
            </div>
            <div className="create_accountinfo">
              <p>New To Amazon</p>
              <NavLink to="/register">
                <button>Create your amazon account</button>
              </NavLink>
            </div>
          </div>
          <ToastContainer />
        </section>
      </>
    </div>
  );
};

export default Sign_in;
