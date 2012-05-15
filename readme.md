# Signal Box Backbone SDK

The Signal Box Backbone SDK provides support for storing Backbone model data in Signal Box by overriding `Backbone.sync`.

The sync implementation relies heavily on the [Signal Box JavaScript SDK](https://github.com/signalbox/sdk-javascript#readme) and uses `jQuery.ajax`.

You'll need [an account](https://manage.getsignalbox.com/sign-up) to communicate with Signal Box. More information can be found on [the Signal Box documentation site](https://docs.getsignalbox.com).


## Contents

* [Setup](#setup)
* [Collections](#collections)
* [Models](#models)


## Setup

Include the SDK and it's dependencies in your page:

```html
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js"></script>
<!-- Add these below -->
<script type="text/javascript" src="http://cdn.getsignalbox.com/sdks/javascript/sdk-0.2.1.js"></script>
<script type="text/javascript" src="http://cdn.getsignalbox.com/sdks/backbone/sdk-0.1.0.js"></script>
```

Be sure to call [`SignalBox.setup`](https://github.com/signalbox/sdk-javascript#setup) before making any calls:

```javascript
SignalBox.setup({
  app      : 'bookmarks',
  username : 'demo'
});
```


## Collections

To create a collection, extend `SignalBox.Backbone.Collection`:

```javascript
var Bookmarks = SignalBox.Backbone.Collection({
  resource : 'bookmarks'
});

Bookmarks.fetch({
  success : function(collection){
    console.log("success: " + collection.length + " records found.");
  }
})
```

The options hash supports any options available with [`SignalBox.list`](https://github.com/signalbox/sdk-javascript#list). If you'd prefer not to extend `SignalBox.Backbone.Collection` you will need to include the `parse` implementation provided with the SDK.


## Models

To create a model, extend `SignalBox.Backbone.Model`:

```javascript
var Bookmark = SignalBox.Backbone.Model.extend({
  resource : 'bookmarks'
});

var b = new Bookmark({
  url : 'https://getsignalbox.com'
});

b.save({}, {
  success : function(model, attributes){
    console.log("created", model.id);
  }
});

b.fetch({
  success : function(model, attributes){
    console.log('found', attributes);
  }
});

b.save({ url : 'https://docs.getsignalbox.com' }, {
  success : function(model, attributes){
    console.log("updated", attributes);
  }
});

b.destroy({
  success : function(model){
    console.log('destroyed', model.id);
  }
});
```

The sync implementation delegates to different [Signal Box JavaScript SDK](https://github.com/signalbox/sdk-javascript#readme) functions depending on the type of operation being performed. The options available for each call can be found as follows:

* `model.save` (new record) delegates to [`SignalBox.create`](https://github.com/signalbox/sdk-javascript#create)
* `model.save` (existing record) delegates to [`SignalBox.update`](https://github.com/signalbox/sdk-javascript#update)
* `model.fetch` delegates to [`SignalBox.read`](https://github.com/signalbox/sdk-javascript#read)
* `model.destroy` delegates to [`SignalBox.destroy`](https://github.com/signalbox/sdk-javascript#destroy)

If you'd prefer not to extend `SignalBox.Backbone.Model` you'll need to set the `idAttribute` to `_id` on your model.


## Specs

Specs are written using Jasmine and Sinon. Running the tests should be as simple as opening `spec/index.html` in your browser.


## Bugs

If you have any problems with the library, please file an [issue](https://github.com/signalbox/sdk-javascript/issues).


## Note on Patches & Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so we don't break it in a future version unintentionally.
* Commit, please do not mess with rakefile, version, or history.
* Send us a pull request.


## Copyright

Copyright (c) 2012 Signal Box <josh@getsignalbox.com>. See LICENSE for details.
