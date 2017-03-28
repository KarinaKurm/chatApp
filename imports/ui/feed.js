import { Template } from 'meteor/templating';

import '../imports/ui/feed.html';

import '../imports/lib/posts.js';
import '../imports/lib/topics.js';

import { OCADtopics } from '../imports/lib/topics.js';
import { Posts } from '../imports/lib/posts.js';


// Session.setDefault("topicname", "Food");

//  Template.writePost.events({
//
//  'submit .new-post'(event) {
//      // Prevent default browser form submit
//      event.preventDefault();
//      // Get value from form element
//      const target = event.target;
//      const text = target.text.value;
//      // Insert a message into the collection
//      Posts.insert({
//        text,
//        createdAt: new Date(), // current time
//        owner: Meteor.user(),
//        username:Meteor.user().emails[0].address,
//        topicname: Session.get("topicname")
//      });
//      // Clear form
//      target.text.value = '';
//      // console.log(Meteor.user().emails[0].address);
//     // $('.panel-body').scrollTop($('.media-list').height())
//   },
//
// });
//
// Template.writePost.helpers({
//      'topic': function(){
//          return OCADtopics.find({}, {sort: {createdAt: -1}});
//      },
//  });
