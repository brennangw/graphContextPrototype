var data = {};
data[1] = {
    type: 'doughnut',
    data: { labels: [ "F-150", "Mustang", "Flex", "Fusion" ],
            datasets: [
            {
                data: [26, 19, 37, 18],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ],
                hoverBackgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ]
            }]
        },
    option: {
        animation:{
            animateScale:true
        }
    }
};
data[2] = {
    type: 'doughnut',
    data: { labels: [ "F-150", "Mustang", "Flex", "Fusion" ],
        datasets: [
            {
                data: [3, 37, 21, 39],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ],
                hoverBackgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ]
            }]
    },
    option: {
        animation:{
            animateScale:true
        }
    }
};
data[3] = {
    type: 'doughnut',
    data: { labels: [ "F-150", "Mustang", "Flex", "Fusion" ],
        datasets: [
            {
                data: [18, 44, 16, 22],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ],
                hoverBackgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ]
            }]
    },
    option: {
        animation:{
            animateScale:true
        }
    }
};
data[4] = {
    type: 'doughnut',
    data: { labels: [ "F-150", "Mustang", "Flex", "Fusion" ],
        datasets: [
            {
                data: [23, 7, 38, 32],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ],
                hoverBackgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "purple"
                ]
            }]
    },
    option: {
        animation:{
            animateScale:true
        }
    }
};

for (var key in data) {
    $("#graphs").append("<canvas id=\"" + key + "\"></canvas>")
    var ctx = $("#" + key).get(0).getContext("2d");
    var activeChart = new Chart(ctx, data[key]);
    $('canvas').hide();
    $('#' + 1).show();
}


var transitions = {};
for (var i = 1; i < 5; i++) {
    transitions[i] = {}
    for (var j = 1; j < 5; j++) {
        transitions[i][j] = 0;
    }
}
var currentDealership = 1;

$( document ).ready(function() {
    $( ".dealershipSelector" ).click(function() {
        // console.log($(this).dataset["dealershipId"]);
        var id = $(this)[0]['dataset'].dealershipId;
        console.log(id);
        $('h1').text("Dealership " + id);
        $('canvas').hide();
        $('#' + id).show();
        transitions[currentDealership][id] += 1;
        currentDealership = id;
    });

    $( "#TTT" ).click(function() {
        $("#ttdiv").show();
        $("tr").remove();
        var headerRow = "<tr><td>---</td>"
        for (var i = 1; i < 5; i++) {
            headerRow += ("<td>" + i + "</td>");
        }
        headerRow += "</tr>";
        $("#ttbody").append(headerRow);
        for (var i = 1; i < 5; i++) {
            var row = "<tr><td>"+i+"</td>";
            for (var j = 1; j < 5; j++) {
                row += ("<td>" + transitions[i][j]+ "</td>");
            }
            row += "</tr>";
            $("#ttbody").append(row);
        }


    });
    $("#ttdiv").hide();
    $( "#hideTTT" ).click(function() {
        $("#ttdiv").hide();
    });

});

