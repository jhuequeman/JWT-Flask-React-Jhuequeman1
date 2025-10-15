import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// realizando prueba
const Signup = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    })

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { value, name} = event.target
        setUser ({
            ...user,
            [name]: value
        })
    }
    console.log(user);

    const handleUserSubmit = (event) => {
        event.preventDefault()
        fetch(`${backendUrl}api/user`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                alert('User created successfully')
                navigate('/')
            }
            return response.json()
        }) 
        .then(data => alert(data))
        .catch(error => console.log(error)); 
        
    }
    
    return (
        <>
            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: 'url("../assets/img/curved-images/curved14.jpg")' }}>
                    {/* <span className="mask bg-gradient-dark opacity-6" />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 text-center mx-auto">
                                <h1 className="mb-2 mt-5">Welcome!</h1>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">
                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0">
                                <div className="card-header text-center pt-4">
                                    <h5>Register form</h5>
                                </div>
                                <div className="card-body">
                                    <form role="form text-left">
                                        <div className="mb-3">
                                            <input onChange={handleChange} name='name' type="text" className="form-control" placeholder="Full Name" aria-label="Name" aria-describedby="email-addon" />
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={handleChange} name='email' type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={handleChange} name='password' type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                                        </div>
                                        <div className="form-check form-check-info text-left">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                I agree the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        <div className="text-center" onClick={handleUserSubmit}>
                                            <button type="button" className="btn bg-primary w-50 my-4 mb-2" style={{ color: 'white' }}>Sign up</button>
                                        </div>
                                        <p className="text-sm mt-3 mb-0">Already have an account? <Link to="/login" className="text-dark font-weight-bolder">Sign in</Link></p>
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
export default Signup;