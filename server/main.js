import { Meteor } from 'meteor/meteor';
import '../imports/lib/messages.js';
import '../imports/lib/rooms.js';

import { Messages } from '../imports/lib/messages.js';
import { OCADrooms } from '../imports/lib/rooms.js';

Meteor.startup(() => {
  Messages.remove({});
      OCADrooms.remove({});
      if (OCADrooms.find().count() === 0) {
        ["Default","Kazakhstan", "Korea", "Russia", "Germany"].forEach(function(r) {
          OCADrooms.insert({roomname: r});
        });
      }
    });
