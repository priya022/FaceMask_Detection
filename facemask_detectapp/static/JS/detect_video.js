  $(document).ready(function() {
     $('[data-toggle="vtooltip"]').tooltip();
               $('[data-toggle="dtooltip"]').tooltip();

     $("#videocapture_div").hide();
     $("#nodata").show();
     $("#videocapture").click(function(e){
              $.ajax({
                    url: '/display_Capturedvideo/',
                    type: 'GET',
                    success: function(data) {
                        data = JSON.parse(data); // converts string of json to object
                        console.log(data.url,'data')
                            $("#nodata").hide();
                         $("video").attr("src",data.url);
                         $("#videocapture_div").show();

                    }
                });

             });
   });