import './main.html';
import { Template } from 'meteor/templating';

import '../imports/ui/message.js';
import '../imports/ui/message.html';

import { Messages } from '../imports/lib/messages.js';
import { OCADrooms } from '../imports/lib/rooms.js';

import { Posts } from '../imports/lib/posts.js';
import { OCADtopics } from '../imports/lib/topics.js';

// import { Countries } from '../imports/lib/countries.js';

import '../imports/ui/chat.html';
import '../imports/ui/chat.css';

import '../imports/ui/topics/topicspage.html';
import '../imports/ui/topics/topicspage.css';
import '../imports/ui/topics/topicspage.js';

import '../imports/ui/topics/general.html';
import '../imports/ui/topics/general.js';

import '../imports/ui/feed.html';
import '../imports/ui/feed.css';

Session.setDefault("roomname", "Kazakhstan");





Router.route('/register', function () {
  this.render('register');
});
Router.route('/login', function () {
  this.render('login');
});
Router.route('/chatPage', function () {
  this.render('chatPage');
});

Router.route('/', function () {
	name: 'topicspage',
  this.render('topicspage');
});

Router.route('/general', function () {
  this.render('general');
});


Router.route('/profileSetUp', function () {
  this.render('profileSetUp');
});

Router.configure({
    layoutTemplate: 'main'
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
          // username: username,
          email: email,
          password: password
      }, function(error){
          if(error){
              console.log(error.reason); // Output error if registration fails
          } else {
              Router.go("/profileSetUp"); // Redirect user if registration succeeds
          }
      });
          }
});

Template.profileSetUp.events({
    'submit form': function(event){
        event.preventDefault();
        var homecounty = $('[name=homecounty]').val();
        var language = $('[name=language]').val();

        // Meteor.users.update({_id: this.userId}, {
        //   $set: {
        //     "homecounty": homecounty,
        //     "language": language,
        //   }});

        // Countries.insert({
        //   username:Meteor.user().emails[0].address,
        //   homecounty:Meteor.user().homecounty,
        //   // language:Meteor.user().language,
        // });

        // var userDetails = {
        //     mycounty: homecounty,
        //     mylanguage: language,
        //   };

        console.log(homecounty);
         console.log(language);
         Router.go("/chatPage");
        }

});
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);

          Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                Router.go("/chatPage");
            }
      });
        }

});



 Template.chat.helpers({
   messages() {
     return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
   },
   roomname: function() {
      return Session.get("roomname");
    }
 });

  Template.chat.events({
   'submit .new-message'(event) {
     // Prevent default browser form submit
     event.preventDefault();
     // Get value from form element
     const target = event.target;
     const text = target.text.value;
     // Insert a message into the collection
     Messages.insert({
       text,
       createdAt: new Date(), // current time
 	     owner: Meteor.user(),
       username:Meteor.user().emails[0].address,
       room: Session.get("roomname")
     });
     // Clear form
     target.text.value = '';
     // scroll to last message
     $('.panel-body').scrollTop($('.media-list').height())
     console.log(Meteor.user().emails[0].address);
	},
 });

 Template.showRooms.helpers({
     'room': function(){
         return OCADrooms.find({}, {sort: {createdAt: -1}});
     },
    //  'numRooms': function(){
    //    return OCADrooms.find(),count();
    //    console.log(numRooms);
    //  }
 });
 Template.showRooms.events({
    'click button': function(e) {
      Session.set("roomname", e.target.innerText);

    }


  });

 Template.addRoom.events({
   'submit form': function(event){
      event.preventDefault();
      var room = event.target.roomname.value;
      console.log(room);
      OCADrooms.insert({
          roomname: room,
          createdAt: new Date()
          //CreatedBy: Meteor.userId(), username:Meteor.user().username,
      });
      event.target.roomname.value = '';
    }
 });
 Template.roomItem.events({
       'click .delete-room': function(event){
          event.preventDefault();
          var documentId = this._id;
          var confirm = window.confirm("Delete this task?");
          if(confirm){
              OCADrooms.remove({ _id: documentId });
          }
        }
 });

 Template.roomItem.helpers({
  roomstyle: function() {
      return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
    }
});
