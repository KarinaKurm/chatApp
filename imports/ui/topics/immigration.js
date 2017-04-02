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

//
// Session.setDefault("topicname", "Immigration");

Template.immigration.helpers({

    posts() {
        return Posts.find({topicname: "Immigration"},{sort:{createdAt:-1}});
      },

  topicname: function() {
    //  return Session.get("topicname");
    // return OCADtopics.find.fetch({topicname:"Housing"},);
   },
});

Template.immigration.events({
    // 'click .filterbyCountry': function(event){
    //   event.preventDefault();
    //   if (isPressed){
    //     var isPressed = false;
    //     console.log(isPressed);
    //   }else {
    //     var isPressed = true;
    //     console.log(isPressed);
    //   }
    //
    //
    //
    // },
});
