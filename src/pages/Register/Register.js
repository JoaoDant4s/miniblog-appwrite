import './Register.css'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'; 
import { Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ID } from "appwrite"
import { account } from '../../appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(null)
    const [values, setValues] = useState({
        passwordToShow: "",
        showPassword: false
    })
    const navigate = useNavigate();
    //const { createUser, error: authError, loading_res } = useAuthentication();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        const user = {
            displayName,
            email,
            password
        }
        // const navigate = useNavigate();
        const createdUser = account.create(
            ID.unique(), 
            user.email, 
            user.password, 
            user.displayName)
        .then(response => {
            console.log("aaaaaaaaa")
            account.createEmailSession(user.email, user.password);
            console.log("loguei")
            navigate("/login") 
        }).catch(error => {
            console.log("nao consegui logar, craque")
            console.log(error);
        });
        console.log(createdUser)
        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!")
            return
        }
        setLoading(false);
    }

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
    <div className='content-register'>
        <h1>Cadastre-se para postar</h1>
        <Grid container justifyContent="center" className='form-container'>
            <Box
            component="form"
            validate="true"
            autoComplete="off"
            sx={{width: "60%"}}
            onSubmit={handleSubmit}
            >
                <Grid container flexDirection="column" rowSpacing={2}>
                    <Grid item>
                        <TextField
                        required
                        id="standard-required1"
                        label="Nome"
                        type="text"
                        variant="standard"
                        sx={{width: "100%"}}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        required
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
                        required
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
                    <Grid item>
                    <TextField
                        required
                        id="standard-adornment-password4"
                        autoComplete='password'
                        label="Confirmar senha"
                        type={values.showPassword ? 'text' : 'password'}
                        variant="standard"
                        sx={{width: "100%"}}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <Grid item>
                        {!loading && <Button variant="outlined" type="submit">Cadastrar</Button>}
                        {loading && <Button variant="outlined" type="submit" disabled>Aguarde...</Button>}
                        {error && <p className="error">{error}</p>}
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </div>
  )
}

export default Register