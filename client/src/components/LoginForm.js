import React, { useState } from "react";
import FormInput from "./FormInput";
import Form from "./Form";
import Button from "@mui/material/Button";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";
import "./LoginForm.css";

// let EMPTYFORM = {
//   username: "",
//   password: "",
//   email: "",
// };

export default function LoginForm(props) {
  async function handleSubmit(form) {
    console.log(form);
    const response = await ClientAPI.loginUser(form.username, form.password);
    Local.saveUserInfo(response.data.token, response.data.user);
  }

  async function handleRegistration(form) {
    console.log(form);
    const response = await ClientAPI.registerUser(
      form.username,
      form.email,
      form.password
    );
  }

  return (
    <div className="LoginForm">
      <div className="login-form">
        <h2>Login</h2>
        <Form
          formInitialValues={{ username: "", password: "" }}
          // submit={(form) => {
          //   console.warn(form);
          // }}
          submit={handleSubmit}
        >
          <FormInput label="Username" name="username" />
          <br />
          <FormInput label="Password" name="password" />
          <br />
          <br />
          <Button type="submit">Login</Button>
        </Form>
      </div>
      <div className="registration-form">
        <h2>Register</h2>
        <Form
          formInitialValues={{ username: "", password: "", email: "" }}
          // submit={(form) => {
          //   console.warn(form);
          // }}
          submit={handleRegistration}
        >
          <FormInput label="Username" name="username" />
          <br />
          <FormInput label="Password" name="password" />
          <br />
          <FormInput label="Email" name="email" />
          <br />
          <br />
          <Button type="submit">Register</Button>
          {props.registrationMessage && <p>Registration successful</p>}
        </Form>
      </div>
    </div>
  );
}
