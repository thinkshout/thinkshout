casper.test.begin('Basic test', 1, function suite(test) {
  casper.start("./_site/index.html", function() {
    test.assertTitle("Welcome | ThinkShout", "ThinkShout homepage title is the one expected");
  });

  casper.run(function() {
    test.done();
  });
});
