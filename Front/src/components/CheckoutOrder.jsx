import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerCart: {
    display: "flex",
    margin: theme.spacing(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CheckoutOrder = () => {
  const classes = useStyles();
  const history = useHistory();

  const goToHistory = () => {
      history.push("/historycart")
  }

  const goToHome = () => {
    history.push("/")
  }

  return (
    <div>
      <div className={classes.headerCart}>
          <Box flexGrow={1}>
            <Typography variant="h4" component="h4">
              {" "}
              Shop Cart
            </Typography>
          </Box>
      </div>
      
        <div style={{ width: "100%", textAlign: "center" }} >
          <Typography variant="h5" component="h5">
            {" "}
            Tu compra se esta procesando! Te avisaremos cuando este lista.
          </Typography>
        </div>

      <div className={classes.headerCart}>
        <Box p={1}>
        <Button className={classes.button} onClick={goToHome} variant="outlined" color="primary">
            Ir a home
          </Button>
          <Button className={classes.button} onClick={goToHistory} variant="outlined" color="primary">
            Ver historial de compra
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CheckoutOrder;
