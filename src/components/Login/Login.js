import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, NavLink, Spinner } from "reactstrap";
import "./Login.css";
import {login} from "../../store/actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Login = ({signInUser,signIn}) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [inputState, setInputState] = React.useState({
    email: "",
    password: ""
  });
  
  useEffect(() => {
    if (localStorage.token) history.push('/notes')
  }, [localStorage.token]);

  useEffect(() => {
    console.log("SignIn => ", signIn)
    if (signIn && signIn.success) {
      history.push('/notes')
      setIsLoading(false)
      toast.success(signIn.message);
    }
    else{
      if(signIn && !signIn.success){
        console.log("Ali")
        toast.error(signIn.message);
        setIsLoading(false)
        setInputState({email: "",
        password: ""})
        }
    }
  }, [signIn])
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const inputValue = inputState;
    setInputState({
      ...inputValue,
      [name]: value,
    });
  };

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log('inputState ', inputState);
    const { email, password } = {...inputState};
    if(email &&  password ){
      signInUser(inputState);
      setIsLoading(true)
    }
    else {
      toast.error("Please provide the required information");
    }
  }
  return (
    isLoading? 
      <Spinner style={{ width: '3rem', height: '3rem', marginLeft: "47%", marginTop: "20%"}}  color="danger" />:
      <div>
    <Form className="loginForm" onSubmit={submitHandler}>
      <div className="loginParent">
        <div className="loginText">Login</div>
        <FormGroup>
          <Label for="email" className="loginlabelText">
            Correo{/* Email */}
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={inputState.email}
            placeholder="Correo"
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="loginlabelText">
            Contraseña  {/*Password */}
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={inputState.password}
            onChange={onChangeHandler}

          />
        </FormGroup>

        <Button className="loginButtonText" outline color="primary">Ingresar</Button>   {/**Login */}
        <div className="registerButton">
        <NavLink href="/sign-up">No estas registrado? Registrate</NavLink>   {/**not register? register */}
        </div>
      </div>
    </Form>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      />
      {/* Same as */}
    <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('State => ', state);
  return {
    signIn: state.notesState.loginState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (data) => dispatch(login(data)),
    // loginSuccess: (data) => dispatch(signUpSuccess(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
