
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setLoggedUser } from "../store/user";
import { validateEmail, validatePassword } from "../utils/validations";
import Navbar from './Navbar'

// MATERIAL UI
import Button from "@material-ui/core/Button";
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

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) === false) {
      return setError("Email invalido");
    }
    if (validatePassword(password) === false) {
      return setError("Password invalido");
    }
    dispatch(setLoggedUser({ email, password })); // aca lo mando a user donde guardo la informacion del login
    history.push("/");
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
            label="Email"
            type="text"
            name="email"
            onChange={changeEmail}
            value={email}
          />
          <br />
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
          <TextField
            className={classes.button}
            id="standard-basic"
            label="Password"
            type="password"
            name="password"
            onChange={changePassword}
            value={password}
          />
          <br />
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
          <div className={classes.logIn}>
            <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              >
              enviar
            </Button><br />
            <div>
              {error && <div>{error}</div>}
            </div>
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default Login;