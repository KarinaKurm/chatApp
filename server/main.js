import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
import '../imports/api/messages.js';
import '../imports/api/rooms.js';
=======
import '../imports/lib/messages.js';
import '../imports/lib/rooms.js';

import { Messages } from '../imports/lib/messages.js';
import { OCADrooms } from '../imports/lib/rooms.js';
>>>>>>> ui

Meteor.startup(() => {
  Messages.remove({});
      OCADrooms.remove({});
      if (OCADrooms.find().count() === 0) {
        ["Default","Kazakhstan", "Korea", "Russia", "Germany"].forEach(function(r) {
          OCADrooms.insert({roomname: r});
        });
      }
    });
