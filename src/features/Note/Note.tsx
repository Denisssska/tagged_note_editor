import React, {useState} from 'react';
import styles from './Note.module.scss';
import {Button, EditableTextField, Tag} from "../../components";
import {PayloadType} from "../../reducer/textEditorReducer";

type NotePropsType = {
    id: string
    title: string
    text: string
    tags: Array<string>
    deleteHandler: (payload: Partial<PayloadType>) => void
    changeTextHandler: (id: string, text: string) => void
    tagFilterHandler: (tag: string) => void
    setValue: (value: boolean) => void
    value: boolean
}

export const Note: React.FC<NotePropsType> = ({
                                                  text,
                                                  title,
                                                  id,
                                                  tags,
                                                  deleteHandler,
                                                  changeTextHandler,
                                                  tagFilterHandler,
                                                  setValue,
                                                  value
                                              }) => {

    const [editMode, setEditMode] = useState(false);
    return (
        <div className={styles.note_container}>
            <div className={styles.title_container}>
                <h2>{title}</h2>

                <Button
                    payload={{id}}
                    clickHandler={deleteHandler}
                />

            </div>
            <EditableTextField
                editMode={editMode}
                setEditMode={setEditMode}
                key={id}
                id={id}
                text={text}
                changeTextHandler={changeTextHandler}
            />
            <Tag
                editMode={editMode}
                value={value}
                setValue={setValue}
                deleteTagHandler={deleteHandler}
                styles={styles.close_btn}
                tags={tags}
                tagFilterHandler={tagFilterHandler}
                id={id}
            />
        </div>
    );
};

