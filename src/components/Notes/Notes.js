import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Spinner
} from "reactstrap";
import "./Notes.css";
import { connect } from "react-redux";
import { addNotes  ,fetchNotes, updateNotes, deleteNotes} from "../../store/actions/actions";
import {withRouter} from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


const Notes = ({ addNotes, addResponse, allNotes, fetchNotes, updateNotesResponse, updateNotes, deleteNotes, delteNotesResponse }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [notesId , setNotesId] = useState("")
  const [addDisable, setAddDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);
  const [deleteDisable, setDeleteDisable] = useState(true);
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    emotion: "",
  });

  useEffect(() => {
    if (!localStorage.token) history.push('/sign-in')
  }, []);

  useEffect(()=>{
    fetchNotes()
    setIsLoading(true)
  }, [])

  useEffect(() => {
    console.log("notes", delteNotesResponse);
    if (delteNotesResponse.success) {
      setIsLoading(false)
      toast.success(delteNotesResponse.message);
      setInputState({title: "",
      description: "",
      emotion: "",})
      fetchNotes()  
      setUpdateDisable(true);
      setDeleteDisable(true);
      setAddDisable(false);
    }
    else if (!delteNotesResponse.success) {
      toast.error(delteNotesResponse.message);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
    }
  }, [delteNotesResponse]);

  useEffect(() => {
    console.log("notes", updateNotesResponse);
    if (updateNotesResponse && updateNotesResponse.success) {
      setIsLoading(false)
      toast.success(updateNotesResponse.message);
      setInputState({title: "",
      description: "",
      emotion: "",})
      setUpdateDisable(true);
      setDeleteDisable(true);
      setAddDisable(false);
      fetchNotes()   

    }
    else {
      if(updateNotesResponse && !updateNotesResponse.success) {
      toast.error(updateNotesResponse.message);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
      }
    }
  }, [updateNotesResponse]);

  useEffect(() => {
    console.log("notes", addResponse);
    if (addResponse && addResponse.success) {
      setIsLoading(false)
      toast.success(addResponse.message);
      setInputState({title: "",
      description: "",
      emotion: "",})
      fetchNotes()   
    }
    else {
      if(addResponse && !addResponse.success){
      toast.error(addResponse);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
      }
    }
  }, [addResponse]);


  useEffect(() => {
    console.log("notes", allNotes);
    if (allNotes && allNotes.success && allNotes.data.length > 0) {
      setIsLoading(false)
      toast.success("Todo Found succesfully");
    }
    else if (allNotes && !allNotes.success) {
      toast.error(allNotes.message);
      setIsLoading(false)
    }
  }, [allNotes]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const inputValue = inputState;
    setInputState({
      ...inputValue,
      [name]: value,
    });
  };

  const addNotesHandler = () => {
    const {title, description, emotion} = {...inputState};
    if(title && description && emotion){
    addNotes(inputState);
    setIsLoading(true)
    }
    else{
      toast.error("Please provide the required information");
    }
  };

  const updateNotesHandler = () => {
    const {title, description, emotion} = {...inputState};
    if(title && description && emotion){
    updateNotes({
      id_tareas: notesId,
      titulo : title, 
      descripcion: description, 
      emocion: emotion
    });
    setIsLoading(true)
    }
    else{
      toast.error("Please provide the required information");
    }
  };

  const listClickHandler = (list) =>{
    console.log("LIST => ", list);
    const {id_tareas, titulo, descripcion, emocion} = {...list}
    setNotesId(id_tareas)
    setInputState({
      title: titulo,
    description: descripcion,
    emotion: emocion
    });
    setUpdateDisable(false);
    setDeleteDisable(false);
    setAddDisable(true);
  }

  const delteNotesHandler = () =>{
    deleteNotes({
      id_tareas: notesId
    });
    setIsLoading(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }
  return (
    isLoading? 
      <Spinner style={{ width: '3rem', height: '3rem', marginLeft: "47%", marginTop: "20%"}}  color="danger" />:
    <div className="gourpedData">
      <div className="loginText">Mis Notas</div> {/* my notes */}
      <div className="notesContainer">
        <div className="form">
          <div className="parent">
            <FormGroup>
              <Label for="title" className="labelText">
                Titulo {/* Title */}
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Titulo"
                value={inputState.title}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" className="labelText">
                Descripcion {/*Description*/}
              </Label>
              <Input
                type="text"
                name="description"
                id="description"
                required
                placeholder="Descripcion"
                value={inputState.description}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emotion" className="labelText">
                Emocion {/*Emotion*/}
              </Label>
              <Input
                type="text"
                name="emotion"
                id="emotion"
                placeholder="Emocion"
                required
                value={inputState.emotion}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <Button
              className="buttonText"
              outline
              disabled={addDisable}
              color="primary"
              onClick={addNotesHandler}
            >
              Insertar
            </Button>{" "}
            {/*Insert */}
            <Button className="buttonText"
             disabled={updateDisable}
              outline color="primary"
              onClick={updateNotesHandler}>
              Actualizar
            </Button>
            {/**To update */}
            <Button className="buttonText"
             disabled={deleteDisable} 
             outline color="primary"
              onClick={delteNotesHandler}>
              Eliminar
            </Button>{" "}
            {/**Remove */}
          </div>
        </div>
        <div className="grouplistButton">
          <ListGroup className={`${allNotes && allNotes.message!=="NETWORK ERROR" && allNotes.data.length> 0 ? "groupList": ""}`}>
            {allNotes && allNotes.data && allNotes.data.length >0 &&
              allNotes.data.map((item, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    onClick={() => listClickHandler(item)}
                  >
                    {item.titulo}
                  </ListGroupItem>
                );
              })}
          </ListGroup>
          <Button className="buttonText" outline color="primary" onClick={handleLogout}>
            Salir
          </Button>{" "}
        </div>
      </div>
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
  console.log("state => ", state)
  return {
    addResponse: state.notesState.addNotes,
    allNotes: state.notesState.notes,
    updateNotesResponse: state.notesState.updateNotes,
    delteNotesResponse: state.notesState.deleteNotes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNotes: (data) => dispatch(addNotes(data)),
    fetchNotes: () => dispatch(fetchNotes()),
    updateNotes: (data) => dispatch(updateNotes(data)),
    deleteNotes: (data) => dispatch(deleteNotes(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));