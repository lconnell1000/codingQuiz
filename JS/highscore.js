
const clearEl = document.querySelector("#clearHighScore");
const leaderboardEl = document.querySelector("#highScores")

//obtain highscores from storage and then store them as an object
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

//function to at first show nothing but then as we obtain more highscores will show the data
function renderHighScore(){
    leaderboardEl.innerHTML = "";

    //loops through hS object and shows this as a list on leaderboard
    for (var i = 0; i < highScore.length; i++){
        var high = highScore[i];

        var li = document.createElement("li");
        li.textContent = high.initials + " - " + high.score

        leaderboardEl.appendChild(li)
    }
}

renderHighScore ()

//clear highscore when the clear button is clicked
clearEl.addEventListener("click", function(){
    localStorage.clear();
    high = "";
    leaderboardEl.innerHTML = high
})