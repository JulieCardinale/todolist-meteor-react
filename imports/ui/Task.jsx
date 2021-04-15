/* Import(s) */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

/* * * * * * * * * *
 * * Task component *
 *
 * @description : represent one task in our To-Do list.
 *
 * @props --------------------------------------------------------------------------------------
 * - task                       => a task
 * - onCheckboxClick            => on checkbox click action
 * - onDeleteClick (bool)       => on delete click action
 * ---------------------------------------------------------------------------------------------
 *
 */
export const Task = ({ task, onCheckboxClick, onDeleteClick }) => (
  <li className="task">

    {/* * * * * * * * * *
    * @input : checkbox *
    */}
    <input
      type="checkbox"
      checked={!!task.isChecked}
      readOnly
      style={{'display': 'none'}}
    />

    <FontAwesomeIcon 
      className='task__checkbox'
      onClick={() => onCheckboxClick(task)}
      icon={task.isChecked ? faCheckSquare: faSquare}
    />

    {/* * * * * * * * * *
    * @span : task text *
    */}
    <span className="task__text" style={task && task.isChecked ? {'textDecoration': 'line-through', 'opacity' : '30%'} : {}}>{task.text}</span>

    {/* * * * * * * * * * * * * * * * * *
    * @button : button to delete a task *
    */}
    <button className='task__delete' onClick={() => onDeleteClick(task)}>
      <FontAwesomeIcon 
        className='task__delete--icon'
        onClick={() => onCheckboxClick(task)}
        icon={faTrash}
      />
    </button>

  </li>
);
