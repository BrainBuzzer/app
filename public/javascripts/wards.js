$('#wards-table').Tabledit({
    url: '/deleteWard',
    columns: {
        identifier: [0, 'type'],
        editable: []
    },
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
    editButton: false,
    restoreButton: false,
    buttons: {
        delete: {
            class: 'button',
            html: '<span class="mif-bin"></span>',
            action: 'delete'
        },

    }

});
