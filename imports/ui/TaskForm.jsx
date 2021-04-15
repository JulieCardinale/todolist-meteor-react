/* Import(s) */
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* * * * * * * * * * * *
 * * TaskForm Component *
 *
 * @description : Render a form to add a new task
 *
 */
export const TaskForm = () => {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @useState : text is the stored value, setText is a function used to update that value *
  */
  const [text, setText] = useState('');

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @handleSubmit : insert the task text in db on submit *
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    Meteor.call('tasks.insert', text);
    setText('');
  };

  return (
    /* * * * * * * * * * * * * * * *
    * @form : form to add new task *
    */
    <form className="task-form" onSubmit={handleSubmit}>
      {/* * * * * * * * * * *
      * @input : form input *
      */}
      <input
        className="task-form__input"
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* * * * * * * * * * * * *
      * @button : submit button *
      */}
      <button type="submit" className="task-form__submit"><FontAwesomeIcon icon={faPlus}/></button>
    </form>
  );
};
