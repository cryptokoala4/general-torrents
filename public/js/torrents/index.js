$(function(){
  API.getTorrents().then(function (torrents) {
    torrents.forEach(function(torrent){
      var category = torrent.category.toLowerCase();
      var appendTarget = $("table." + category + " > tbody");
      var unformatedDate = new Date(torrent.date)
      var formated = unformatedDate.toDateString();

      var newTr = "<tr class='torrent' data-id='" + torrent._id + "'>" +
                    "<td>" + torrent.name + "</td>" +
                    "<td>" + torrent.submitter + "</td>" +
                    '<td data-toggle="tooltip"  data-placement="top" title="' + torrent.details + '">' +
                      '<img class="comment-icon" src="/images/comment-icon.png">' +
                    "</td>" +
                    "<td>" + formated + "</td>" +
                  "</tr>";
      console.log(newTr);
      // appendTarget.append(newTr);
    })

    $("tr.torrent").on('click', function(e){
      e.preventDefault();
      var id = $(this).data('id');

      window.location.href = "/torrents/" + id;
    })
  }, errorHandling);
});

