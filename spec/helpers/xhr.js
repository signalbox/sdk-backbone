beforeEach(function(){

  var request = this.request = {};

  this.request.headers = { "Content-Type": "application/json" };
  this.request.xhr = sinon.useFakeXMLHttpRequest();
  this.request.log = [];

  this.request.xhr.onCreate = function(xhr){
    request.last = xhr;
    request.log.push(xhr);
  };

  this.request.respondToLast = function(status, body){
    request.last.respond(status, this.headers, JSON.stringify(body));
  };

  this.addMatchers({

    toHaveURLPart : function(expected){
      var request = this.actual;

      this.message = function () {
        return "Expected " + request.url + " to have URL part " + expected;
      };

      return request.url.indexOf(expected) !== -1;
    }

  });

});

afterEach(function(){

  this.request.xhr.restore();

});
