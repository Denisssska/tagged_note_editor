import React, {ChangeEvent, useState} from 'react';
import {v4} from "uuid";
import styles from "./EditableTextField.module.scss";

type EditableTextFieldProps = {
    id: string
    text: string
    changeTextHandler: (id: string, text: string) => void
    setEditMode: (value: boolean) => void
    editMode: boolean
}

export const EditableTextField: React.FC<EditableTextFieldProps> = ({
                                                                        setEditMode,
                                                                        editMode,
                                                                        id,
                                                                        text,
                                                                        changeTextHandler
                                                                    }) => {
    const [textValue, setTextValue] = useState(text)

    const activateEditMode = () => setEditMode(true);

    const addStyles = (word: string) => {
        let styledText: (string | JSX.Element)[] = [];
        word.split(' ')
            .forEach(w => (w[0] === '#' && w.length > 1)
                ? styledText.push(<span key={v4()} className={styles.tag_decoration}> {w} </span>)
                : styledText.push(w + ' ')
            );
        return styledText;
    };

    const activateViewMode = () => {
        setEditMode(false);
        changeTextHandler(id, textValue);
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setTextValue(e.currentTarget.value);

    return (
        <>
            {
                editMode
                    ? <input
                        type="text"
                        value={textValue}
                        onBlur={activateViewMode}
                        onChange={inputHandler}
                        autoFocus
                    />
                    : <div
                        className={styles.changing_field}
                        title={'Double click to change text'}
                        onDoubleClick={activateEditMode}
                    >{addStyles(textValue)}</div>
            }
        </>
    );
};

