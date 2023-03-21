import React, {useState} from "react";
import styles from "./CreateNoteComponent.module.scss";
import {Button} from "../Button/Button";

type CreateNoteComponentType = {
    setCreator: (creator: boolean) => void
    noteCreate: (title: string, text: string) => void
}

export const CreateNoteComponent: React.FC<CreateNoteComponentType> = ({setCreator, noteCreate}) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [requiredTitle, setRequiredTitle] = useState('');
    const [requiredText, setRequiredText] = useState('');

    const onSaveHandler = () => {
        setCreator(false);
        if (title === '' || text === '') {

            return;
        }
        noteCreate(title, text);
    };

    const blurTitleHandler = () => setRequiredTitle('Required field');
    const blurTextHandler = () => setRequiredText('Required field');

    return (
        <div className={styles.container}>
            <div>
                <input

                    type="text"
                    placeholder={requiredTitle || 'Insert title'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onBlur={blurTitleHandler}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder={requiredText || 'Insert note text'}
                    value={text}
                    onBlur={blurTextHandler}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
            </div>
            <Button title={"SAVE"} styles={styles.button} simpleClick={onSaveHandler}/>
        </div>
    );
};

