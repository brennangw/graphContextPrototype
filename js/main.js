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
        var newId = Number($(this)[0]['dataset'].dealershipId);
        $('h1').text("Dealership " + newId);
        $('canvas').hide();
        $('#' + newId).show();
        transitions[currentDealership][newId] += 1;
        var contextDict = {};

        for (let i = 1; i < 5; i++) {
            contextDict[i] = 0;
        }

        // console.log(contextDict);

        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                //transitions from the new frame
                if (i === newId && j !== newId) {
                    contextDict[j] += Number(transitions[i][j]) / 2;
                //transitions to the new frame
                } else if (i !== newId && j === newId) {
                    contextDict[i] += Number(transitions[i][j]);
                }
            }
        }
        //bonus for the frame being tansitioned from.
        contextDict[currentDealership] *= 1.2;

        var contextArr = [];
        for (let i = 1; i < 5; i++) {
            if (i !== newId) {
                contextArr.push({"id": i, "connectionValue": contextDict[i]});
            }
        }

         contextArr.sort(function (a , b) {
            return Number(a['connectionValue']) - Number(b['connectionValue']);
        });

        contextArr.reverse();

        var mostReleventComparison = contextArr[0].id;

        currentDealership = newId;


        //compare the two data sets.




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

