import { Template } from 'meteor/templating';

import '/imports/lib/topics.js';
import '/imports/lib/posts.js';
// import '/imports/lib/countries.js';

import '/client/main.js';

import '../feed.js';

import '../styles.css';

import { Posts } from '/imports/lib/posts.js';
import { OCADtopics } from '/imports/lib/topics.js';

import { Comments } from '/imports/lib/comments.js';


Session.setDefault("topicname", "Studentlife");

Template.studentlife.helpers({

    posts() {
        return Posts.find({topicname: "Studentlife"},{sort:{createdAt:-1}});
      },

  topicname: function() {
    //  return Session.get("topicname");
    // return OCADtopics.find.fetch({topicname:"Housing"},);
   },
});

Template.writePostStudent.events({

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
      username:Meteor.user().username,
      topicname: "Studentlife",
      homecounty:Meteor.user().profile.homecounty,
      language: Meteor.user().profile.language,
      university: Meteor.user().profile.university,

      // postId: this._id,

    });
    // Clear form
    target.text.value = '';
    console.log(Meteor.user().username);
    // console.log(userDetails.mycounty);
   // $('.panel-body').scrollTop($('.media-list').height())
 },



});

Template.writePostStudent.helpers({
    'topic': function(){
        return OCADtopics.find({}, {sort: {createdAt: -1}});
    },

    // comments: function() {
    // return Comments.find({postId: this._id});
    // }

    // ----comment----

});
