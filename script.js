/*
    Created by Nicholas Simon
    nicholas_simon@student.uml.edu
    Last updated: 11/22/2021
*/

var count = 0;
//Based off of Darshan Shah's article "Dynamic jQuery Tabs - Add, Update, Delete And Sorting"
function removeTab(){
    var tabIndex = parseInt(document.getElementById("tabInput").value);
    $("#myTabs").find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
    $("#myTabs").tabs("refresh");
}

function removeTabs(){
    var tabCount = $("#myTabs ul li").length;
    for(tabCount; tabCount >= 0; tabCount--){
        $("#myTabs").find(".ui-tabs-nav li:eq(" + tabCount + ")").remove();
    }
    $("#myTabs").tabs("refresh");
}

function createTable(){
    //If we havent made a tab yet
    $("#myTabs").tabs();

    //Get the variables from the form into the local values
    var x_min = parseInt(document.getElementById("xmin").value);
    var x_max = parseInt(document.getElementById("xmax").value);
    var y_min = parseInt(document.getElementById("ymin").value);
    var y_max = parseInt(document.getElementById("ymax").value);

    count++;

    
    
    var content = "";
    content += "<table border='1px'>";
    //Top left element 
    content += "<th>" + "x" + "</th>";
    //First for loop creates the top row header
    for(i = x_min; i <= x_max; i++){
        content += "<th>" + i + "</th>";
    }
    //line break
    content += "</tr>"; 
    //First loop runs top to bottom
    for(i = y_min; i <= y_max; i++){
        //Need to print the headers for the x values
        content += "<th>" + i + "</th>";
        //Second loop runs left to right
        for(j = x_min; j <= x_max; j++){
            //Print the product
            content += "<th>" + i*j + "</th>";
        }
        content += "</tr>";  
    }
    //Close the table
    content += "</table>";

    $("#myTabs").append(
        "<div id='tab" + count + "'>" + content +  "</div>"
    );
    $("#myTabs ul").append(
        "<li><a href='#tab" + count + "'>" + x_min + ", " + x_max + ", " + y_min + ", " + y_max + "</a></li>"
    );
    $("#myTabs").tabs("refresh");
    $("#mytabs").tabs({
        active:-1
    });
    //Re validate so that error message disapears when a tab is made and index is preselected to be deleted
    $("#removeTab").validate().element("#tabInput");
}