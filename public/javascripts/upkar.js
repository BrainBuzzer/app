$('#imarat-kar-rate').Tabledit({
    url: '/admin/updateImaratKarRate',
    columns: {
        identifier: [0, 'type'],
        editable: [[2, 'rate_per_thousand'], [3, 'reknar_dar']]
    },
    inputClass: 'input-control text',
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
    deleteButton: false,
    buttons: {
        edit: {
            class: 'button',
            html: '<span class="mif-pencil"></span>',
            action: 'edit'
        },
        save: {
            class: 'button success',
            html: 'Save'
        }
    }

});

$('#varshik-mulya-rate').Tabledit({
    url: '/updateVarshikMulyaRate',
    columns: {
        identifier: [0, 'type'],
        editable: []
    },
    inputClass: 'input-control text',
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
    editButton: false,
    restoreButton: false,
    buttons: {
        edit: {
            class: 'button',
            html: '<span class="mif-pencil"></span>',
            action: 'edit'
        },
        delete: {
            class: 'button',
            html: '<span class="mif-bin"></span>',
            action: 'delete'
        },
        save: {
            class: 'button success',
            html: 'Save'
        },
        restore: {
            class: 'button warning',
            html: 'Restore',
            action: 'restore'
        },
        confirm: {
            class: 'button danger',
            html: 'Confirm'
        }
    }

});


$('#veej-kar-rate').Tabledit({
    url: '/updateVeejKarRate',
    columns: {
        identifier: [0, 'type'],
        editable: []
    },
    inputClass: 'input-control text',
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
    editButton: false,
    restoreButton: false,
    buttons: {
        edit: {
            class: 'button',
            html: '<span class="mif-pencil"></span>',
            action: 'edit'
        },
        delete: {
            class: 'button',
            html: '<span class="mif-bin"></span>',
            action: 'delete'
        },
        save: {
            class: 'button success',
            html: 'Save'
        },
        restore: {
            class: 'button warning',
            html: 'Restore',
            action: 'restore'
        },
        confirm: {
            class: 'button danger',
            html: 'Confirm'
        }
    }

});


$('#aarogya-kar-rate').Tabledit({
    url: '/updateAarogyaKarRate',
    columns: {
        identifier: [0, 'type'],
        editable: []
    },
    inputClass: 'input-control text',
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
    editButton: false,
    restoreButton: false,
    buttons: {
        edit: {
            class: 'button',
            html: '<span class="mif-pencil"></span>',
            action: 'edit'
        },
        delete: {
            class: 'button',
            html: '<span class="mif-bin"></span>',
            action: 'delete'
        },
        save: {
            class: 'button success',
            html: 'Save'
        },
        restore: {
            class: 'button warning',
            html: 'Restore',
            action: 'restore'
        },
        confirm: {
            class: 'button danger',
            html: 'Confirm'
        }
    }

});