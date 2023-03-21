import React, {useEffect, useReducer, useState} from 'react';
import {Note} from "../Note/Note";
import {v4} from 'uuid';
import {initialState, textEditorReducer} from "../../reducer";
import {Button, CreateNoteComponent} from "../../components";
import styles from './NotesList.module.scss';
import {
    changeAC,
    createAC,
    deleteAC,
    deleteTagAC,
    filterAC,
    getAllNotesAC,
    InitialStateType
} from "../../reducer/textEditorReducer";
import {tagsCreator} from "../../utils/tagsCreator";

export const NotesList = () => {

    const [state, dispatch] = useReducer(textEditorReducer, initialState);
    const [value, setValue] = useState(false)

    useEffect(() => {
        localStorage.setItem('all state', JSON.stringify(state))
    }, [state])

    const [creator, setCreator] = useState(false);

    const noteCreate = (title: string, text: string) => {
        dispatch(createAC({id: v4(), title, text, tags: tagsCreator(text)}));
    };
    const getAllNotes = () => {
        const pastState = JSON.parse(localStorage.getItem("past state") as string);
        dispatch(getAllNotesAC(pastState));
        setValue(false)
    }
    const deleteHandler = (taskId: string | undefined, tag: string | undefined) => {
        if (tag && taskId) {
            dispatch(deleteTagAC({taskId, tag}))
        } else {
            const pastState: InitialStateType = JSON.parse(localStorage.getItem("past state") as string);
            const filteredState = pastState.filter(item => item.id !== taskId)
            dispatch(deleteAC({id: taskId}))
            localStorage.setItem('past state', JSON.stringify(filteredState))
        }
    };
    const changeTextHandler = (id: string, text: string) => {
        dispatch(changeAC({text, id}));
    };

    const tagFilterHandler = (tag: string) => {
        const allState = JSON.parse(localStorage.getItem("all state") as string);
        localStorage.setItem('past state', JSON.stringify(allState))
        dispatch(filterAC({tag}));
    };

    return (
        <div className={styles.notesList_container}>
            <div className={styles.create_wrapper}>
                {creator
                    ? <CreateNoteComponent setCreator={setCreator} noteCreate={noteCreate}/>
                    : <Button title={"CREATE NOTE"} simpleClick={() => setCreator(true)}/>
                }
                {value && <Button
                    title={"REFRESH ALL NOTES"}
                    simpleClick={getAllNotes}
                />}
            </div>
            {state.map((el, id) => {
                return (
                    <Note
                        setValue={setValue}
                        value={value}
                        key={id}
                        id={el.id}
                        title={el.title}
                        text={el.text}
                        tags={el.tags}
                        deleteHandler={(payload) => deleteHandler(payload.id, payload.tag)}
                        changeTextHandler={changeTextHandler}
                        tagFilterHandler={tagFilterHandler}
                    />
                )
            })}
        </div>
    );
};
