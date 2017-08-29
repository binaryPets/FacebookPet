var users = ["Hiba Hassani", "Douaa Mimou", "Safaa Abir"];

setInterval(
    function() {
        fbThickerFilter(users);
    }, 5000);


function fbThickerFilter(users) {
    for (i = 0; i < document.getElementsByClassName("fbFeedTickerStory").length; i++) {
        userName = document.getElementsByClassName("fbFeedTickerStory")[i].getElementsByClassName('tickerFeedMessage')[0].getElementsByTagName('span')[0].innerText;
        if (users.indexOf(userName) < 0) {
            document.getElementsByClassName("fbFeedTickerStory")[i].remove();

            console.log("[!] fb FeedTickerStory Removed\nUsername:" + userName);
        }
    }

}
