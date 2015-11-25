$(function(){
  API.getTorrents().then(function (torrents) {
    torrents.forEach(function(torrent){
      var category = torrent.category.toLowerCase();
      var appendTarget = $("table." + category + " > tbody");
      var unformatedDate = new Date(torrent.date)
      var formated = unformatedDate.toDateString();
      var localName = torrent.submitter.local ? torrent.submitter.local.email : null ;
      var fbName = torrent.submitter.fb ? torrent.submitter.fb.firstName : null ;
      var ghName = torrent.submitter.gh ? torrent.submitter.gh.username : null ;
      var submitterName = localName || fbName || ghName || "anonymous";

      var newTr = "<tr class='torrent' data-id='" + torrent._id + "'>" +
                    "<td>" +
                      '<a href="https://s3.amazonaws.com/general-torrents/' + torrent.upload_torrent + '"><img class="comment-icon" src="/images/torrent-dl.png"></a>' +
                    "</td>" +
                    '<td><a href="/torrents/' + torrent._id + '">' + torrent.name + '</a></td>' +
                    "<td>" + submitterName + "</td>" +
                    '<td data-toggle="tooltip"  data-placement="top" title="' + torrent.details + '">' +
                      '<a href="/torrents/' + torrent._id + '"><img class="comment-icon" src="/images/comment-icon.png"></a>' +
                    "</td>" +
                    "<td>" + formated + "</td>" +
                  "</tr>";
      appendTarget.append(newTr);
    })

    // $("tr.torrent").on('click', function(e){
    //   e.preventDefault();
    //   var id = $(this).data('id');

    //   window.location.href = "/torrents/" + id;
    // })
  }, errorHandling);
});

