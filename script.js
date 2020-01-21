api_url = "http://javaman.net:8081/lights"

// Credit: https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var syncState = function() {
    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            var state = data.state;
            if (state) {
                $("#on").css({
                    "background-color": "rgb(60, 60, 60)"
                });
                $("#off").css({
                    "background-color": "rgb(50, 50, 50)"
                });
            } else {
                $("#off").css({
                    "background-color": "rgb(60, 60, 60)"
                });
                $("#on").css({
                    "background-color": "rgb(50, 50, 50)"
                });
            }
        }
    });
};

$(document).ready(function() {
    $("#on").click(function() {
        $.ajax({
            url: api_url + "?state=on",
            method: "PUT",
        });
        $(this).blur();
    });                                
    
    $("#off").click(function() {
        $.ajax({
            url: api_url + "?state=off",
            method: "PUT",
        });
        $(this).blur();
    });

    $("#toggle").click(function() {
        $.ajax({
            url: api_url + "?state=toggle",
            method: "PUT",
        });
        $(this).blur();
    });

    var new_state = getUrlParameter("action");
    if (new_state == "on") {
        $("#on").click();
    } else if (new_state == "off") {
        $("#off").click();
    } else if (new_state == "toggle") {
        $("#toggle").click();
    }
    
    syncState();
    setInterval(syncState, 250);
});