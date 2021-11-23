/*
    Created by Nicholas Simon
    nicholas_simon@student.uml.edu
    Last updated: 11/23/2021
    COMP 4610 GUI I
    Mostly completed based off textbook, couldn't figure out how to update values so found out how from here:
    https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field
*/
$(function(){
    $('#xSlider').slider({
        range: true,
        max:50,
        min:-50,
        step:1,
        animate: true,
        values: [0, 0],
        //ui.values contains the array above, so we just update accordingly.
        slide:function(event, ui){
            $('#xmin').val(ui.values[0]);
            $('#xmax').val(ui.values[1]);
            //Need to run a validate because if the ends of the slider are in the same position it didnt error message.
            $("#form").validate().element("#xmax");
            $("#form").validate().element("#xmin");
        }
    });
    $('#ySlider').slider({
        range:true,
        max:50,
        min:-50,
        step:1,
        animate: true,
        values: [0, 0],
        slide:function(event, ui){
            $('#ymin').val(ui.values[0]);
            $('#ymax').val(ui.values[1]);
            $("#form").validate().element("#ymax");
            $("#form").validate().element("#ymin");
        }
    });
});