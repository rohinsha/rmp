$(document).ready(function(){
  $('#repair-date').datetimepicker();

    $input = $("#repair-date");
    $input.datetimepicker({
        format: 'dd MM yyyy'
    });

    $input.datetimepicker('show');


});
