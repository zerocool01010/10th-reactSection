import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
/* import { useEffect } from 'react/cjs/react.production.min'; */

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => { //para ver un poco como funciona el useEffect
    console.log('Effect Running');

    return ()=> {
      console.log('Effect Clean Up');
    }
  }, [enteredPassword]);

  useEffect(() => { //normalmente lo usamos para sideEffects, como usuarios haciendo cambios (ingresando data en un input) o un http request
    const timeId = setTimeout(() => { // cada vez que entramos algo en el input del mail o del pass, ejecutamos este timer y chequeamos la validez de lo que se esta ingresando
      console.log('Checking form validity!')
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 //la validez estara determinada por si se tiene un char del tipo @ en el input email y si se tiene un pass mayor a 6 chars descontando los blank spaces
      );
    }, 500); //se chequea cada medio segundo, para que el usuario pueda escribir con cierta libertad antes de un aviso de que lo ingresado no es valido

    return () => {
      console.log('Cleaning up')
      clearTimeout(timeId); //cuando termina el chequeo se limpia el timer asi se libera la memoria, es una buena practica
    }  
  }, [enteredEmail, enteredPassword]) //si cambia alguna de las dos dependencias (OR operator)

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
