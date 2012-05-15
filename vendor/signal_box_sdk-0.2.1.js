(function(exports){

  var self = {
    settings : {},
    version  : '0.2.1',
    host     : "api.getsignalbox.com"
  };

  var DEFAULTS = {
    version : 1,
    https   : false
  };

  var CREDENTIAL_PARAMS = {
    username : 'sb_username',
    app      : 'sb_app_name',
    version  :'sb_version'
  };


  // ----------------------------
  // Request support
  // ----------------------------


  function buildRequestURL(options){
    if(!self.settings.username && !self.settings.app){
      throw new Error('Please call SignalBox.setup before making a request.');
    }

    var protocol    = self.settings.https ? 'https://' : 'http://',
        url         = protocol + self.host + options.url,
        separator   = (url.indexOf('?') === -1) ? '?' : '&',
        credentials = {};

    credentials[CREDENTIAL_PARAMS.username] = self.settings.username;
    credentials[CREDENTIAL_PARAMS.app]      = self.settings.app;
    credentials[CREDENTIAL_PARAMS.version]  = self.settings.version;

    return url + separator + $.param(credentials);
  };

  function setupRequest(xhr, options){
    options.url = buildRequestURL(options);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
  };

  function prepareRequestCallbacks(options){
    var success = options.success || function(){},
        error   = options.error || function(){};

    options.success = function(response, status, xhr){
      success.call(this, response, xhr);
    };

    options.error = function(xhr, status, errorThrown){
      var response = {}

      if(xhr.responseText !== '')
        response = JSON.parse(xhr.responseText);

      error.call(this, response, xhr);
    };

    return options;
  };

  function performRequest(options){
    options = prepareRequestCallbacks(options);
    options.beforeSend = setupRequest;
    options.dataType = 'json';

    return $.ajax(options);
  };

  function encodeResourceParams(params){
    params || (params = {});

    delete params['_id'];

    return JSON.stringify(params)
  };


  // ----------------------------
  // Setup
  // ----------------------------

  self.setup = function(options){
    self.settings = $.extend(DEFAULTS, options);

    return this;
  };


  // ----------------------------
  // Actions
  // ----------------------------


  self.list = function(resource, options){
    var url = '/resources/' + resource;

    if(options.query){
      url = url + "?query=" + this.encodeSBQL(options.query, options.queryReplacements);
    }

    return this.get(url, options);
  };


  self.read = function(resource, id, options){
    options.data = options.params || {};

    return this.get('/resources/' + resource + "/" + id, options);
  };


  self.create = function(resource, options){
    return this.post('/resources/' + resource, options);
  };


  self.update = function(resource, id, options){
    return this.put('/resources/' + resource  + "/" + id, options);
  };


  self.destroy = function(resource, id, options){
    return this.delete('/resources/' + resource  + "/" + id, options);
  };


  // ----------------------------
  // HTTP Verbs
  // ----------------------------


  self.get = function(url, options){
    return performRequest($.extend({
      type : 'GET',
      url  : url
    }, options));
  };


  self.post = function(url, options){
    options.data = encodeResourceParams(options.params);

    return performRequest($.extend({
      type : 'POST',
      url  : url
    }, options));
  };


  self.put = function(url, options){
    options.data = encodeResourceParams(options.params);

    return performRequest($.extend({
      type : 'PUT',
      url  : url
    }, options));
  };


  self.delete = function(url, options){
    return performRequest($.extend({
      type : 'DELETE',
      url  : url
    }, options));
  };


  // ----------------------------
  // Queries and Query Encoding
  // ----------------------------


  self.query = function(query, replacements, options){
    return this.get('/resources?query=' + this.encodeSBQL(query, replacements), options);
  };


  self.encodeSBQL = function(query, replacements){
    replacements = replacements || {};

    query = query.replace(/\{\{([a-zA-Z]+)\}\}/ig, function(substring, match, offset, string){
      return typeof replacements[match] === 'undefined' ? substring : replacements[match];
    });

    return encodeURIComponent(query);
  };


  // ----------------------------
  // Export the SDK
  // ----------------------------


  exports.SignalBox = self;

})(window);
