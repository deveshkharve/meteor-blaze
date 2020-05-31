import { Template } from 'meteor/templating';
import '../imports/startup/account-config.js';
import '../imports/ui/body.js';


Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log('body created')
});

Template.body.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});
