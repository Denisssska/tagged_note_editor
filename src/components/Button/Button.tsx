import React from 'react';
import {PayloadType} from "../../reducer/textEditorReducer";
import buttonStyle from "./Button.module.scss";

type ButtonPropsType = {
    payload?: Partial<PayloadType>
    styles?: string
    clickHandler?: (payload: Partial<PayloadType>) => void
    simpleClick?: () => void
    title?: string
}

export const Button: React.FC<ButtonPropsType> = ({
                                                      title = "X",
                                                      payload,
                                                      styles,
                                                      clickHandler,
                                                      simpleClick
                                                  }) => {
    const onClickHandler = () => {
        if (payload && clickHandler) {
            clickHandler(payload)
        } else {
            if (simpleClick) {
                simpleClick()
            }
        }
    };

    return (
        <button
            className={buttonStyle.button}
            onClick={onClickHandler}
        >{title}</button>
    );
};

