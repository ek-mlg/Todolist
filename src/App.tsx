import React from 'react';
import Todolist, {TaskType} from './todolist';
import './App.css';

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

function App() {
    const todoListTitle_1: string = "Whats to learn?";
    const todoListTitle_2: string = "Whats to buy?";

    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML, CSS", isDone: true},
        {id: 1, title: "ES6, TS", isDone: true},
        {id: 1, title: "React", isDone: false},
    ]

    return (
        <div className="App">
            <div>
                <Todolist title={todoListTitle_1} tasks={tasks_1}/>
                {/*<Todolist title={todoListTitle_2} tasks={""}/>*/}
                {/*Выше дз!*/}
            </div>
        </div>
    );
}

export default App;
