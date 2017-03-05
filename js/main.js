var transitions = {};
for (var i = 1; i < 5; i++) {
        transitions[i] = {}
        for (var j = 1; j < 5; j++) {
            transitions[i][j] = 0;
        }
    }
var currentDealership = 1;
var firstSelection = true;

$( document ).ready(function() {
    
    createGraphs(); //from dataAndGraphs.js

    $( ".dealershipSelector" ).click(function() {

        //show new graph hide the others.
        var newId = Number($(this)[0]['dataset'].dealershipId);
        $('h1').text("Dealership " + newId);
        $('canvas').hide();
        $('#' + newId).show();

        //the rest of the function is context
        //so the first "transition" should be ignored as 
        //it is not from anything
        if (firstSelection) {
            currentDealership = newId;
            firstSelection = false;
            return;
        }

        //updated the transition table
        transitions[currentDealership][newId] += 1;
        
        
        //get a ranking for other graphs as context
        //based on the TT values.
        

        var contextDict = {};

        for (let i = 1; i < 5; i++) {
            contextDict[i] = 0;
        }


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

        var mostRelevantComparison = contextArr[0].id;

        
        //compare the two data sets.
        //mostReleventComparison and newID
        //to find the biggest diffrence by category between them.
        var biggestDiffDataIndex = {
            'index':0,
            'absDiff': Math.abs(data[newId].data.datasets[0].data[0] - data[mostRelevantComparison].data.datasets[0].data[0]),
            'diff' : data[newId].data.datasets[0].data[0] - data[mostRelevantComparison].data.datasets[0].data[0]
        };

        for (let k = 1; k < data[newId].data.datasets[0].data.length; k++) {
            const diff = data[newId].data.datasets[0].data[k] - data[mostRelevantComparison].data.datasets[0].data[k];
            const absDiff = Math.abs(diff);
            if (absDiff > biggestDiffDataIndex.absDiff) {
                biggestDiffDataIndex.index = k;
                biggestDiffDataIndex.absDiff = absDiff;
                biggestDiffDataIndex.diff = diff;
            }
        }

        //generate messages for the diffrence (this is the "context"). 
        if (biggestDiffDataIndex.absDiff < 12) {
            var string = "Dealership "+ newId + " and dealership " + mostRelevantComparison + " seem about the same."
        } else if (biggestDiffDataIndex.diff < 0) {
            var string = ("Dealership "+ newId + " has a lot less sales for " +
                data[4].data.labels[biggestDiffDataIndex.index] + "s than dealership " + mostRelevantComparison);
        } else {
            var string = ("Dealership "+ newId + " has a lot more sales for " +
            data[4].data.labels[biggestDiffDataIndex.index] + "s than dealership " + mostRelevantComparison);
        }

        $("#contextMessage").text(string);

        currentDealership = newId;
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

