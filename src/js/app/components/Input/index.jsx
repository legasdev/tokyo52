import React, { useState } from "react";
import PropTypes from 'prop-types';

const Input = ({ name='field', type='text', className='', id=(Math.random()*new Date()), label='' }) => {

    const [value, setValue] = useState('');

    function onChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className={`input input--styles ${className}`}>
            <input
                name={name}
                type={type}
                id={id}
                className={`input__${type}`}
                onChange={onChange}
                value={value}
                placeholder='&nbsp;'
            />
            {
                label !== '' &&
                <label className={'input__label'} htmlFor={id}>{label}</label>
            }
            <div className={'input__border'}/>
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
};

export default Input;