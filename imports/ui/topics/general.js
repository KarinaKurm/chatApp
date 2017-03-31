import { Template } from 'meteor/templating';

import '/imports/lib/topics.js';
import '/imports/lib/posts.js';
// import '/imports/lib/countries.js';

import '/client/main.js';

import { Posts } from '/imports/lib/posts.js';
import { OCADtopics } from '/imports/lib/topics.js';

import { Countries } from '/imports/lib/countries.js';

Session.setDefault("topicname", "General");

Template.general.helpers({
  posts() {
    // return Posts.find();
    return Posts.find({topicname: Session.get("topicname")});
    // return Posts.find({topic: "General"}, {sort: {ts: -1}});
  },
  topicname: function() {
     return Session.get("topicname");
   },

  // homecounty:function(){
  //   return userDetails.mycounty;
  // }


});

Template.writePost.events({

'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    // Insert a message into the collection
    Posts.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.user(),
      username:Meteor.user().emails[0].address,
      topicname: Session.get("topicname"),
      // homecounty:Meteor.user().homecounty,
      // language:Meteor.user().language,
    });
    // Clear form
    target.text.value = '';
    console.log(Meteor.user().emails[0].address);
    // console.log(userDetails.mycounty);
   // $('.panel-body').scrollTop($('.media-list').height())
 },

});

Template.writePost.helpers({
    'topic': function(){
        return OCADtopics.find({}, {sort: {createdAt: -1}});
    },
});
