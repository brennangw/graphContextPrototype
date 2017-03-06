var currentDealership = 1;
var firstSelection = true;



$( document ).ready(function() {
    var ttce = new TTContextEngine(data,"ttdiv",4,0.5, 1.0, 1.25,12);
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
        ttce.incrementTransition(currentDealership,newId);
        
        var contextArr = ttce.getContextOrder(currentDealership, newId);

        var mostRelevantComparison = contextArr[0].id;
        
        var dataDiffResult = ttce.findDiffInData(newId, mostRelevantComparison);
        
        var contextString = "";
        
        
        if (dataDiffResult['category'] === null) {
            contextString = "Dealership " + newId + 
            " is about the same as dealership " + mostRelevantComparison; 
        } else if (dataDiffResult.higher === newId) {
             contextString = "Dealership " + dataDiffResult.higher + " sells  more " +  
             dataDiffResult.category + "s than dealership " + dataDiffResult.lower;
        } else {
            contextString = "Dealership " + dataDiffResult.lower + " sells less " +  
             dataDiffResult.category + "s than dealership " + dataDiffResult.higher;
        }
    
        $("#contextMessage").text(contextString);

        //update the current dealership id. 
        currentDealership = newId;
    });
    
    //showing and hiding the TT based on buttons
    //this is mainly for developers and not for users.
    //which is why it is still part of the engine
    ttce.hideTT();
    $( "#TTT" ).click(function() {
        ttce.showTT();
    });
    $( "#hideTTT" ).click(function() {
        ttce.hideTT();
    });

});

