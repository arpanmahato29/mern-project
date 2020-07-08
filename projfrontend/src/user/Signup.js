import React, {useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {signup} from '../auth/helper'

const Signup = () => {

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,error,success} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password}).then(data => {
            if(data.error){
                setValues({...values,error:data.error,success:false})
            } else {
                setValues({...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true
                })
            }
        })
        .catch(console.log("Error in signup"))
    }

    const successMessage = () => {return(
        <div className="col-md-6 offset-sm-3">
            <div className="alert alert-success" style={{display:success?"":"none"}}>
                New Account created successfully
                . Please <Link to="/signin" className="">Login Here</Link>
            </div>
        </div>
    )}

    const errorMessage = () => {
        return(
            <div className="col-md-6 offset-sm-3">
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error.msg}</div>
            </div>
        )
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label className="">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name} required/>
                        </div>
                        <div className="form-group">
                            <label className="">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email} required/>
                        </div>
                        <div className="form-group">
                            <label className="">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password} required/>
                        </div>
                        <div className="text-right">
                        <button className="btn btn-danger btn-block" onClick={onSubmit}><span className="font-weight-bold">Sign Up</span></button>

                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signup page" description="page for user to signup!!">
            {successMessage()};
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}

export default Signup