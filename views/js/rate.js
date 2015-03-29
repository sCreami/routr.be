function rate(id,up,that) {
    var $s = $(that).parents('tr').find('td:nth(4)>'),
        p = parseInt( $s.text() );

    $.post("/list/rating", {'id': id, 'up': up})
    .done(function() {
        if(up) {
            p++
            $s.text(p)
        } else {
            p--
            $s.text(p)
        }

        if(p > 0) {
            $s.removeClass('label-warning').addClass('label-info')
        } else {
            $s.removeClass('label-info').addClass('label-warning')
        }
    })
    .fail(function() {
        alert("Vous ne pouvez plus voter pour ce signalement. Peut-être avez vous déjà voté ou vous n'êtes simplement pas connecté");                  
    })
}
