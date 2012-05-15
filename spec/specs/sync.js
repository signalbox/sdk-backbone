suite('SignalBox.Backbone', {

  'context Sync' : {

    before : function(){
      this.modelClass = SignalBox.Backbone.Model.extend({
        resource : 'users'
      });

      this.collectionClass = SignalBox.Backbone.Collection.extend({
        resource : 'users'
      });

      this.sync = SignalBox.Backbone.sync;
      this.collection = new this.collectionClass;
      this.model = new this.modelClass({ name : 'Test', _id : '123456' });

      this.wrapSync = function(method, model, options){
        var sync = this.sync;

        return function(){
          sync.call(SignalBox.Backbone, method, model, options);
        };
      };

      sinon.stub(SignalBox, 'list');
      sinon.stub(SignalBox, 'create');
      sinon.stub(SignalBox, 'read');
      sinon.stub(SignalBox, 'update');
      sinon.stub(SignalBox, 'destroy');
    },

    'it should error if no resource is set on the target model' : function(){
      delete this.modelClass.prototype.resource;
      delete this.collectionClass.prototype.resource;

      expect(this.wrapSync('list', this.model, {})).toThrow('Model or collection must specify a resource.');
      expect(this.wrapSync('list', this.collection, {})).toThrow('Model or collection must specify a resource.');
    },

    'it should create an options object if one does not exist' : function(){
      this.sync('list', this.collection);
      expect(SignalBox.list.getCall(0).args[1]).toEqual({});
    },

    'context List' : {

      'it should trigger list if the calling model object is a collection' : function(){
        this.sync('list', this.collection, {});
        expect(SignalBox.list.called).toBeTruthy();
      },

      'it should trigger list with the resource defined on the collection' : function(){
        this.sync('list', this.collection, {});

        var call = SignalBox.list.getCall(0);

        expect(SignalBox.list.called).toBeTruthy();
        expect(call.args[0]).toEqual(this.collection.resource);
      },

      'it should proxy any user defined options through to SignalBox.list' : function(){
          this.sync('list', this.collection, { option : 'example' });

        var call = SignalBox.list.getCall(0);

        expect(SignalBox.list.called).toBeTruthy();
        expect(call.args[1].option).toEqual('example');
      }

    },

    'context Create' : {

      'it should trigger create using the resource defined on the model' : function(){
        this.sync('create', this.model, {});

        var call = SignalBox.create.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[0]).toEqual(this.model.resource);
      },

      'it should encode the models params' : function(){
        this.sync('create', this.model, {});

        var call = SignalBox.create.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[1].params).toEqual(this.model.toJSON());
      },

      'it should proxy any user defined options through to SignalBox.create' : function(){
        this.sync('create', this.model, { option : 'example' });

        var call = SignalBox.create.getCall(0);

        expect(SignalBox.create.called).toBeTruthy();
        expect(call.args[1].option).toEqual('example');
      }

    },

    'context Read' : {

      'it should trigger read using the resource defined on the model' : function(){
        this.sync('read', this.model, {});

        var call = SignalBox.read.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[0]).toEqual(this.model.resource);
      },

      'it should error should the model not have an ID' : function(){
        this.model.set('_id', null);

        expect(this.wrapSync('read', this.model, {})).toThrow('Model must have an ID to call read');
      },

      'it should call read with the models ID' : function(){
        this.sync('read', this.model, {});

        var call = SignalBox.read.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[1]).toEqual(this.model.id);
      },

      'it should proxy any user defined options through to SignalBox.read' : function(){
        this.sync('read', this.model, { option : 'example' });

        var call = SignalBox.read.getCall(0);

        expect(SignalBox.read.called).toBeTruthy();
        expect(call.args[2].option).toEqual('example');
      }

    },

    'context Update' : {

      'it should trigger update using the resource defined on the model' : function(){
        this.sync('update', this.model, {});

        var call = SignalBox.update.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[0]).toEqual(this.model.resource);
      },

      'it should error should the model not have an ID' : function(){
        this.model.set('_id', null);

        expect(this.wrapSync('update', this.model, {})).toThrow('Model must have an ID to call update');
      },

      'it should call update with the models ID' : function(){
        this.sync('update', this.model, {});

        var call = SignalBox.update.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[1]).toEqual(this.model.id);
      },

      'it should proxy any user defined options through to SignalBox.update' : function(){
        this.sync('update', this.model, { option : 'example' });

        var call = SignalBox.update.getCall(0);

        expect(SignalBox.update.called).toBeTruthy();
        expect(call.args[2].option).toEqual('example');
      },

      'it should encode the models params' : function(){
        this.sync('update', this.model, {});

        var call = SignalBox.update.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[2].params).toEqual(this.model.toJSON());
      }

    },

    'context Delete' : {

      'it should trigger destroy using the resource defined on the model' : function(){
        this.sync('delete', this.model, {});

        var call = SignalBox.destroy.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[0]).toEqual(this.model.resource);
      },

      'it should error should the model not have an ID' : function(){
        this.model.set('_id', null);

        expect(this.wrapSync('delete', this.model, {})).toThrow('Model must have an ID to call delete');
      },

      'it should call destroy with the models ID' : function(){
        this.sync('delete', this.model, {});

        var call = SignalBox.destroy.getCall(0);

        expect(call).toBeDefined();
        expect(call.args[1]).toEqual(this.model.id);
      },

      'it should proxy any user defined options through to SignalBox.destroy' : function(){
        this.sync('delete', this.model, { option : 'example' });

        var call = SignalBox.destroy.getCall(0);

        expect(SignalBox.destroy.called).toBeTruthy();
        expect(call.args[2].option).toEqual('example');
      }

    },

    'context Unknown Method' : {

      'it should error if the method cannot be determined' : function(){
        expect(this.wrapSync('unknown', this.model, {})).toThrow('Could not determine SDK method for: unknown');
      }

    },

    after : function(){
      SignalBox.list.restore();
      SignalBox.create.restore();
      SignalBox.read.restore();
      SignalBox.update.restore();
      SignalBox.destroy.restore();
    }

  }

});
