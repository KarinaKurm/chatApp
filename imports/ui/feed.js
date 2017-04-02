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
  },

});

// Template.comment.helpers({
//   createdAt: function() {
//     return new Date(),
//   }
// });

Template.post.helpers({
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  },
});



Template.post.events({

  'click .js-like-button': _.throttle( function( e, t ) {
        e.preventDefault();
        var id = $(e.currentTarget).data( 'id' );
      //get this posts array of likers
      var res = Posts.find( { _id: id}, { likers: 1}).fetch()[0].likers;
      //see if the current user is one of them
      var q = _.find(res, (x) => x == Meteor.userId() );
      //need to disallow same user that liked to like again
      if ( q == Meteor.userId() ) return;
      //otherwise, allow like and save it
      Posts.update( { _id: id },  { $inc: { likes: 1 } ,  $push: { likers:  Meteor.userId() } });
      },
      1000 ),

      'click .show-comments':function(){
        $('.commentbox').toggle();
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

      // postId: this._id,

    });
    // Clear form
    target.text.value = '';
    console.log(Meteor.user().username);
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

Template.mostLiked.helpers({

  posts:function() {
    return Posts.find({topicname: Session.get("topicname")},{ sort: { Likes : -1 }, limit:1 });

  },
});

Template.mostLiked.events({

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
        // username:Meteor.user().emails[0].address,
        username:Meteor.user().username,
        postId: this._id,
        homecounty:Meteor.user().profile.homecounty,
        language: Meteor.user().profile.language,
        university: Meteor.user().profile.university,
      });
      // Clear form
      target.text.value = '';
      // console.log(language);
      // console.log(userDetails.mycounty);
     // $('.panel-body').scrollTop($('.media-list').height())
   },

});
