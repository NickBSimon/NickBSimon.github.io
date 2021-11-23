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
    $.validator.addMethod('goodRange', function(value, element){
        return (value >= -50 && value <= 50);
    }, 'Your input must be an integer between -50 and 50')

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

    $('#form').submit(function(){
        if($(this).valid()){
            createTable();
        }
    })
});