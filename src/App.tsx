import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todoListsID1 = v1();
    let todoListsID2 = v1();

    let [todoLists, SetTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListsID1, title: "Whats to learn", filter: "all"},
        {id: todoListsID2, title: "Whats to buy", filter: "all"},
        ])


    let [tasks, setTasks] = useState({
        [todoListsID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsID2]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    });

    function removeTask(todoListsId: string, taskId: string) {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].filter(el => el.id !== taskId)})
    }

    function addTask(todoListsId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListsId]: [...tasks[todoListsId], newTask]})
    }

    function changeStatus(todoListsId: string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        SetTodoLists(todoLists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return(
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
