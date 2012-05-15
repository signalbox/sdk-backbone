suite('SignalBox.Backbone', {

  'context Version' : {

    'it should have a version' : function(){
      expect(SignalBox.version.match(/(\d+).(\d+).(\d+)/)).toBeDefined();
    }

  }

});
