import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setNewUser } from "../store/user";
import { validateEmail, validatePassword } from "../utils/validations"
import Navbar from './Navbar'

// MATERIAL UI
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: theme.spacing(4),
    textAlign: "left",
    borderColor: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  logIn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
}));


const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  //const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateEmail(email) === false){
      return setError("Credenciales invalidas")
    } 
    if(validatePassword(password) === false){
      return setError("Credenciales invalidas")
    } 
    
    dispatch(setNewUser({ firstName, lastName, email, password }));
    history.push("/login");
  };

  const changeFirstName = (e) => {
    const value = e.target.value;
    const last = value[value.lenght - 1];

    if (Number.isNaN(Number(last))) {
      setFirstName(value.toLowerCase());
    }
  };

  const changeLastName = (e) => {
    const value = e.target.value;
    const last = value[value.lenght - 1];

    if (Number.isNaN(Number(last))) {
      setLastName(value.toLowerCase());
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Grid className={classes.grid}>
        <form onSubmit={handleSubmit}>
        <TextField
            className={classes.button}
            id="standard-basic"
            label="Nombre"
            type="text"
            name="firstName"
            onChange={changeFirstName}
            value={firstName}
          />
        {/* <label>
          {" "}
          Nombre:
          <input
            type="text"
            name="firstName"
            onChange={changeFirstName}
            value={firstName}
          ></input>
        </label> */}
        <br />
        <TextField
            className={classes.button}
            id="standard-basic"
            label="Apellido"
            type="text"
            name="lastName"
            onChange={changeLastName}
            value={lastName}
          />
        {/* <label>
          {" "}
          Apellido:
          <input
            type="text"
            name="lastName"
            onChange={changeLastName}
            value={lastName}
          ></input>
        </label> */}
        <br />
        <TextField
            className={classes.button}
            id="standard-basic"
            label="Email"
            type="text"
            name="email"
            onChange={changeEmail}
            value={email}
          />
        {/* <label>
          {" "}
          Email:
          <input
            type="text"
            name="email"
            onChange={changeEmail}
            value={email}
          ></input>
        </label> */}
        <br />
        <TextField
            className={classes.button}
            id="standard-basic"
            label="Password"
            type="password"
            name="password"
            onChange={changePassword}
            value={password}
          />
        {/* <label>
          {" "}
          Password:
          <input
            type="password"
            name="password"
            onChange={changePassword}
            value={password}
          ></input>
        </label> */}
        <br />
        <div className={classes.logIn}>
        <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              >
          enviar
        </Button>
        </div>
        
        {error && <div>{error}</div>}
      </form>
      </Grid>
      
    </div>
  );
};

export default Register;