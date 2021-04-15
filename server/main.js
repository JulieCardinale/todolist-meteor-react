/* Import(s) */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import { users } from './users'
import { tasks } from './tasks'
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

Meteor.startup(() => {

  /* * * * * * * * * * * * * * * *
  * @info : create default users *
  */
  users.forEach(user => {
    if (!Accounts.findUserByUsername(user.username)) {
      Accounts.createUser({
        username: user.username,
        password: user.password,
      });
    };
  });

  /* * * * * * * * * * * * * * * *
  * @info : create default tasks *
  */
  users.forEach(user => {

    const userDatas = Accounts.findUserByUsername(user.username);
    if (TasksCollection.find({userId : userDatas._id}).count() === 0) {
      tasks.forEach(task => {
        TasksCollection.insert({
          text: task.text,
          userId: userDatas._id,
          createdAt: new Date(),
        });
      })
    }
  });

});
