
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

                for (var i = 0; i < 15; i++) {
                
                    if (returnedData[i].distance == undefined) {
                    
                        returnedData[i].distance = distanceObj.miles;
                    }


                    if(parseInt(returnedData[i].distance) <= parseInt(distanceObj.miles)){
                        console.log(returnedData[i].distance);

                        if($("#results").text() == 'No Results Within Range'){
                            $('#results').empty();
                        }
                        
                        // console.log($("#results").text());
                        $('#searchFunctions').addClass('border');

                        var park = $("<div class='park'>")

                        var name = $("<h4>");
                        name.append(i+1 + '. ' + returnedData[i].name);

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

                        var info = $("<div id='info' class=''>");
                        info.append(name, address, list);

                        var parkbtn = $("<button class='waves-effect waves-light btn' id='parkButton'>");
                        parkbtn.append("Go To Park");

                        var btnDiv = $("<div id='buttonDiv' class='container modal-trigger' data-target='modal1' href='#modal1'>");
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

$("#buttonDiv").click(function(username) {
  $.get("/api/dogs", function(req, res) {
    db.Dogs.findAll({
      where: {
        username: username
      }
    }).then(function(dbDogs) {
      console.log(dbDogs);

      var newLine = $("<p>");
      var newLabel = $("<label>");
      var newInput = $("<input type='checkbox' />");
      var newSpan = $("<span>" + dbDogs.name + "</span>");
      newLabel.attr("for", dbDogs.name);
      newInput.attr("id", dbDogs.name);

      newInput.append(newSpan);
      newLabel.append(newInput);
      newLine.appendI(newLabel);

      $("#dogsToTake").append(newLine);
    });
  });
});

$("#letsGo").click(function(username) {
    console.log('clicked');
  $.get("/findPark2", function(req, res) {
  });
});

});