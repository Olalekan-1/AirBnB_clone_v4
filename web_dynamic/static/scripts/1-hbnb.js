/* global $ */

$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    updateSelectedAmenities();
  });

  function updateSelectedAmenities () {
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.selected-amenities').text(amenitiesList);
  }
});
