
(function(ufDT, $) {

    var tableEl = null;

    var table = null;

    var primaryId = 'id';

    var rowSelected = [];

    $.extend( true, $.fn.dataTable.defaults, {
        processing: true,
        serverSide: true,
        language: {
            emptyTable: "Tidak ada data ditampilkan",
            info: "Munculkan _START_ sampai _END_ dari _TOTAL_ Baris",
            infoEmpty: "Tidak ada data ditampilkan",
            infoFiltered: "(Pencarian dari _MAX_ total baris)",
            infoPostFix: "",
            thousands: ".",
            lengthMenu: "_MENU_",
            search: "",
            searchPlaceholder: "Pencarian",
            zeroRecords: "Tidak ada data ditampilkan.",
            paginate: {
                first: "Pertama",
                previous: "<i class='zmdi zmdi-chevron-left'></i>",
                next: "<i class='zmdi zmdi-chevron-right'></i>",
                last: "Terakhir"
            }
        },
        autoWidth: false,
        createdRow: function (row) {
            $(row).find('td').map(function (index, cell) {
                var title = table.column(index).header();
                $(cell).attr('data-title', $(title).attr('data-title'));
            });
        }
    });

    ufDT.updateSelectAllDT = function () {
        var node = table.table().node();
        var $chkboxAll = $('tbody input[type="checkbox"]', node);
        var $chkboxChecked = $('tbody input[type="checkbox"]:checked', node);
        var chkboxSelectAll = $('thead input[name="select_all"]', node).get(0);

        // If none of the checkboxes are checked
        if($chkboxChecked.length === 0) {
            chkboxSelectAll.checked = false;
            if ('indeterminate' in chkboxSelectAll) {
                chkboxSelectAll.indeterminate = false;
            }
        }
        else if ($chkboxChecked.length === $chkboxAll.length) {
            chkboxSelectAll.checked = true;
            if ('indeterminate' in chkboxSelectAll) {
                chkboxSelectAll.indeterminate = false;
            }
        }
        else {
            chkboxSelectAll.checked = true;
            if('indeterminate' in chkboxSelectAll){
                chkboxSelectAll.indeterminate = true;
            }
        }
    };

    ufDT.btnEditDisabled = function () {
        $('.edit-button-dt')
            .prop('disabled', true)
            .addClass('disabled');
    };

    ufDT.btnEditEnabled = function () {
        $('.edit-button-dt')
            .prop('disabled', false)
            .removeClass('disabled');
    };

    ufDT.btnDeleteDisabled = function () {
        $('.delete-button-dt')
            .prop('disabled', true)
            .addClass('disabled');
    };

    ufDT.btnDeleteEnabled = function () {
        $('.delete-button-dt')
            .prop('disabled', false)
            .removeClass('disabled');
    };

    ufDT.getRowSelected = function () {
        return rowSelected;
    };

    ufDT.getTable = function () {
        return table;
    }

    ufDT.init = function (element, options, primaryField) {
        tableEl = element;
        primaryId = primaryField;
        table = $(element).DataTable(options);

        $(element).trigger('ufDT.init');

        ufDT.btnEditDisabled();
        ufDT.btnDeleteDisabled();

        // select all
        $('thead input[name="select_all"]', tableEl).on('click', function (e) {
            if(this.checked){
                $('tbody input[type="checkbox"]:not(:checked)', tableEl).trigger('click');
            } else {
                $('tbody input[type="checkbox"]:checked', tableEl).trigger('click');
            }

            e.stopPropagation();
        });

        // checkbox on rows
        $(tableEl + ' tbody').on('click', 'input[type="checkbox"]', function(e){
            var $row = $(this).closest('tr');
            var data = table.row($row).data();
            var rowId = data[primaryId];
            var index = $.inArray(rowId, rowSelected);

            if(this.checked && index === -1) {
                rowSelected.push(rowId);
            }
            else if (!this.checked && index !== -1){
                rowSelected.splice(index, 1);
            }

            if(this.checked){
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }

            ufDT.updateSelectAllDT();

            if (rowSelected.length === 1) {
                ufDT.btnEditEnabled();
                ufDT.btnDeleteEnabled();
            }
            else if (rowSelected.length > 1) {
                ufDT.btnEditDisabled();
                ufDT.btnDeleteEnabled();
            }
            else {
                ufDT.btnEditDisabled();
                ufDT.btnDeleteDisabled();
            }

            e.stopPropagation();
        });

        $(tableEl + ' tbody').on( 'click', '.edit-action', function () {
            var target = $(tableEl).data('edit-target');
            var data = table.row($(this).parents('tr')).data();

            window.open(target + '/' + data[primaryId], '_self');
        });

        $(tableEl + ' tbody').on( 'click', '.delete-action', function () {
            var confirmTitle = $(tableEl).data('delete-confirm-title'),
                confirmText = $(tableEl).data('delete-confirm-text'),
                target = $(tableEl).data('delete-target'),
								data = table.row($(this).parents('tr')).data();
								
						alert('konfirmasi aksi delete yang berada di dalam baris table');
        });

        table.on('draw', function(){
            // Update state of "Select all" control
            ufDT.updateSelectAllDT();
            rowSelected = [];
        });

        $('.edit-button-dt').on('click', function (e) {
            e.preventDefault();

            if (rowSelected.length < 1)
                return false;

            var target = $(tableEl).data('edit-target');
            window.open(target + '/' + rowSelected[0], '_self');
        });

        $('.delete-button-dt').on('click', function (e) {
            e.preventDefault();

            if (rowSelected.length < 1)
                return false;

            var confirmTitle = $(tableEl).data('delete-confirm-title'),
                confirmText = $(tableEl).data('delete-confirm-text'),
                target = $(tableEl).data('delete-target');

								alert('konfirmasi aksi delete data');
        });
    };

})(window.ufDT = window.ufDT || {}, jQuery);
