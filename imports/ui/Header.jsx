/* Import(s) */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

/* * * * * * * * * * *
 * * Header component *
 *
 * @description : The header of the todolist
 *
 * @props ----------------------------------------------
 * - pendingTasksTitle  => Number of pending tasks
 * - user               => user datas
 * - logout             => logout action
 * -----------------------------------------------------
 *
 */
export const Header = ({ pendingTasksTitle, user, logout }) => (
  <header className="header">
    <h1 className="header__title">📝️ To Do<span className="header__pending">{pendingTasksTitle}</span></h1>
    {user && (
      <div className="header__informations">
        <div className="header__user"> {user && user.username} </div>
        <FontAwesomeIcon className="header__logout" icon={faPowerOff} onClick={logout} />
      </div>
    )}
  </header>
);
