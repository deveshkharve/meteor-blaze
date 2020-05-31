import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './body.html';
import './task.js';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  console.log('state created', this.state);
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});


Template.task_form.events({
  'submit .new-task'(event) {
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    if(!text) {
      alert('invalid');
      target.text.value = '';
      return;
    }
    
    console.log('insert for', Meteor.userId())
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  }
})

Template.body.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
})