beforeEach(function(){

  this.addMatchers({

    toBeXHR : function(){
      function exists(property){ return typeof property !== 'undefined'; };

      return exists(this.actual.complete) &&
             exists(this.actual.done) &&
             exists(this.actual.error) &&
             exists(this.actual.fail) &&
             exists(this.actual.pipe) &&
             exists(this.actual.getAllResponseHeaders) &&
             exists(this.actual.getResponseHeader) &&
             exists(this.actual.setRequestHeader) &&
             exists(this.actual.readyState) &&
             exists(this.actual.progress) &&
             exists(this.actual.promise) &&
             exists(this.actual.then) &&
             exists(this.actual.success) &&
             exists(this.actual.responseText) &&
             exists(this.actual.state) &&
             exists(this.actual.status) &&
             exists(this.actual.statusCode) &&
             exists(this.actual.status) &&
             exists(this.actual.statusText);
    }

  });

});
