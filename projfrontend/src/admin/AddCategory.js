import React, {useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import {createCategory} from "./helper/adminapicall"


const AddCategory = () => {

    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user,token} = isAuthenticated();

    const goBack = () => (
        <div className="mt-2 mb-2">
            <Link className="btn btn-dark btn-sm" to="admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        //backend request fired
        createCategory(user._id,token, {name}) .then(data => {
            if(data.error) {
                setError(true);
            } else {
                setError("")
                setSuccess(true);
                setName("");
            }
        })
    }
    const successMessage = () => {
        if(success){
            alert("Category added successfully")
        }
    }

    const warnignMessage = () => {
        if(error) {
            alert("Failed to add new category")
        }
    }
    const myCategoryForm = () =>(
        <form>
            <div className="form-group">
                <h4 className="lead">Enter the category</h4>
                <input type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required 
                    placeholder="Ex : Summer"/>
                <button className="btn btn-danger" onClick={onSubmit}>Add Category</button>
            </div>
        </form>
    )

    return (
        <Base title="Create a category" description="Add a new category for new tshirts" className="container bg-secondary p-4">
            <div className="row rounded bg-white">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warnignMessage()}
                    {myCategoryForm()}{goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;