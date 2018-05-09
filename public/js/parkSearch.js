
$(document).ready(function() {

    var choiceArr = ["#dogPark", "#greenwayAcess", "#walkingTrails", "#restrooms", "#field"];

    $(document).on('click','#parkSearch', function(event){
        var picks = [];
        var holder = [];

        console.log("working");

        var distance = $("#test5").val();
        var zip = $("#zipCode").val();

        console.log(distance, zip);

        var distanceObj = {
            miles: distance,
            zipCode: zip
        };

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



        $.post('api/parkSearch', {data: picks, distanceObj}, 
            function(returnedData){
                console.log(returnedData);

                for (var i = 0; i < returnedData.length; i++) {

                    console.log(returnedData[i].distance);
                    if (returnedData[i].distance == undefined) {
                        // console.log('fix called');
                        returnedData[i].distance = distanceObj.miles;
                    }

                    // console.log('fixed: ' + returnedData[i].distance);

                    if(parseInt(returnedData[i].distance) <= parseInt(distanceObj.miles)){
                        var park = $("<div class='park'>")

                        var name = $("<h4>");
                        name.append(returnedData[i].name);

                        var address = $("<p>");
                        address.append("- Address: " + returnedData[i].address);

                        var dogPark = $("<li>");
                        dogPark.append("- DogPark: " + returnedData[i].dogpark);

                        var restroom = $("<li>");
                        restroom.append("- Restrooms: " + returnedData[i].restrooms);

                        var greenway = $("<li>");
                        greenway.append("- GreenwayAccess: " + returnedData[i].greenwayAcess);

                        var field = $("<li>");
                        field.append("- Mulitpurpose Field: " + returnedData[i].field);

                        var trails = $("<li>");
                        trails.append("- Walking Trails: " + returnedData[i].walkingTrails);

                        var list = $("<ul class='container'>");
                        list.append(dogPark, restroom, greenway, field, trails);

                        var info = $("<div id='info' class='container'>");
                        info.append(name, address, list);

                        var parkbtn = $("<button class='waves-effect waves-light btn' id='parkButton'>");
                        parkbtn.append("Go To Park");

                        var btnDiv = $("<div id='buttonDiv'>");
                        btnDiv.append(parkbtn);

                        var spacer = $("<div id='spacer'>");
                        park.append(info, btnDiv, spacer);
                        // $("#title").append(name);
                        $("#results").append(park);
                    } else{
                        $("#results").html("No Results Within Range");
                    }
                }
                
            });

        // console.log(picks);

        });
});