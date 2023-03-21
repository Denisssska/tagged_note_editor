import {v4} from "uuid";
import {tagsCreator} from "../utils/tagsCreator";

export enum NOTES_ACTION_TYPE {
    CREATE = 'CREATE',
    GET_ALL_NOTES = 'GET_ALL_NOTES',
    CHANGE = 'CHANGE',
    DELETE = 'DELETE',
    FILTER = 'FILTER',
    DELETE_TAG = 'DELETE_TAG'
}

export type PayloadType = {
    id: string
    title: string
    text: string
    tags: Array<string>
    tag: string
};
export const createAC = (payload: { id: string, title: string, text: string, tags: Array<string> }) => ({
    type: NOTES_ACTION_TYPE.CREATE,
    payload
}) as const;
export const changeAC = (payload: { id: string, text: string }) => ({type: NOTES_ACTION_TYPE.CHANGE, payload}) as const;
export const getAllNotesAC = (state: InitialStateType) => ({
    type: NOTES_ACTION_TYPE.GET_ALL_NOTES,
    state
}) as const;
export const deleteAC = (payload: { id: string | undefined }) => ({type: NOTES_ACTION_TYPE.DELETE, payload}) as const;
export const filterAC = (payload: { tag: string }) => ({type: NOTES_ACTION_TYPE.FILTER, payload}) as const;
export const deleteTagAC = (payload: { tag: string; taskId: string }) => ({
    type: NOTES_ACTION_TYPE.DELETE_TAG,
    payload
}) as const;

export type AllActionsType =
    ReturnType<typeof createAC> |
    ReturnType<typeof changeAC> |
    ReturnType<typeof getAllNotesAC> |
    ReturnType<typeof deleteAC> |
    ReturnType<typeof filterAC> |
    ReturnType<typeof deleteTagAC>;


export type NoteTypes = {
    id: string
    title: string
    text: string
    tags: Array<string>
};

export const initialState = [
    {
        id: v4(),
        title: 'first',
        text: 'I bought some milk',
        tags: [] as Array<string>
    },
    {
        id: v4(),
        title: 'second',
        text: 'I bought some coffee',
        tags: [] as Array<string>
    },
    {
        id: v4(),
        title: 'third',
        text: 'I bought some water',
        tags: [] as Array<string>
    },
];

export type InitialStateType = typeof initialState;

export function textEditorReducer(state: InitialStateType = initialState, action: AllActionsType): InitialStateType {
    switch (action.type) {
        case NOTES_ACTION_TYPE.CREATE:
            return [...state, action.payload];
        case NOTES_ACTION_TYPE.GET_ALL_NOTES:

            return state = action.state;
        case NOTES_ACTION_TYPE.DELETE:
            return state.filter(el => el.id !== action.payload.id);
        case NOTES_ACTION_TYPE.CHANGE:
            return state.map(el => el.id === action.payload.id
                ? {...el, text: action.payload.text, tags: tagsCreator(action.payload.text)}
                : el);
        case NOTES_ACTION_TYPE.FILTER:
            return state.filter(el => el.tags.indexOf(action.payload.tag) !== -1
                ? el
                : '');
        case NOTES_ACTION_TYPE.DELETE_TAG:
            return state.map(el => el.id === action.payload.taskId
                ? {...el, tags: el.tags.filter(tag => tag !== action.payload.tag)}
                : el);
        default:
            throw new Error();
    }
}