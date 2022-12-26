import React, {useState} from 'react';
import Todolist, {TaskType} from './todolist';
import './App.css';
import {v1} from "uuid";

// CRUD

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete

// Interface

export type FilterValuesType = "all"|"active"|"completed"

function App() {
    const todoListTitle: string = "Whats to learn?";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML, CSS", isDone: true},
        {id: v1(), title: "ES6, TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType> ("all")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks]) //new Array()
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone}: t))
    }


    const  getFilteredTasksForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(tasks => !tasks.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const  filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()

    return (
        <div className="App">
            <div>
                <Todolist
                    addTask={addTask}
                    removeTask={removeTask}
                    title={todoListTitle}
                    changeTodolistFilter={changeTodolistFilter}
                    tasks={filteredTasksForRender}
                    filter={filter}
                    changeTaskStatus={changeTaskStatus}
                />
            </div>
        </div>
    );
}

export default App;
