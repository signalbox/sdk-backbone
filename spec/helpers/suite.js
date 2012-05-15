// #suite is a helper method to more concisely list
// #describe groups. Example usage:
//
// suite("Examples", {
//
//   "before" : function(){
//     // ... setup
//   },
//
//   "should one" : function(){
//     // ... top level spec
//   },
//
//   "should two" : function(){
//     // ... top level spec
//   }
//
//   "context Nested" : {
//
//     "should one" : function(){
//       // ... nested spec
//     },
//
//     "should two" : function(){
//       // ... nested spec
//     }
//
//   }
//
// });
var SuiteWalker = function(desc, object) {
  var description = desc,
      blocks = object;

  function run() {
    describe(description, function() {
      var key;

      for (key in blocks) {
        var parts = key.split(" "),
            keyword = parts[0],
            block = blocks[key];

        switch (keyword) {

        case 'scenario':
        case 'context':
        case 'describing':
          var desc = parts.slice(1, parts.length).join(" ");
          var walker = new SuiteWalker(desc, block);

          walker.run();
          break;

        case 'before':
          beforeEach(block);
          break;

        case 'after':
          afterEach(block);
          break;

        case 'it':
        case 'should':
          it(key, block);
          break;

        case 'pending':
          xit(key, block);
          break;

        default:
          throw "Can't determine context to call the current keyword '" + keyword + "' in."
          break;

        }
      }
    });
  };

  return {
    run: run
  }
};

var suite = function(desc, blocks) {
  var walker = new SuiteWalker(desc, blocks);

  walker.run();
};
