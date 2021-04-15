/* Import(s) */
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Loader } from './Loader';
import { Header } from './Header';
import { Tasks } from './Tasks';
import { TaskForm } from './TaskForm';
import { FilterButton } from './FilterButton';
import { LoginForm } from './LoginForm';

/* * * * * * * * * *
 * * App component *
 *
 * @description : The main component
 *
 */
export const App = () => {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @useState : hideCompleted is the state value, setHideCompleted is a setter function *
  */
  const [hideCompleted, setHideCompleted] = useState(false);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @hideCompletedFilter : if the user wants to see only pending tasks *
  */
  const hideCompletedFilter = { isChecked: { $ne: true } };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @user : get authenticated user datas or null value *
  */
  const user = useTracker(() => Meteor.user());

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @userFilter : display only the tasks of the logged-in user
  */
  const userFilter = user ? { userId: user._id } : {};

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @pendingOnlyFilter : display only user pending tasks, hide completed tasks *
  */
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @useTracker : useTracker is a React Hook that allows reactivity in React components. * *
  * Every time the data changes through reactivity your component will re-render * * * * * *
  */
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * @tasks : return task from db, hide completed tasks, new tasks first, pending tasks counter *
    */
    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      },
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @pendingTasksTitle : change title with pending tasks number *
  */
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  /* * * * * * * * * * * * *
  * @logout : logout user *
  */
  const logout = () => Meteor.logout();

  return (

    <div className="app">

      {/* * * * * * * * * * * * * * * *
      * @Header : the header component *
      */}
      <Header
        pendingTasksTitle={pendingTasksTitle}
        user={user && user}
        logout={logout}
      />

      <div className="main">
        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        * @info : is user is authenticated display todolist else, display login form *
        */
        user ? (
          <>
            {/* * * * * * * * * * * * * * * * *
            * @TaskForm : task form component *
            */}
            <TaskForm />

            {/* * * * * * * * * * * * * * * *
            * @FilterButton : filter button *
            */}
            <FilterButton
              hideCompleted={hideCompleted}
              setHideCompleted={setHideCompleted}
            />

            {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
            * @isLoading : while the subscription data is not ready we inform the user. *
            */
            isLoading && <Loader />
            }

            {/* * * * * * * * * * *
            * @tasks : all tasks. *
            */}
            <Tasks tasks={tasks} />

          </>
        ) : (

          /* * * * * * * * * * * * * * * * * * * * *
          * @LoginForm : the login form component. *
          */
          <LoginForm />

        )
      }
      </div>
    </div>
  );
};
