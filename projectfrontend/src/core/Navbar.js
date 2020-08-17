import React, { Component,Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'

 class Navbar extends Component {

    currentTab = (history, path) => {
        if(history.location.pathname === path) {
            return {color : '#FFFFFF',background: "#75DA8B" }
        } else {
            return {color : '#FFFFFF'}
        }
    }

    render() {
        const history = this.props.history;
        return (
            <div className='d-flex justify-content-between bg-success'>
                <div>
                    <ul className='nav  bg-success'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/' style={this.currentTab(history,'/')}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/cart' style={this.currentTab(history,'/cart')}>
                                Cart
                            </Link>
                        </li>
                        {
                            isAuthenticated() && isAuthenticated().user.role === 0 && 
                            <li className='nav-item'>
                                <Link className='nav-link' to='/user/dashboard' style={this.currentTab(history,'/user/dashboard')}>
                                    Dashboard
                                </Link>
                            </li>
                        }
                        {
                            isAuthenticated() && isAuthenticated().user.role === 1 &&
                            <li className='nav-item'>
                                <Link className='nav-link' to='/admin/dashboard' style={this.currentTab(history,'/admin/dashboard')}>
                                    Admin Dashboard
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
                <div>
                    <ul className='nav bg-success'>
                        {!isAuthenticated() &&<Fragment>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/signup' style={this.currentTab(history,'/signup')}>
                                    SignUp
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/signin' style={this.currentTab(history,'/signin')}>
                                    Singin
                                </Link>
                            </li>
                        </Fragment>}
                        {isAuthenticated() && <li className='nav-item'>
                            <span className='nav-link btn-warning text-white' onClick={() => {
                                signout(() =>{
                                    history.push('/')
                                    })
                                }
                            }>Signout</span>
                        </li>}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(Navbar);