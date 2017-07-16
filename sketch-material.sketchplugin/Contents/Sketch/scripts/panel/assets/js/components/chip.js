(function () {
  var tagInputOpitons = {
    width: 490,
    defaultText: 'add a chip',
    removeWithBackspace: true
  }

  var submit = function () {
    var options = {};
    options.string = $('#tags').val().trim();
    options.config = [$('[name="layout"]:checked').val() || 'layout1'].join('|');
    ga('send', 'event', 'chips panel', 'submit', 'chips');
    MDAction('submit', options);
  };

  $('#tags').tagsInput(tagInputOpitons);
  $("#submit").click(submit);
})();
