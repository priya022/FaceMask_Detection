 $(document).ready(function() {
          $('[data-toggle="utooltip"]').tooltip();
          $('[data-toggle="dtooltip"]').tooltip();
           $('[data-toggle="rtooltip"]').tooltip();
    $("#review").hide();
    $("#review").click(function(e)
    {
        var data =  $('#profile').attr('src');

        $.ajax({
            url: '/display_detectedImage/',
            type: 'GET',
            data: {"sel_img":data},
            success: function(data) {
//                 data = JSON.parse(data);
                 console.log(data,'data in js')
                img_data="data:image/png;base64,"+data
                 console.log(img_data,'sd');
                $('.content').html('<img src="'+img_data+ '" /  width="295px" height="370px">');
//                 $('#masklabel').append(data.label);

            }
        });
    });


     $('#uploadimageform').submit(function(e) {

        alert('image uploaded')
        e.preventDefault();  // disables submit's default action
        var data = new FormData($('#uploadimageform').get(0));
        console.log(data);

        $.ajax({
            url: '/upload/',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data,'data')
                data = JSON.parse(data); // converts string of json to object
                $('#profile').attr('src',data.url);
                $("#profile").width("100%");
                $("#review").show();
            }
        });
        return false;
    });
});