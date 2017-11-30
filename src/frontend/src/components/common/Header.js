import React from 'react';
import { Button } from 'antd'

export default function Header(props) {
    const { title, desc, style, buttonTitle, buttonAction} = props;
    return (
        <div style={{...containerStyles, ...style}}>   
            <span>
                <h2 style={headerStyles}>{title}</h2>
                {(desc) ? <p>{desc}</p> : ""}
            </span>
            {(buttonTitle) ? 
                <Button type="primary" size="large" onClick={buttonAction}>{buttonTitle}</Button>
                : ""}
        </div>
    )
}

const containerStyles = {
    width: "100%",
    background: "white",
    overflow: "hidden",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}

const headerStyles = {
    paddingRight: 10
}
