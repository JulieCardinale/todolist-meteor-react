/* Import(s) */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Task } from './Task';

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
export const Tasks = ({ tasks }) => {
  /* * * * * * * * * * * * * * * * * * * * * * * *
  * @toggleChecked : toggle task checkbox status *
  */
  const toggleChecked = ({ _id, isChecked }) => Meteor.call('tasks.setIsChecked', _id, !isChecked);

  /* * * * * * * * * * * * * * * * * * *
  * @deleteTask : delete a task by id *
  */
  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />
      ))}
    </ul>
  );
};
