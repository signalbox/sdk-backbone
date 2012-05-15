(function() {

  var env = jasmine.getEnv(),
      reporter = new jasmine.HtmlReporter();

  env.updateInterval = 1000;
  env.addReporter(reporter);

  env.specFilter = function(spec){
    return reporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;

  window.onload = function() {
    if(currentWindowOnload){
      currentWindowOnload();
    }

    env.execute();
  };

})();
