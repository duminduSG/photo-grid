import React from 'react';

const Button = ({ children, disabled, onClick, ...rest }) => (
    <button onClick={onClick} disabled={disabled} {...rest} type="button">
        {children}
    </button>
);

export default Button;
