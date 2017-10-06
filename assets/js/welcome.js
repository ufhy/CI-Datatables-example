$(document).ready(function() {
	var ajaxUrl = $("#example").data('ajax-url');
	var csrfName = $("#example").data('csrf-name');
	var csrfValue = $("#example").data('csrf-value');

	$('#example').DataTable( {
		"processing": true,
		"serverSide": true,
		"ajax": {
			url: ajaxUrl,
			data: function(d) {
				d.csrf = {
					name: csrfName,
					value: csrfValue
				};
			}
		}
	});
});
