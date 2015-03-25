function rate(username, id, up) {
    $.post("/list/rating",{'id': id, 'username': username,'up': up}, null);
}
