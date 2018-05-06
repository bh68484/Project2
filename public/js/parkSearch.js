// var db = require("../../models");

$(document).ready(function() {

    var choiceArr = ["#dogPark", "#greenwayAcess", "#walkingTrails", "#restrooms", "#field"];
    var picks = [];
    var holder = [];

    $(document).on('click','#parkSearch', function(event){
        console.log("working");

        for (var i = 0; i < choiceArr.length; i++){
            if ($(choiceArr[i]).is(":checked"))
            {   
                holder = [];
                choiceArr[i] = choiceArr[i].replace('#','');
                var choice = "yes";
                // choice = choice.replace(/['"]+/g, '');
                // console.log(choice);
                holder.push(choiceArr[i], choice);
                picks.push(holder);
                // console.log(someStr.replace(/["]+/g, ''));
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
                    // name.append($("<button class='waves-effect waves-light btn'>"));

                    var address = $("<p>");
                    address.append("Address: " + returnedData[i].address);

                    var dogPark = $("<p>");
                    dogPark.append("DogPark: " + returnedData[i].dogpark);

                    var restroom = $("<p>");
                    restroom.append("Restrooms: " + returnedData[i].restrooms);

                    var greenway = $("<p>");
                    greenway.append("GreenwayAccess: " + returnedData[i].greenwayAcess);

                    var field = $("<p>");
                    field.append("Mulitpurpose Field: " + returnedData[i].field);

                    var trails = $("<p>");
                    trails.append("Walking Trails: " + returnedData[i].walkingTrails);

                    park.append(name, address, dogPark, restroom, greenway, field, trails);
                    // $("#title").append(name);
                    $("#results").append(park);
                }
                
        });

        console.log(picks);

      });
});