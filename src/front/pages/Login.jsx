import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { value, name } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(user);

    const handleUserLogin = (event) => {
        event.preventDefault()
        setError('');

        if (!user.email || !user.password) {
            setError('Email and password are required');
            return;
        }
        fetch(`${backendUrl}api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log(response);
                if (response.status != 200) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Login failed');
                    });
                }
                return response.json(user)
            })
            .then(userData => {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('user', JSON.stringify(userData.user));
                navigate('/private');
                alert('Login successful');
            })
            .catch(error =>{
                setError(error.message || 'Server not found.');
                console.log(error);
            });
    }

    return (
        <>
            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: 'url("../assets/img/curved-images/curved14.jpg")' }}>
                    <span className="mask bg-gradient-dark opacity-6" />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 text-center mx-auto">
                                <h1 className="mb-2 mt-5">Welcome!</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">
                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0">
                                <div className="card-header text-center pt-4">
                                    <h5>Login</h5>
                                </div>
                                <div className="card-body">
                                    <form role="form text-left">
                                        <div className="mb-3">
                                            <input required onChange={handleChange} name='email' type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                        </div>
                                        <div className="mb-3">
                                            <input required onChange={handleChange} name='password' type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-check-input" type="checkbox" defaultValue id="rememberMe" />
                                            <label className="form-check-label mx-2" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        <div className="text-center" onClick={handleUserLogin}>
                                            <button type="button" className="btn bg-primary w-50 my-4 mb-2" style={{ color: 'white' }}>Log in</button>
                                        </div>
                                        <p className="text-sm mt-3 mb-0">Don't have an account? <Link to="/signup" className="text-dark font-weight-bolder">Sign up</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default Login;