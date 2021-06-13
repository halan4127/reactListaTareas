import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, NavLink, Spinner  } from "reactstrap";
import "./SignUp.css";
import {signUp, signUpSuccess} from "../../store/actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const SignUp = ({register, signUpSuccess, signUp}) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (signUp && signUp.success) {
      history.push('/notes')
      setIsLoading(false)
      toast.success(signUp.message);
    }
    else {
      if(signUp && !signUp.success){
      toast.error(signUp.message);
      setIsLoading(false)
      setInputState({nombre_completo: "",
      email: "",
      password: "",
      edad: ""})
      }
    }
  }, [signUp])

  const [inputState, setInputState] = useState({
    nombre_completo: "",
    email: "",
    password: "",
    edad: ""
  });
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
    const {nombre_completo, email, password, edad} = {...inputState};
    if(nombre_completo && email &&  password && edad ){
      register(inputState);
      setIsLoading(true)
    }
    else {
      toast.error("Please provide the required information");
    }
  }
  console.log("isloading ", isLoading);
  return (
    isLoading? 
      <Spinner style={{ width: '3rem', height: '3rem', marginLeft: "47%", marginTop: "20%"}}  color="danger" />:
      <div>
    <Form className="signUpForm" onSubmit={submitHandler}>
      <div className="signUpParent">
        <div className="signUpText">REGISTRARSE</div>  {/* signUP REGISTRARSE */}
        <FormGroup>
          <Label for="email" className="signUpLabelText">
            Nombre Completo     {/* full number Nombre Completo */}
          </Label>
          <Input
            type="text"
            name="nombre_completo"
            id="number"
            placeholder="Nombre Completo"
            required
            value={inputState.nombre_completo}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="signUpLabelText">
            Correo    {/*Mail*/}
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            required
            value={inputState.email}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="signUpLabelText">
            Contraseña    {/*Password*/}
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            required
            value={inputState.password}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="signUpLabelText">
            Edad    {/*Age*/}
          </Label>
          <Input
            type="number"
            name="edad"
            id="age"
            placeholder="Edad"
            required
            value={inputState.edad}
            onChange={onChangeHandler}
          />
        </FormGroup>

        <Button className="signUpButtonText" outline color="primary" >Registrar</Button>
        <div className="signInButton">
             <span><NavLink href="/">Ya registrado inicie sesión?</NavLink> </span>  {/*Alrady Login sign in?*/}
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
  return {
    signUp: state.notesState.signUpState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(signUp(data)),
    signUpSuccess: (data) => dispatch(signUpSuccess(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
