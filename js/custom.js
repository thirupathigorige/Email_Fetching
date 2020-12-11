$( document ).ready(function() {
    $("#loader").hide();
    $("#no-result").hide();
    $("#result").hide();
    $("#second-email-header").hide();
    $(".invalid-email-text").hide();
   

    
});
    
    function getEmailDetails() {
        var email = $("#email").val();
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        if(pattern.test(email)){
            $(".invalid-email-text").hide();
            $("#email").removeAttr("style");
        }else{
            $(".invalid-email-text").show();
            $("#email").attr("style", "border:2px solid #DC0015;");
            return false;
        }
        $("#loader").show();
        $("#page-body").hide();
        $("#email-header").hide();
        $("#second-email-header").show();
        $.ajax({
            type: "GET",
            headers: {
                "charset":"UTF-8",
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Credentials":"true",
              },
            url: "http://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email,
            contentType: "application/json",
            success: function (data) {
                $("#loader").hide();
                $("#email").val('');
                if(data){
                    $("#no-result").hide();
                    $("#result-name").text(data.last_name+" "+data.first_name);
                    $("#result-desc").text(data.description);
                    $("#address-div p").text(data.address);
                    $("#email-result").text(data.email);
                    var phone='';
                    for(var i=0;i<data.phone_numbers;i++){
                        phone+='<p class="phone-number-text">'+data.phone_numbers[i]+'</p>'
                    }
                    $("#phone-number-div").html(phone);
                    var relatives='';
                    for(var j=0;j<data.relatives;j++){
                        relatives+='<p class="result-text-p">'+data.relatives[j]+'</p>'
                    }
                    $("#relatives-div").html(relatives);

                }else{
                    $("#no-result").show();
                }
                console.log("data: " + data);
            },
            error:(er)=>{
                $("#email").val('');
                $("#no-result").show();
                $("#loader").hide();
                console.log("Error", er);
            }
        });
    }
