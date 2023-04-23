import React from "react";

interface IAlertProps {
    type: string;
    message: string;
}

const Alert = ({ type, message }: IAlertProps) => {
    return (
        <div className={`alert ${type} alert-dismissible`} role="alert">
            <div className="alert-message">{message}</div>
        </div>
    );
};

export default Alert;