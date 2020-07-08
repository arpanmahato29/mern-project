import React, {useState} from 'react';
import Base from '../core/Base';
import {Link, Redirect} from 'react-router-dom';

import {signin,authenticate,isAuthenticated} from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        emial:"",
        password:"",
        error:"",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true,});
        signin({email,password})
        .then(data => {
            if(data.error) {
                setValues({...values,error:data.error,loading:false})
            } else {
                authenticate(data,() => {
                    setValues({...values,didRedirect:true})
                })
            }
        })
        .catch(console.log("signin failed"))
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const loadingMessage = () => {return(
        loading && (
            <div className="alert alter-info">
                <h2>Loading...</h2>
            </div>
        )
    )}

    const errorMessage = () => {
        return(
            <div className="col-md-6 offset-sm-3">
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error.msg}</div>
            </div>
        )
    }

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input className="form-control" type="email" onChange={handleChange("email")} value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input className="form-control" type="password" onChange={handleChange("password")} value={password}/>
                        </div>
                        <button className="btn btn-danger btn-block" onClick={onSubmit}><span className="font-weight-bold">Sign In</span></button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin page" description="page for user to signin!!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin