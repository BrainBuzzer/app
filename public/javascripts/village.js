$('#villages-table').Tabledit({
    url: '/admin/updateUser',
    columns: {
        identifier: [0, 'id'],
        editable: [[1, 'village'], [2, 'username'], [3, 'password']]
    },
    inputClass: 'input-control text',
    dangerClass: 'bg-red',
    warningClass: 'bg-yellow',
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