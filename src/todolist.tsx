import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

// title - заголовок
// tasks - список задач

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
        : <span>Tasks List is empty</span>

    const onClickAddTasksToTodolistHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTasksToTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTasksToTodolistHandler()

    /*const onClickSetAllFilterHandler = () => props.changeFilter( "all" )
    const onClickSetActiveFilterHandler = () => props.changeFilter( "active" )
    const onClickSetCompletedFilterHandler = () => props.changeFilter( "completed" )*/

    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler} // input.value
                    onKeyDown={onKeyDownAddTasksToTodolistHandler}
                />
                <button onClick={onClickAddTasksToTodolistHandler}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={getOnClickSetFilterHandler("all")}>All</button>
                <button onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;