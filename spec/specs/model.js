suite('SignalBox.Backbone', {

  'context Model' : {

    before : function(){
      this.klass = SignalBox.Backbone.Model;
      this.instance = new this.klass;
    },

    'it should set the default ID attribute to the Signal Box equivilant' : function(){
      expect(this.instance.idAttribute).toEqual('_id');
    }

  }

});
