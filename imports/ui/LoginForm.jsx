/* Import(s) */
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

/* * * * * * * * * * * * *
 * * LoginForm component *
 *
 * @description : The user login form
 *
 * @props --------------------------------------------------------------------------------------
 * - task                       => a task
 * - onCheckboxClick            => on checkbox click action
 * - onDeleteClick (bool)       => on delete click action
 * ---------------------------------------------------------------------------------------------
 *
 */
export const LoginForm = () => {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @useState : username = state value, setUsername = method to update username *
  */
  const [username, setUsername] = useState('');
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @useState : password = state value, setPassword = method to update password *
  */
  const [password, setPassword] = useState('');

  /* * * * * * * * * * * * * * * * * * * * * * * *
  * @submit : on submit check username & password *
  */
  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (

    /* * * * * * * * * * *
    * @form : login form *
    */
    <form onSubmit={submit} className="login-form">

      {/* * * * * * * * * * * * * *
      * @username : label & input *
      */}
      <div className="login-form__field">
        <label className="login-form__label" htmlFor="username">Username</label>
        <input
          className="login-form__input"
          type="text"
          placeholder="Your username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* * * * * * * * * * * * * *
      * @passsword : label & input *
      */}
      <div className="login-form__field">
        <label className="login-form__label" htmlFor="password">Password</label>
        <input
          className="login-form__input"
          type="password"
          placeholder="Your password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* * * * * * * * * * * * *
      * @button : submit button *
      */}
      <button className="login-form__submit" type="submit">Log In</button>
      
    </form>

  );
};
