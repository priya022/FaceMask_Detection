 $(document).ready(function() {
          $('[data-toggle="itooltip"]').tooltip();
          $('[data-toggle="vtooltip"]').tooltip();
            $("#uploadimageform").hide();
            $("#video_message").hide();
            $("#video_detect").hide();
             $("#review").hide();
             $("#videocapture_div").hide();

            $("#review").click(function(e)
            {
            $.ajax({
                url: '/display_detectedImage/',
                type: 'GET',
                success: function(data) {
                    data="data:image/png;base64,"+data
                     console.log(data,'sd');
                    $('#maskimage').html('<img src="'+data+ '" /  width="200" height="200">');

                }
            });
            });
            $("#webimage").click(function(e){
               $("#nodata").hide();
               $("#uploadimageform").show();

            });
         $("#videocapture").click(function(e){
          $.ajax({
                url: '/display_Capturedvideo/',
                type: 'GET',
                success: function(data) {
                         console.log(data,'data')
                    data = JSON.parse(data); // converts string of json to object
                    a= window.location.href+'/'+(data.url)
                    console.log(a)
                     $('video > source').attr("src",a);

                }
            });
            $("#videocapture_div").show();
            $("#nodata").hide();
         });
         $('#uploadimageform').submit(function(e) {
         $("#nodata").hide();
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
                    $('#photo').html('<img src="'+data.url+ '" / width="200" height="200">');
                     $("#review").show();
                }
            });



            return false;
        });
     });