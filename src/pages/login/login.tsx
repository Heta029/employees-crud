import React, { useContext ,  useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { login } from "../../redux/action/login.action";
import { observer } from "mobx-react";
import useStyles from "./style";
import { LoginStoreContext } from "../../Stores/loginStore";
import logo from "./logo.svg";

// context
const Login = observer(()=>{
  var classes = useStyles();
  const { t, i18n } = useTranslation();
  const loginStore = useContext(LoginStoreContext);
  // global

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(false);
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");
  var [newPasswordValue, setNewPasswordValue] = useState('');
  var[forgotPassword,setForgotPassword] = useState(false);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Employee Management</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
        
            <React.Fragment>
              {
                forgotPassword!=true?
                <div>
                  <Fade in={error}> 
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
             </Fade> 
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type={t('email')}
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder={t('password')}
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                 
                    onClick={()=> {
                      localStorage.setItem("isLogin","true")
                      console.log(loginStore.login)
                      loginStore.provideLogin()}
                    }
                    variant="contained"
                    style={{background:"#8e24aa",color:"white"}}
                    size="large"
                  >
                    {t('login')}                                                                                                                                                                                   
                  </Button>
                )}
                <Button
                  style={{color:"#8e24aa"}}
                  size="large"
                  className={classes.forgetButton}
                  onClick={()=>setForgotPassword(true)}
                >
                 {t('forgetPassword')}
                </Button>
              </div>
                </div>
                :

                <div>
                  <div><strong style={{color:"#8e24aa"}}>Enter new password:</strong></div>              
            
              <TextField
                id="password"
                value={newPasswordValue}
                onChange={e => setNewPasswordValue(e.target.value)}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                  
                }}
               
                margin="normal"
                placeholder={t('password')}
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                     passwordValue.length === 0
                    }
                    onClick={() =>
                      setForgotPassword(false)
                    }
                    variant="contained"
                    style={{background:"#8e24aa",color:"white"}}
                    size="large"
                  >
                    {t('set')}
                  </Button>
                )}             
              </div>
                </div>
              }
              
            </React.Fragment>
        
        </div>       
      </div>
    </Grid>
  );
})

const mapDispatchToProps = (dispatch:any) => ({
  login: (isLogin:any) => dispatch(login(isLogin))
});
export default Login;