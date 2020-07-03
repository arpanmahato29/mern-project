import React, {userState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';

const Signup = () => {

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label className="">Name</label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="">Email</label>
                            <input className="form-control" type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="">Password</label>
                            <input className="form-control" type="password"/>
                        </div>
                        <div className="text-right">
                        <button className="btn btn-danger ">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signup page" description="page for user to signup!!">
            {signUpForm()}

        </Base>
    )
}

export default Signup