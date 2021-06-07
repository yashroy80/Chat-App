import React from 'react'

export default function Avatar(props) {
    return (
        <div className="avatar">
            {props.image?<img className="avatar-img" src={props.image} alt=""></img>:""}
        </div>
    )
}