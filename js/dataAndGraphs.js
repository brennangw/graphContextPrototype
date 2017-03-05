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

function createGraphs() {
        for (var key in data) {
        $("#graphs").append("<canvas id=\"" + key + "\"></canvas>")
        var ctx = $("#" + key).get(0).getContext("2d");
        var activeChart = new Chart(ctx, data[key]);
        $('canvas').hide();
    }
}