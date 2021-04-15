/* Import(s) */
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* @Meteor.publish : allows the data to be published from the server to the client *
* here we allow user to get his datas *
*/
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
