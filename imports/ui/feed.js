import { Template } from 'meteor/templating';

import './feed.html';

import '../lib/posts.js';
import '../lib/topics.js';
// import '../imports/lib/countries.js';

import { OCADtopics } from '../lib/topics.js';
import { Posts } from '../lib/posts.js';
// import { Countries } from '../imports/lib/countries.js';

import '/imports/lib/comments.js';
import { Comments } from '../lib/comments.js';

Template.commentbox.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

// Template.comment.helpers({
//   createdAt: function() {
//     return new Date(),
//   }
// });

Template.post.helpers({

  // homecounty:function () {
  //   return Meteor.user().profile.homecounty;
  //
  // }
});

Template.commentSubmit.events({

  'submit .new-comment'(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
      // Insert a message into the collection
      Comments.insert({
        text,
        createdAt: new Date(), // current time
        owner: Meteor.user(),
        username:Meteor.user().emails[0].address,
        postId: this._id,
      });
      // Clear form
      target.text.value = '';
      console.log(text);
      // console.log(userDetails.mycounty);
     // $('.panel-body').scrollTop($('.media-list').height())
   },

});
