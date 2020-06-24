import React from 'react';
import {Link} from 'react-router-dom'


export default function AnimalsList(props){
    return (
        <>
            {
                props.todos.map((todo, i) => {
                    return <p key={i}><Link to={`/animal/${todo._id}`}>{todo.name}</Link></p>
                })
            }
            <li className="nav-item">
                <Link className="nav-link" to="/add-form">Add animal</Link>
            </li>
        </>
    )
}