$(document).ready(function(){
    $("#delete_article").click(function(){

        var confirmation = confirm("Are you sure you want to remove the item?");

        if(confirmation) {
            var target = $("#delete_article");

            var id = target.attr('data-id');
    
            var data = {
                id:  target.attr('data-id')
            }
    
            $.ajax({
                type: 'DELETE',
                url: '/api/article',
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(res){
                    window.location.href = '/articles'
                } ,
                error: function(err) {
                    console.log("error in deleing an artilce")
                }
            })

        }
       
    })
})  