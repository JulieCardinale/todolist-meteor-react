/* Import(s) */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import {
  assert, describe, beforeEach, it,
} from 'chai';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';

if (Meteor.isServer) {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * @info : creating a single task associated with a random userId  different for each test run *
  */
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        TasksCollection.remove({});
        taskId = TasksCollection.insert({
          text: 'Test Task',
          createdAt: new Date(),
          userId,
        });
      });

      /* * * * * * * * * * * * * * * * * * * * * * *
      * @can delete owned task : Test task removal *
      */
      it('can delete owned task', () => {
        mockMethodCall('tasks.remove', taskId, { context: { userId } });
        assert.equal(TasksCollection.find().count(), 0);
      });

      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      * @can't delete task without an user authenticated : need to be authenticated to delete *
      */
      it("can't delete task without an user authenticated", () => {
        const fn = () => mockMethodCall('tasks.remove', taskId);
        assert.throw(fn, /Not authorized/);
        assert.equal(TasksCollection.find().count(), 1);
      });

      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      * @can't delete task from another owner : can only delete my tasks *
      */
      it("can't delete task from another owner", () => {
        const fn = () => mockMethodCall('tasks.remove', taskId, {
          context: { userId: 'somebody-else-id' },
        });
        assert.throw(fn, /Access denied/);
        assert.equal(TasksCollection.find().count(), 1);
      });

      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      * @can change the status of a task : user can check or uncheck a task *
      */
      it('can change the status of a task', () => {
        const originalTask = TasksCollection.findOne(taskId);
        mockMethodCall('tasks.setIsChecked', taskId, !originalTask.isChecked, {
          context: { userId },
        });
        const updatedTask = TasksCollection.findOne(taskId);
        assert.notEqual(updatedTask.isChecked, originalTask.isChecked);
      });

      /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
      * @can insert new tasks : user can add new task in db *
      */
      it('can insert new tasks', () => {
        const text = 'New Task';
        mockMethodCall('tasks.insert', text, {
          context: { userId },
        });
        const tasks = TasksCollection.find({}).fetch();
        assert.equal(tasks.length, 2);
        assert.isTrue(tasks.some((task) => task.text === text));
      });
    });
  });
}
