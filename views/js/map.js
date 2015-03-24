

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(51.00, 5.00)
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}

function codeAddress() {
    var address = document.getElementById("address").value;
    var markerType = document.getElementById("type").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } 
        else 
        {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


window.onload = loadScript;
