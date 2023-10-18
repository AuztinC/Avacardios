import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GithubSVG from './svg/GithubSVG';

const Login = ({ login, handleGithubLogin })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      navigate('/')
    }
    catch(error){
      setError(error);
    }
  }
  return (<div className='signup'>
    <form onSubmit={ _login }>
      <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
      <Link to={'/signup'}><button style={{width: '100%'}}>Sign Up</button></Link>
      <div style={{textAlign: 'center'}}
      onClick={ handleGithubLogin }>
        <GithubSVG />
      </div>
      { error ? <p className='error'>{error.response.data.message}</p> : null}
    </form>
  </div>);
}

export default Login;
