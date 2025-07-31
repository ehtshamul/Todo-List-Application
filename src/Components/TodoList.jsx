import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleHeadingChange = (e) => {
    setHeadingInput(e.target.value);
  }

  const handleAddHeading = () => {
    if (headingInput.trim()) {
      setTodos([...todos, { heading: headingInput, items: [] }]);
      setHeadingInput('');
    }
  }

  const handleListInputChange = (e, index) => {
    const { value } = e.target;
    setListInputs((prev) => ({ ...prev, [index]: value }));
  }

  const handleAddItem = (index) => {
    if (listInputs[index]?.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[index].items.push(listInputs[index]);
      setTodos(updatedTodos);
      setListInputs((prev) => ({ ...prev, [index]: '' }));
    }
  }

  return (
    <>
      <div className='todo-container'>
        <h1 className='title'>My Todo List</h1>
        <div className='input-container'>
          <input type="text" className='heading-input' placeholder='enter heading'
            value={headingInput}
            onChange={handleHeadingChange}
          />
          <button className='add-list-button' onClick={handleAddHeading}>Add Heading</button>
        </div>
        <div className='todo_main '>
          {todos.map((todo, index) => (
            <div key={index} className='card'>
              <h2 className='todo-heading'>{todo.heading}</h2>
              <button className='delete-button' onClick={() => {
                const updatedTodos = todos.filter((_, i) => i !== index);
                setTodos(updatedTodos);
              }}>Delete</button>    
                        <div className='input-container'>
                <input
                  type="text"
                  className='heading-input'
                  placeholder='enter item'
                  value={listInputs[index] || ''}
                  onChange={(e) => handleListInputChange(e, index)}
                />
                <button className='add-list-button' onClick={() => handleAddItem(index)}>Add Item</button>
              </div>
              <ul className='heading_todo'>
                {todo.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='list-item'>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
