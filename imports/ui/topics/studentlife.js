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


// Session.setDefault("topicname", "Food");

Template.studentlife.helpers({

    posts() {
        return Posts.find({topicname: "Studentlife"},{sort:{createdAt:-1}});
      },

  topicname: function() {
    //  return Session.get("topicname");
    // return OCADtopics.find.fetch({topicname:"Housing"},);
   },
});
