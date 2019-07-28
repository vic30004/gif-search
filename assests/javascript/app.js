let savedBtn = ["007", "wwe", "fails", "cats", "dogs",]

function displayMovieInfo() {



    $(".search-btn").empty();
    for (let i = 0; i < savedBtn.length; i++) {
        let a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", savedBtn[i]);
        a.text(savedBtn[i]);
        $(".search-btn").append(a);
    }
    $(".search-btn").on("click", ".gif-btn", function () {
        $(".gif-section").empty();
        let gifTitle = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifTitle + "&api_key=" + giphyKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            let results = response.data;

            for (let i = 0; i < results.length; i++) {
                let gifDiv = $("<div>");
                let rating = results[i].rating;
                let p = $("<p class='rate'>").text("Rating: " + rating);
                let still = results[i].images.fixed_height_still.url
                let animate = results[i].images.fixed_height.url
                let img = $("<img>");
                img.attr("src", still);
                img.attr("data-still", still);
                img.attr("data-animate", animate)
                img.attr("data-state", "still")
                img.addClass("gif")
                gifDiv.append(p);
                gifDiv.append(img);
                $(".gif-section").prepend(gifDiv);

                $(".gif").on("click", function (e) {
                    e.stopPropagation();
                    let anime = false;
                    let state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        anime = true;
                    } if (anime === false) {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");

                    }
                })
            }
        })
    });
}

$("#add-gif").on("click", function () {
    event.preventDefault();
    let newGif = $("#gif-input").val().trim();
    savedBtn.push(newGif)
    displayMovieInfo()
})
displayMovieInfo()