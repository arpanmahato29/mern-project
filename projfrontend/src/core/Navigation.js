import React , {Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import '../styles.css'
import { signout, isAuthenticated } from '../auth/helper'

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ff1e56'}
    } else {
        return {color: '#fff'}
    }
}

const Navigation = ({history}) => (

        <div className="nav-bar">
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")}  className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/cart")}  className="nav-link" to="/cart">Cart</Link>
                </li>
                {/* user dashboard */}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")}  className="nav-link" to="/user/dashboard">Dashboard</Link>
                </li>)}
                {/* admin dashboard*/}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style={currentTab(history,"/admin/dashboard")}  className="nav-link" to="/admin/dashboard">Dashboard</Link>
                </li>)}
            </ul>
                
            <ul className="nav nav-tabs ">
                {/* signin and signup route*/}
                {!isAuthenticated() &&
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history,"/signup")}  className="nav-link" to="/signup">Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history,"/signin")}  className="nav-link" to="/signin">Sign in</Link>
                        </li>
                    </Fragment>
                }
                {/* signout route*/}
                {isAuthenticated() &&
                    <li className="nav-item text-warning">
                        <span className="nav-link" onClick={() => signout(() => {history.push("/")}) }>
                            Signout
                        </span>
                    </li>}
            </ul>
        </div>
    )

export default withRouter(Navigation);
