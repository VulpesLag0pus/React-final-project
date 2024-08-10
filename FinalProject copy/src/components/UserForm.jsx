import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Form } from 'react';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  function handleChange (event){
    const name = event.target.value;
    setInputName(name)
  }

  return (
    <form onSubmit={handleSubmit}>
        <div id='nameInput'>
          <input type='text' name='inputName' id='inputName' value={inputName} onChange={handleChange} placeholder='What is your Name?'></input>
        </div>
        <button type="submit" id='submit'>Submit</button>
    </form>
  );
}