import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      settodos(JSON.parse(storedTodos));
    }
  }, []);

  const updateTodos = (newTodos) => {
    settodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    updateTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    updateTodos(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    updateTodos(newTodos);
    settodo('');
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    updateTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container w-full min-h-[93vh] md:w-[70%] mx-auto rounded-xl p-3  bg-blue-400 md:mt-2 md:min-h-[89vh]">
        <h1 className='text-white font-bold text-center text-2xl'>iTask - Manage Your Tasks At One Place</h1>
        <div className="addtodo my-5 flex flex-col gap-2">
          <h2 className="text-[16px] font-bold text-white">Add a Todo</h2>
          <div className="flex ">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className=" outline-none w-full rounded-xl p-1 flex items-center justify-center"
            />
            <button
              onClick={handleAdd} disabled={todo.length <= 3}
              className="bg-blue-600 p-1 px-4 text-white cursor-pointer hover:font-bold rounded-lg  py-1 mx-2 hover:bg-blue-800"
            >
              Save
            </button>
          </div>

        </div>
        <h1 className="text-[16px] font-extrabold text-white">Your Todos</h1>
        {todos.length === 0 && <div className='my-2 text-gray-700'>No Todos to display</div>}

        {todos.map((item, index) => {
          return (
            <div className="todos my-3 " key={index}>
              <div key={item.id} className="todo my-2  md:w-2/3 flex justify-between">
                <div className='flex w-[70%] gap-4'>
                  <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons  md:ml-0 md:max-w-40 flex max-h-6  ">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className="bg-blue-600 p-1 px-4 text-white hover:font-bold rounded-md mx-1 py-1 hover:bg-blue-800"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className="bg-blue-600 p-1 px-4 text-white hover:font-bold rounded-md mx-1 py-1 hover:bg-blue-800"
                  > <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;