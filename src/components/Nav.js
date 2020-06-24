import React from 'react';
import {Link} from 'react-router-dom'


export default function Nav(props){
    return (
        <ul className="nav ">
            <li className="nav-item">
                <Link className="nav-link" to="/Profile">Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active myContainer" to="/">Animals</Link>
            </li>
            {
                props.loggedInUser ? (
                    <li className="nav-item">
                            <button className="nav-link" onClick={props.onLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-in">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-up">SignUp</Link>
                        </li>
                    </>
                )
            }
        </ul>
    )
}