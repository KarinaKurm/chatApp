import { Template } from 'meteor/templating';
 import './homeFeed.html';

 import './post.html';
 import './post.js';

 import { Posts } from '../lib/posts.js';
 import { OCADtopics } from '../lib/topics.js';

// Session.setDefault("topicname", "School");

Template.homeFeed.helpers({
  posts() {
    return Posts.find({topics: Session.get("topicname")}, {sort: {ts: -1}});
  },

  topicname: function() {
     return Session.get("topicname");
   }
});

 Template.homeFeed.events({

});

Template.writeaPost.events({

  'click .topic-button': function(e){
    Session.set("topicname", e.target.innerText);
  },

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
       topicname: Session.get("topicname")
     });
     // Clear form
     target.text.value = '';
     // console.log(Meteor.user().emails[0].address);
    // $('.panel-body').scrollTop($('.media-list').height())
  },


 });

 Template.writeaPost.helpers({
     'topic': function(){
         return OCADtopics.find({}, {sort: {createdAt: -1}});
     },
 });


Template.showTopics.events({

   'click button': function(e) {
     Session.set("topicname", e.target.innerText);

   }


 });

 Template.showTopics.helpers({
     'topic': function(){
         return OCADtopics.find({}, {sort: {createdAt: -1}});
     },
 });




 Template.topicItem.events({

 });

 Template.topicItem.helpers({

  topicstyle: function() {
      return Session.equals("topicname", this.topicname) ? "font-weight: bold" : "";
    }
 });
