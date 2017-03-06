class TTContextEngine {
    constructor(data,ttDiv,size,fromMultiplier, 
    justFromMultiplier, toMultiplier, diffCutOff) {
        this.data = data;
        this.ttDiv = ttDiv;
        this.tt = {};
        this.size = size;
        this.fromMultiplier = fromMultiplier;
        this.justFromMultiplier = justFromMultiplier;
        this.toMultiplier = toMultiplier;
        this.diffCutOff = diffCutOff;
        for (var i = 1; i <= this.size; i++) {
            this.tt[i] = {}
            for (var j = 1; j <= this.size; j++) {
                this.tt[i][j] = 0;
            }
        }
    }
    
    incrementTransition(oldId,newId) {
        this.tt[oldId][newId] += 1;
    }
    
    getContextOrder(oldId, newId) {
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
                    contextDict[j] += Number(this.tt[i][j]) * this.fromMultiplier;
                //transitions to the new frame
                } else if (i !== newId && j === newId) {
                    contextDict[i] += Number(this.tt[i][j]) * this.toMultiplier;
                }
            }
        }
        
        //bonus for the frame being tansitioned from.
        contextDict[oldId] *= this.justFromMultiplier;

        var contextArr = [];
        
        for (let i = 1; i < 5; i++) {
            if (i !== newId) {
                contextArr.push({"id": i, "connectionValue": contextDict[i]});
            }
        }

        contextArr.sort(function (a , b) {
            return Number(a['connectionValue']) - Number(b['connectionValue']);
        });
        
        return contextArr.reverse();
    }
    
    findDiffInData(a,b) {
         //compare the two data sets.
        //mostReleventComparison and newID
        //to find the biggest diffrence by category between them.
        var biggestDiffDataIndex = {
            'index':0,
            'absDiff': Math.abs(this.data[b].data.datasets[0].data[0] - 
                                this.data[a].data.datasets[0].data[0]),
            'diff' : this.data[b].data.datasets[0].data[0] - 
                     this.data[a].data.datasets[0].data[0]
        };

        for (let k = 1; k < this.data[b].data.datasets[0].data.length; k++) {
            const diff = this.data[b].data.datasets[0].data[k] - 
                        this.data[a].data.datasets[0].data[k];
            const absDiff = Math.abs(diff);
            if (absDiff > biggestDiffDataIndex.absDiff) {
                biggestDiffDataIndex.index = k;
                biggestDiffDataIndex.absDiff = absDiff;
                biggestDiffDataIndex.diff = diff;
            }
        }
        
        //generate messages for the diffrence (this is the "context"). 
        if (biggestDiffDataIndex.absDiff < this.diffCutOff) {
            return {"category": null, higher: null, lower: null};
        } else if (biggestDiffDataIndex.diff < 0) {
            return {"category": this.data[1].data.labels[biggestDiffDataIndex.index], 
                    higher: a, 
                    lower: b};
        } else {
            return {"category": this.data[1].data.labels[biggestDiffDataIndex.index], 
                    higher: b, 
                    lower: a};
        }
    }

    //TT methods
    showTT() {
        //makes a table row by row
        $("#" + this.ttDiv).show();
        $("tr").remove();
        var headerRow = "<tr><td>---</td>"
        for (var i = 1; i <= this.size; i++) {
            headerRow += ("<td>" + i + "</td>");
        }
        headerRow += "</tr>";
        $("#ttbody").append(headerRow);
        for (var i = 1; i <= this.size; i++) {
            var row = "<tr><td>"+i+"</td>";
            for (var j = 1; j <= this.size; j++) {
                row += ("<td>" + this.tt[i][j]+ "</td>");
            }
            row += "</tr>";
            $("#ttbody").append(row);
        }
    }
    hideTT() {
        $("#" + this.ttDiv).hide();
    }
    
}