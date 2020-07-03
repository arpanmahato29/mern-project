import React, { Children } from 'react'
import Navigation from './Navigation'
import '../styles.css'

const Base = ({
    title = "My Title",
    description = "My description",
    className = "  p-2",
    children
}) => {
    return (
        <div>
            <Navigation/>
            <div className="container-fluid">
                <div className="jumbotron text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-auto py-3">
                <div className="container-fluid  text-center text-light">
                    <h4>If you got any questions, feel free to reach out!!</h4>
                    <button className="btn btn-warning">Contact US</button>
                </div>
                <div className="container text-center">
                    <span className="text-muted">
                        An amazing MERN Bootcamp
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base
