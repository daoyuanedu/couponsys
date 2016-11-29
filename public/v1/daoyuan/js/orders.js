// ------------- Function JS -----------------

// Click Search button to search special CouponCode


// ------------- UI JS -----------------

// Order Search Calendar UI
$(document).ready(function(){

    $(function () {
        $('#filer-since').datetimepicker();
        $('#filer-until').datetimepicker({
            useCurrent: false 
        });
        $("#filer-since").on("dp.change", function (e) {
            $('#filer-until').data("DateTimePicker").minDate(e.date);
        });
        $("#filer-until").on("dp.change", function (e) {
            $('#filer-since').data("DateTimePicker").maxDate(e.date);
        });
    });

});