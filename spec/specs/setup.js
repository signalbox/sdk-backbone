suite('SignalBox.Backbone', {

  'context Setup' : {

    'it should store the previous Backbone.sync reference should the user wish to change it back' : function(){
      expect(SignalBox.Backbone.previousSync).toBe(TestEnvironment.previousSync);
    },

    'it should set Backbone.sync to use the Signal Box implementation' : function(){
      expect(Backbone.sync).toBe(SignalBox.Backbone.sync);
    }

  }

});
