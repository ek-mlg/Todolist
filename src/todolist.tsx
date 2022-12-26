import addTaskReact, {ChangeEvent, useState,KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

// title - заголовок
// tasks - список задач

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const  [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            const onClickRemoveTaskHandler = () => props.removeTask(task.id)

            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"

        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeSetTaskStatus}
                />
                <span className={isDoneClasses}>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
        : <span>Tasks List is empty</span>

    const onClickAddTasksToTodolistHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTasksToTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTasksToTodolistHandler()
    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter)
    const inputClasses = error ? "inputErrorClass" : undefined
    const errorMessage = error && <p style={{fontFamily: "roboto", fontSize: "18px", color: "darkred", marginTop: "3px"}}>Please, enter tasks title!</p>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={inputClasses}
                    value={title}
                    onChange={onChangeSetLocalTitleHandler} // input.value
                    onKeyDown={onKeyDownAddTasksToTodolistHandler}
                />
                <button onClick={onClickAddTasksToTodolistHandler}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all'? 'activeFilter' : undefined}
                    onClick={getOnClickSetFilterHandler("all")}>All</button>
                <button
                    className={props.filter === 'active'? 'activeFilter' : undefined}
                    onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button
                    className={props.filter === 'completed'? 'activeFilter' : undefined}
                    onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;