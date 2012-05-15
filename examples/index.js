$(function(){

  // ----------------------------
  // Setup
  // ----------------------------

  SignalBox.setup({
    app      : 'sdk_test',
    username : 'signalboxdemo'
  });

  var User = SignalBox.Backbone.Model.extend({

    resource : 'users'

  });

  var Users = SignalBox.Backbone.Collection.extend({

    model : User,

    resource : 'users'

  });

  // ----------------------------
  // Manipulation
  // ----------------------------

  var users = new Users;

  users.fetch({
    success : function(collection){
      console.log(collection.length + ' users found.')

      var user = new User({
        email : 'someone@example.com',
        name  : 'Josh'
      });

      user.save({}, {
        success : function(model, attributes){
          console.log("created: " + attributes._id);

          user.fetch({
            success : function(model, attributes){
              console.log('found', attributes);

              user.save({ name : 'Done' }, {
                success : function(model, attributes){
                  console.log("updated", attributes);

                  user.destroy({
                    success : function(model){
                      console.log('destroyed: ' + model.get('_id'));
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    error : function(){
      console.log("error", arguments);
    }
  });

});
