(function () {
  if (window.location.href.indexOf ("/item?") === -1) {
    return;
  }

  $(".comment:first").closest ("table").parent ().closest ("table").addClass ("commentTable");

  $(".commentTable tbody:first").children ().addClass ("commentWrapper");
  
  $ (".commentWrapper").each (function (index, node) {
    var commentHeader = $(node).find (".comhead").parent ();
    commentHeader.addClass ("commentHeader").append ("&nbsp;<a href='javascript:void(0);' class='toggle'>[-]</a>");
    var level = ($(node).find ("img").first ().attr ("width"))*1 / 40;
    $(node).attr ("data_level", level);
    var comment = $(node).find (".comment");
    comment.replaceWith ("<div class='comment'>" + comment.html () + "</div>");
  });

  

  $ (".commentTable").live ("click", function (event) {
    if (!$(event.target).hasClass ("toggle")) {
      return;
    }
    var et = $(event.target),
        tr = et.closest (".commentWrapper"),
        show = tr.hasClass ("closed");
    
    if (!show) {
      tr.addClass ("closed");
      tr.find (".comment").css ("height", "1px");
      var level = tr.attr ("data_level")*1;
      var nextRow = tr.next (".commentWrapper");
      while (nextRow && ((nextRow.attr ("data_level"))*1 > level)) {
        nextRow.hide ();
        nextRow = nextRow.next (".commentWrapper");
      }
    } else {
      tr.removeClass ("closed");
      tr.find (".comment").css ("height", "auto");

      var level = tr.attr ("data_level")*1;
      var nextRow = tr.next (".commentWrapper");
      while (nextRow && ((nextRow.attr ("data_level"))*1 > level)) {
        nextRow.show ();
        nextRow = nextRow.next (".commentWrapper");
      }
    }
  });
  
}) ();
