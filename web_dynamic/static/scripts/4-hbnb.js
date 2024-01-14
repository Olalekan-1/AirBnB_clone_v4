/* global $ */

$(document).ready(function() {
    var selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        updateSelectedAmenities();
    });

    function updateSelectedAmenities() {
        var amenitiesList = Object.values(selectedAmenities).join(', ');
        $('#selected-amenities').text('Selected Amenities: ' + amenitiesList);
    }

    // Check API status on page load
    checkApiStatus();

    function checkApiStatus() {
        $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
            if (data.status === "OK") {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    // Load places from the front-end
    loadPlaces();

    function loadPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: '{}',
            success: function(data) {
                displayPlaces(data);
            }
        });
    }

    function displayPlaces(places) {
        var placesSection = $('.places');
        placesSection.empty();

        places.forEach(function(place) {
            var article = $('<article>').html('<div>' + place.name + '</div>' +
                                              '<div>' + place.price_by_night + '</div>' +
                                              '<div>' + place.max_guest + ' Guests</div>' +
                                              '<div>' + place.number_rooms + ' Bedrooms</div>' +
                                              '<div>' + place.number_bathrooms + ' Bathrooms</div>');
            placesSection.append(article);
        });
    }

    // Search button click event
    $('#search-btn').click(function() {
        searchPlaces();
    });

    function searchPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function(data) {
                displayPlaces(data);
            }
        });
    }
});
