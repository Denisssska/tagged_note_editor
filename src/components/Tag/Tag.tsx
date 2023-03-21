import React from 'react';
import {v4} from "uuid";
import {Button} from "../Button/Button";
import styles from "./Tag.module.scss";
import './../../App.scss'
import {PayloadType} from "../../reducer/textEditorReducer";

type TagPropsType = {
    tags: Array<string>
    tagFilterHandler: (tag: string) => void
    id: string
    styles: string
    deleteTagHandler: (payload: Partial<PayloadType>) => void
    setValue: (value: boolean) => void
    value: boolean
    editMode: boolean
}

export const Tag: React.FC<TagPropsType> = ({
                                                editMode,
                                                tags,
                                                tagFilterHandler,
                                                id, deleteTagHandler, setValue, value
                                            }) => {

    const onTagFilterHandler = (tag: string) => {
        tagFilterHandler(tag);
        setValue(true)
    }

    return (
        <ul className={styles.wrapper}>
            {tags.map(tag => {
                return (
                    <li className={styles.li} key={v4()}>
                        <div
                            className={editMode ? styles.tag_decoration : styles.tag}
                            title={'Push to filter by tag'}
                            onClick={() => onTagFilterHandler(tag)}
                        >{tag}</div>
                        <div className={styles.buttonBlock}>
                            {/*<Button*/}
                            {/*    clickHandler={deleteTagHandler}*/}
                            {/*    payload={{tag, id}}*/}
                            {/*/>*/}
                            {!value && <Button
                                title={`PUSH TO FILTER BY ${tag}`}
                                clickHandler={() => onTagFilterHandler(tag)}
                                payload={{tag, id}}
                            />}
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};

