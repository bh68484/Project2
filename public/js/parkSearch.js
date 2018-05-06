// var db = require("../../models");

$(document).ready(function() {

    var choiceArr = ["#dogPark", "#greenway", "#trails", "#restrooms", "#field"];
    var picks = [];

    $(document).on('click','#parkSearch', function(event){
        console.log("working");

        for (var i = 0; i < choiceArr.length; i++){
            if ($(choiceArr[i]).is(":checked"))
            {
                choiceArr[i] = choiceArr[i].replace('#','');
                picks.push(choiceArr[i]);
            }
        }

        $.post('api/parkSearch', { data: picks}, 
            function(returnedData){
                console.log(returnedData);

                for (var i = 0; i < returnedData.length; i++) {
                    // returnedData[i]
                    var park = $("<div class='park'>");

                    var name = $("<h4>");
                    name.append(returnedData[i].name);

                    var address = $("<p>");
                    address.append("Address: " + returnedData[i].address);

                    park.append(name, address);
                    $("#modal1").append(park);
                }
                
        });

        console.log(picks);

      });
});