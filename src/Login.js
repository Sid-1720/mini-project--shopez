import React from 'react'
import './Login.css';
import { Link, useHistory } from 'react-router-dom'
import { useState} from 'react'
import { auth } from './firebase';

function Login() {
    const history= useHistory();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        // firebase code
        auth
            .signInWithEmailAndPassword(email,password)
            .then((auth) => {
                history.push('/');
            })
    }       

    const register = e => {
        e.preventDefault();
        // firebase code
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(( auth ) => {
                    console.log(auth);
                    if (auth) {
                        history.push('/');
                    }

            })
            .catch(error => alert(error.message))    

            
    }

    return (
        <div className='login'>
            <Link to='/'>
           <img 
           className='Login_logo'
           src="https://www.freelogodesign.org/file/app/client/thumb/16abe0e6-c591-44f7-9325-c83509d73904_200x200.png?1612269671198" alt='logo'/>

            </Link>
            <div className="login_container">
               <h1>Sign-in</h1>
               <br></br>
               <form>
                    <h5>E-mail</h5>
                    <input className='input-txt' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input className='input-txt' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <p></p>
                    <button  onClick={ signIn } className='login-sign-in' type='submit' >Sign-in</button>
                    <p> </p>

                    <button  onClick={ register } className='login-register-button'>Create New Account</button>

               </form>
                 
            </div>
        </div>

    )
}

export default Login

