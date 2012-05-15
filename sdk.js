(function(exports){

  var self = {
    version  : '0.1.0'
  };


  // ----------------------------
  // Sync implementation
  // ----------------------------


  self.sync = function(method, model, options){
    options || (options = {});

    if(!model.resource){
      throw new Error('Model or collection must specify a resource.');
    }

    if(model instanceof Backbone.Collection){
      method = 'list';
    }

    if(method === 'create' || method === 'update'){
      options.params = model.toJSON();
    }

    if(_(['read', 'update', 'delete']).indexOf(method) !== -1 && !model.get("_id")){
      throw new Error('Model must have an ID to call ' + method);
    }

    switch(method){

      case 'list':
        // TODO: Query helpers?
        return SignalBox.list(model.resource, options);
      break

      case 'create':
        return SignalBox.create(model.resource, options);
      break

      case 'read':
        return SignalBox.read(model.resource, model.get('_id'), options);
      break;

      case 'update':
        return SignalBox.update(model.resource, model.get('_id'), options);
      break;

      case 'delete':
        return SignalBox.destroy(model.resource, model.get('_id'), options);
      break;

      default:
        throw new Error('Could not determine SDK method for: ' + method);
      break;

    }
  };


  // ----------------------------
  // Model
  // ----------------------------


  self.Model = Backbone.Model.extend({

    idAttribute : '_id'

  });


  // ----------------------------
  // Collection
  // ----------------------------

  self.Collection = Backbone.Collection.extend({

    parse : function(response){
      this.query = response.query;

      return response.records;
    }

  });


  // ----------------------------
  // Override Backbone.sync
  // ----------------------------


  self.previousSync = exports.Backbone.sync;
  exports.Backbone.sync = self.sync;


  // ----------------------------
  // Export the SDK
  // ----------------------------


  if(!exports.SignalBox)
    throw new Error('Please include the Signal Box JavaScript SDK before including the Backbone SDK.');

  exports.SignalBox.Backbone = self;

})(window);
