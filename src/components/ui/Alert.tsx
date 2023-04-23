import React, {FC} from "react";

interface IAlertProps {
    type: string;
    message: string;
}

const Alert:FC<IAlertProps> = ({ type, message }) => {
    return (
        <div className={`alert ${type} alert-dismissible`} role="alert">
            <div className="alert-message">{message}</div>
        </div>
    );
};

export default Alert;