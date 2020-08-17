import React, { Component } from 'react'
import { isAuthenticated } from '../auth/helper';


export default class AdminInfo extends Component {
    render() {
        const {name,email} = isAuthenticated().user;
        return(
            <div className='card bg-success mb-4'>
                <div className='card-header bg-success text-white'>
                    <h5 className='text-center'>Admin Information</h5>    
                </div>
                <ul className='list-group rounded-bottom bg-dark'>
                    <li className='list-group-item bg-dark'>
                        <span className='bg-success p-1 mr-2 rounded'>Name:</span><span className='text-white'>{name}</span>
                    </li>
                    <li className='list-group-item bg-dark'>
                        <span className='bg-success p-1 mr-2 rounded'>Email:</span><span className='text-white'>{email}</span>
                    </li>
                    <li className='list-group-item bg-dark'>
                        <span className='bg-danger p-1 mr-2 rounded'>Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }
}
