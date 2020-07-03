import React, {userState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';

const Signin = () => {

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password"/>
                        </div>
                        <button className="btn btn-danger btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin page" description="page for user to signin!!">{signInForm()}</Base>
    )
}

export default Signin