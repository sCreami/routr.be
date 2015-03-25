function rate(username, id, up) {
    $.post("/list/rating",{'id': id, 'username': username,'up': up}, function(data){
        if(data==='done') alert("ajax success");
    });
}
