/*
    Created by Nicholas Simon
    nicholas_simon@student.uml.edu
    Last updated: 10/26/2021
*/


function createTable(){
    //Get the variables from the form into the local values
    var x_min = document.getElementById("xmin").value;
    var x_max = document.getElementById("xmax").value;
    var y_min = document.getElementById("ymin").value;
    var y_max = document.getElementById("ymax").value;
    //Check to make sure that min < max for x and y and alert if not
    if(x_min >= x_max){
        alert("x-max must be greater than x-min");
    }
    else if(y_min >= y_max){
        alert("y-max must be greater than y-min");
    }
    //If all the inputs are valid numbers
    else if (x_min && x_max && y_min && y_max){
        //Going to make out table in a new window
        var opened = window.open("");
        opened.document.write("<html><head><title>filledTable</title><link href='style.css' rel='stylesheet'></head></html>");
        opened.document.writeln("<table border='1px'>");
        //Top left element 
        opened.document.writeln("<th>" + "x" + "</th>");
        //First for loop creates the top row header
        for(i = x_min; i <= x_max; i++){
            opened.document.writeln("<th>" + i + "</th>");
        }
        //line break
        opened.document.writeln("</tr>"); 
        //First loop runs top to bottom
        for(i = y_min; i <= y_max; i++){
            //Need to print the headers for the x values
            opened.document.writeln("<th>" + i + "</th>");
            //Second loop runs left to right
            for(j = x_min; j <= x_max; j++){
                //Print the product
                opened.document.writeln("<th>" + i*j + "</th>");
            }
            opened.document.writeln("</tr>");  
        }
        //Close the table
        opened.document.writeln("</table>");
    }
    return;
}