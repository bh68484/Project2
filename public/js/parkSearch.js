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

        // for (var i = 0; i < picks.length; i++) {
        //    db.Parks.findOne({
        //     where: {
        //         dogPark: yes
        //     }
        // }).then(function(dbParks) {
        //     console.log(dbParks)
        // });
         
        // }
        // $.get("/api/parks" + authorId, function(data) {
        //   console.log("Posts", data);
        //   posts = data;
        //   if (!posts || !posts.length) {
        //     displayEmpty(author);
        //   }
        //   else {
        //     initializeRows();
        //   }
        // })
        // console.log(picks);

        // $.ajax({
        //     method: "GET",
        //     url: "/api/parkSearch",
        //     data: JSON.stringify(picks)
        // }).then();
        
        $.post('api/parkSearch', { data: picks}, 
            function(returnedData){
                console.log(returnedData);


                var park = $("<div class='park'>");

                var name = $("<h3>");
                name.append(returnedData.name);

                var address = $("<p>");
                address.append("Address: " + returnedData.address);

                var dogpark = $("<p>");
                dogpark.append("DogPark: " + returnedData.dogpark);

                var greenway = $("<p>");
                greenway.append("Greenway Access: " + returnedData.greenwayAcess);

                var field = $("<p>");
                field.append("Multipurpose Field: " + returnedData.field);

                var restrooms = $("<p>");
                restrooms.append("Restrooms: " + returnedData.restrooms);

                park.append(name, address, dogpark, greenway, field, restrooms);
                $("#modal1").append(park);
        });
        // $.get("/api/parkSearch", parks, function(data) {
        //   // parks = data;
        //   // initializeRows();
        // });

        console.log(picks);

      });
});