import { Template } from 'meteor/templating';

import '/imports/lib/topics.js';
import '/imports/lib/posts.js';
// import '/imports/lib/countries.js';

import '/client/main.js';

import '../feed.js';

import { Posts } from '/imports/lib/posts.js';
import { OCADtopics } from '/imports/lib/topics.js';

import { Comments } from '/imports/lib/comments.js';


Session.setDefault("topicname", "General");

Template.general.helpers({

  // if( isPressed){
  //
  //   posts() {
  //
  //     return Posts.find({homecounty: Meteor.user().profile.homecounty});
  //
  //   },
  // }else {
    posts() {
      // return Posts.find();
      return Posts.find({topicname: Session.get("topicname")});
      // return Posts.find({topic: "General"}, {sort: {ts: -1}});
    },
  // }

  topicname: function() {
     return Session.get("topicname");
   },
  //  homecounty:function () {
  //    return Meteor.user().profile.homecounty;
   //
  //  }
});

Template.general.events({
  'submit'(event) {
      // Prevent default browser form submit
      event.preventDefault();
      var isPressed = true;
    },
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
      username:Meteor.user().username,
      topicname: Session.get("topicname"),
      homecounty:Meteor.user().profile.homecounty,
      language: Meteor.user().profile.language,
      university: Meteor.user().profile.university,
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

    // comments: function() {
    // return Comments.find({postId: this._id});
    // }

    // ----comment----

});
