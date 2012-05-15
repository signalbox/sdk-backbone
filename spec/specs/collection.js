suite('SignalBox.Backbone', {

  'context Collection' : {

    before : function(){
      this.klass = SignalBox.Backbone.Collection;
      this.instance = new this.klass;
    },

    'it should parse the standard Signal Box response format correctly' : function(){
      function createModel(name){
        return new SignalBox.Backbone.Model({
          name : name
        });
      };

      var modelA = createModel('testA');
      var modelB = createModel('testB');
      var modelC = createModel('testC');

      var response = {
        query : {
          limit : 100,
          query : 'SELECT *'
        },
        records : [
          modelA.toJSON(),
          modelB.toJSON(),
          modelC.toJSON()
        ]
      };

      var parsed = this.instance.parse(response);

      expect(parsed.length).toEqual(response.records.length);
      expect(parsed[0]).toEqual(response.records[0]);
      expect(parsed[1]).toEqual(response.records[1]);
      expect(parsed[2]).toEqual(response.records[2]);
      expect(this.instance.query).toEqual(response.query);
    }

  }

});
