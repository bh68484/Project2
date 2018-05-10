
$(document).ready(function() {

    var choiceArr = ["#dogPark", "#greenwayAcess", "#walkingTrails", "#restrooms", "#field"];

    $(document).on('click','#parkSearch', function(event){
        var picks = [];
        var holder = [];
        var distanceObj = {};
        var distance = $("#test5").val();
        var zip = $("#zipCode").val();

        distanceObj = {
            miles: distance,
            zipCode: zip
        };

        for (var i = 0; i < choiceArr.length; i++){
        
            if ($(choiceArr[i]).is(":checked"))
            {   
                $(choiceArr[i]).prop('checked', false);
            
                holder = [];
                choiceArr[i] = choiceArr[i].replace('#','');
                var choice = "yes";
                holder.push(choiceArr[i], choice);
                picks.push(holder);
                choiceArr[i] = choiceArr[i].replace('','#');
            }
        }

        console.log(picks);

        $.post('api/parkSearch', {data: picks, distanceObj}, 
            function(returnedData){
                
                $('#results').empty();
                var dataLength = returnedData.length;

                if(dataLength > 100){
            
                    dataLength = 100;
                    
                    console.log(dataLength);
                }

                for (var i = 0; i < dataLength; i++) {
                
                    if (returnedData[i].distance == undefined) {
                    
                        returnedData[i].distance = distanceObj.miles;
                    }


                    if(parseInt(returnedData[i].distance) <= parseInt(distanceObj.miles)){
                        console.log(returnedData[i].distance);

                        if($("#results").text() == 'No Results Within Range'){
                            $('#results').empty();
                        }
                        
                        // console.log($("#results").text());

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
                    } else if( $('#results').is(':empty') ) {
                        $("#results").append("No Results Within Range");
                    }
                }
            }); 
 
        });

   
});