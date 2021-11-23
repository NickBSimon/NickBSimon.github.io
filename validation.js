/*
    Created by Nicholas Simon
    nicholas_simon@student.uml.edu
    Last updated: 11/23/2021
    COMP 4610 GUI I
    Validates using Jquery validator. I followed a guide on how to use
    the jquery validation plugin from Alex Booker, which can be found here:
    https://www.youtube.com/watch?v=zQUbb2ZtdIc
*/

$(function() {
    //Simply check the range
    $.validator.addMethod('goodRange', function(value, element){
        return (value >= -50 && value <= 50);
    }, 'Must be integer from -50 to 50')
    //Pass a param that is the string attached to the rule, in this case it is the id for the item we need
    //to compare to, parse as an int and we simply check if it is GT or LT
    $.validator.addMethod('lessThan', function(value, element, param){
        var $otherElement = $(param);
        //If statement needed so error wont pop up before the other value is entered in
        if(!$otherElement.val()){
            return true;
        }
        return parseInt(value, 10) < parseInt($otherElement.val(), 10);
    }, 'Your minimum must be less than your maximum')

    $.validator.addMethod('greaterThan', function(value, element, param){
        var $otherElement = $(param);
        //If statement needed so error wont pop up before the other value is entered in
        if(!$otherElement.val()){
            return true;
        }
        return parseInt(value,10) > parseInt($otherElement.val(), 10);
    }, 'Your maximum must be greater than your minimum')
    //Validates if index trying to remove is actually an index
    $.validator.addMethod('validIndex', function(value, element, param){
        var $otherElement = $(param);
        if($otherElement.length > 0 && value >= 0 && value < $otherElement.length){
            return true;
        }
    }, 'Must be a valid index')
    //Rules to validate
    $("#form").validate({
        rules:{
            xmin: {
                required: true,
                goodRange: true,
                lessThan: "#xmax"
            },
            xmax: {
                required: true,
                goodRange: true,
                greaterThan: "#xmin"
            },
            ymin: {
                required: true,
                goodRange: true,
                lessThan: "#ymax"
            },
            ymax: {
                required: true,
                goodRange: true,
                greaterThan: "#ymin"
            }
        }
    });
    $("#removeTab").validate({
        rules:{
            tabInput:{
                required: false,
                digits: true,
                validIndex: "#myTabs ul li"
            }
        }
    });
    //These check when the text box is updated then updates slider accordingly. Also revalidates other min or max from the same
    //letter so that if you correct an error the other one will dissapear too
    $("#xmin").change(function(){
        $("#xSlider").slider('values', 0, $(this).val());
        if($("#xmax").val()){
            $("#form").validate().element("#xmax");
        }
    });
    $("#xmax").change(function(){
        $("#xSlider").slider('values', 1, $(this).val());
        if($("#xmin").val()){
            $("#form").validate().element("#xmin");
        }
    });
    $("#ymin").change(function(){
        $("#ySlider").slider('values', 0, $(this).val());
        if($("#ymax").val()){
            $("#form").validate().element("#ymax");
        }
    });
    $("#ymax").change(function(){
        $("#ySlider").slider('values', 1, $(this).val());
        if($("#ymin").val()){
            $("#form").validate().element("#ymin");
        }
    });
    $('#form').submit(function(){
        if($(this).valid()){
            createTable();
        }
    });
    $('#removeTab').submit(function(){
        if($(this).valid()){
            removeTab();
        }
    });
    $('#removeTabs').click(function(){
        if($(this).valid()){
            removeTabs();
        }
    });
});