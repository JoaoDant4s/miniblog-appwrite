
import './Login.css'
import { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'; 
import { Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { account } from '../../appwrite/appwriteConfig';
import { useNavigate } from "react-router-dom"
import { AuthContextUser } from "../../context/AuthContextUser"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(null)
    const [values, setValues] = useState({
        passwordToShow: "",
        showPassword: false
    })
    const { setUserAuth } = useContext(AuthContextUser)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError("")

      account.createEmailSession(email, password)
      .then(() => {
        account.get().then((response) => {
          setUserAuth(response)
          console.log(response.name)
          console.log(response.$id)
        }, () => {
          console.log("deu bigode ao logar, chefia")
        })
        navigate("/")
      }, (error) => {
        console.log(error)
      })

      setLoading(false);
    }

    const logWithMicrosoft = () => {
      account.createOAuth2Session(
        "microsoft",
        "http://localhost:3000/",
        "http://localhost:3000/login"
      ).then(() => {
        console.log("deu certo")
      }, () => {
        console.log("deu bigode ao logar, chefia")
      })
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  return (
    <div className="content-login">
      <h1>Entrar</h1>
      <p>Faça login para utilizar o sistema</p>
        <Grid container justifyContent="center" className='form-container'>
            <Box
            component="form"
            validate="true"
            autoComplete="off"
            sx={{width: "60%"}}
            onSubmit={handleSubmit}
            className="box-form"
            >
                <Grid container flexDirection="column" rowSpacing={4}>
                    <Grid item>
                        <TextField

                        id="standard-required2"
                        label="E-mail"
                        type="email"
                        variant="standard"
                        sx={{width: "100%"}}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Grid >
                  <Grid item>
                      <TextField
                      id="standard-required3"
                      autoComplete='password'
                      label="Senha"
                      type={values.showPassword ? 'text' : 'password'}
                      variant="standard"
                      sx={{width: "100%"}}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                          endAdornment:(
                              <InputAdornment position="end">
                                  <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  >
                                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                              </InputAdornment>
                          ),
                        }}
                      />
                  </Grid>                   
                  <Grid container justifyContent="center" mt={3}>
                    <Grid container item md={4} sm={8}>
                        <Grid container item flexDirection="column">
                          {!loading && <Button variant="outlined" type="submit">Entrar</Button>}
                          {loading && <Button variant="outlined" type="submit" disabled>Aguarde...</Button>}
                          {error && <p className="error">{error}</p>}
                          <Box mt={2}>
                            <Button id="aki" onClick={logWithMicrosoft}>
                              <i className="bi bi-microsoft"></i>
                              <span className="microsoft-login">microsoft</span>
                            </Button>
                          </Box>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </Box>
        </Grid>
    </div>
  )
}

export default Login