import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className='footer bg-success mt-auto py-3'>
                <div className='container-fluid  text-white text-center'>
                    <h3>If you got any questions feel free to reach out!</h3>
                    <button className='btn btn-warning btn-lg text-white'>Contact Us</button>
                </div>
                <div className='container text-center'>
                    <span className='text-white-50'>
                        An Amazing <span className='text-white'>MERN</span> bootcamp
                    </span>
                </div>
            </footer>
        )
    }
}
export default Footer;
