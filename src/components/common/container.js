import React, { Component } from "react"


const containerStyle = {
    maxWidth: '41em',
    marginTop: '1em',
    borderRadius: '4px',
    padding: '1em 2em',
    background: 'rgba(255,255,255,0.51)'
}

export function Container(props) {
    return (
        <div className="container" style={ containerStyle }>
            { props.children }
        </div>
    )
}