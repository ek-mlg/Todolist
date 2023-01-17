import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle:string
    callBack: (newTitle: string)=> void
}

const EditableSpan = (props:PropsType) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
            props.callBack(newTitle);
    }


    return (
        edit ? <input onChange={onChangeHandler} value={newTitle} onBlur={onDoubleClickHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;