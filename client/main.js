import './main.html';
import { Template } from 'meteor/templating';
// import '../imports/ui/message.js';
import { Messages } from '../imports/api/messages.js';
import { Rooms } from '../imports/api/rooms.js';

Meteor.subscribe("rooms");
Meteor.subscribe("messages");
Session.setDefault("roomname", "International OCAD");

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
	name: 'home',
  this.render('home');
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
          username: username,
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
        var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(username, email, password);

          Meteor.loginWithPassword(username, email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                Router.go("/chatPage");
            }
            });
        }
});

Template.profileSetUp.events({
    'submit form': function(event){
        event.preventDefault();
        var homecounty = $('[name=homecounty]').val();
        var language = $('[name=language]').val();

        console.log(homecounty);
         console.log(language);

        }

});



 Template.input.events({
     'click .sendMsg': function(e) {
       event.preventDefault();

        _sendMessage();
     },
     'keyup #msg': function(e) {
       event.preventDefault();

       if (e.type == "keyup" && e.which == 13) {
         _sendMessage();
       }
     }
   });

   _sendMessage = function() {
     event.preventDefault();

   var el = document.getElementById("msg");
   Messages.insert({
     user: Meteor.userId().username, msg: el.value, ts: new Date(), room: Session.get("roomname")});
   el.value = "";
   el.focus();
 };

 Template.messages.helpers({
     messages: function() {
       return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
     },
 	roomname: function() {
       return Session.get("roomname");
     }
   });

   Template.message.helpers({
     timestamp: function() {
       return this.ts.toLocaleString();
     }
   });

   Template.rooms.helpers({
       room: function(){
           return Rooms.find({}, {sort: {createdAt: -1}});
       }

   });

   Template.rooms.events({
      'click li': function(e) {
        Session.set("roomname", e.target.innerText);
      }
    });
   Template.addRoom.events({
     'submit form': function(event){
       event.preventDefault();
       var roomName = $('[roomname="roomName"]').val();
       Rooms.insert({
         CreatedBy: Meteor.userId(),
         roommname: roomName,
       });
       $('[roomname="roomName"]').val('');


        // event.preventDefault();
        // var roomName = $('[roomname="roomName"]').val();
        //
        // Rooms.insert({
        //     roomname: roomName,
        //     createdAt: new Date()
        //     // CreatedBy: Meteor.userId(), username:Meteor.user().username,
        // });
        //  $('[roomname="roomName"]').val('');
      }
   });
   Template.room.events({
         'click .delete-room': function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Delete this task?");
        if(confirm){
            OCADrooms.remove({ _id: documentId });
        }
      }

   });
   Template.room.helpers({
     roomstyle: function() {
        return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
      }
   });

   Template.chat.helpers({
     release: function() {
       return Meteor.release;
     }
   });




 //  Template.chat.events({
 //   'submit .new-message'(event) {
 //     // Prevent default browser form submit
 //     event.preventDefault();
 //     // Get value from form element
 //     const target = event.target;
 //     const text = target.text.value;
 //     // Insert a message into the collection
 //     Messages.insert({
 //       text,
 //       createdAt: new Date(), // current time
 // 	     owner: Meteor.userId(), username:Meteor.user().username,
 //     });
 //     // Clear form
 //     target.text.value = '';
 //     // scroll to last message
 //     $('.panel-body').scrollTop($('.media-list').height())
 // },
 // });
