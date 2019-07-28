let savedBtn = ["007", "wwe", "fails", "cats", "dogs",]

function displayMovieInfo() {

    let movie = $(this).attr("data-name");
    let queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(JSON.stringify(response))
      $("#movies-view").text(JSON.stringify(response));
    });
  }


  function buttonRender (){
    $(".search-btn").empty();
    for (let i=0; i<savedBtn.length; i++){
        let a= $("<button>");
        a.addClass("movie-btn");
        a.attr("data-name", savedBtn[i]);
        a.text(savedBtn[i]);
        $(".search-btn").append(a);
    }
  }




  
  buttonRender();