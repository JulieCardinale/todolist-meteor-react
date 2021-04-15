/* Import(s) */
import { Mongo } from 'meteor/mongo';

/* * * * * * * * * * *
 * * TasksCollection *
 *
 * @description : create a new collection to store our tasks.
 *
 */
export const TasksCollection = new Mongo.Collection('tasks');