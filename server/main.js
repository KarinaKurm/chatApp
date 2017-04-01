import { Meteor } from 'meteor/meteor';

import '../imports/lib/messages.js';
import '../imports/lib/rooms.js';

import '../imports/lib/posts.js';
import '../imports/lib/topics.js';

import '../imports/lib/comments.js';


import { Messages } from '../imports/lib/messages.js';
import { OCADrooms } from '../imports/lib/rooms.js';

import { Posts } from '../imports/lib/posts.js';
import { OCADtopics } from '../imports/lib/topics.js';

import { Comments } from '../imports/lib/comments.js';

Meteor.startup(() => {



  // Messages.remove({});
  //     OCADrooms.remove({});
      if (OCADrooms.find().count() === 0) {
        ["Default","Kazakhstan", "Korea", "Russia", "Germany"].forEach(function(r) {
          OCADrooms.insert({roomname: r});
        });
      }

      OCADtopics.remove({});
      // Posts.remove({});


         if (OCADtopics.find().count() === 0) {
           ["General","Housing", "Food", "Immigration", "StudentLife"].forEach(function(r) {
             OCADtopics.insert({topicname: r});
           });
         }



    });
