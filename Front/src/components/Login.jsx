
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { sendLoginRequest } from "../store/user";
import { saveCartItems } from "../store/cart";
import { validateEmail, validatePassword } from "../utils/validations";

// MATERIAL UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core"

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
    
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const unloggedCart_items = useSelector(state=>state.cart_items)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    if (validateEmail(email) === false) {
      return setError("Email invalido");
    }
    if (validatePassword(password) === false) {
      return setError("Password invalido");
    }
    dispatch(sendLoginRequest({ email, password, unloggedCart_items }))
    .then(() => {

      const cart_items = JSON.parse(localStorage.getItem("cart_items"))
      
      dispatch(saveCartItems(cart_items))
      setIsLoading(false)

      history.push("/")
    })
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
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
            {
              isLoading ? <CircularProgress/> : null
            }
            <br />
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