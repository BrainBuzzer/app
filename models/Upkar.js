const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var varshik_mulya_schema = new Schema({
    name: {
        type: String,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    }
})

var veej_kar_schema = new Schema({
    name: {
        type: String,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    },
    from_sqft: {
        type: Number,
        default: 0
    },
    to_sqft: {
        type: Number,
        default: 0
    }
})

var aarogya_kar_schema = new Schema({
    name: {
        type: String,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    },
    from_sqft: {
        type: Number,
        default: 0
    },
    to_sqft: {
        type: Number,
        default: 0
    }
})

var panipatti_schema = new Schema({
    name: {
        type: String,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Upkar', new Schema({
    id: String,
    villageId: Number,
    zopdi_per_thousand: {
        type: Number,
        default: 0
    },
    zopdi_reknar_dar: {
        type: Number,
        default: 0
    },
    vita_per_thousand: {
        type: Number,
        default: 0
    },
    vita_reknar_dar: {
        type: Number,
        default: 0
    },
    cement_per_thousand: {
        type: Number,
        default: 0
    },
    cement_reknar_dar: {
        type: Number,
        default: 0
    },
    rcc_per_thousand: {
        type: Number,
        default: 0
    },
    rcc_reknar_dar: {
        type: Number,
        default: 0
    },
    khulli_jamin_per_thousand: {
        type: Number,
        default: 0
    },
    varshik_mulya: [varshik_mulya_schema],
    veej_kar: [veej_kar_schema],
    aarogya_kar: [aarogya_kar_schema],
    panipatti: [panipatti_schema],
    manora_talghar_rate: {
        type: Number,
        default: 0
    },
    manora_khulli_jaga_normal_rate: {
        type: Number,
        default: 0
    },
    imarat: {
        home_rate: {
            type: Number,
            default: 0
        },
        sadnika: {
            type: Number,
            default: 0
        },
        dukan: {
            type: Number,
            default: 0
        },
        etar: {
            type: Number,
            default: 0
        }
    }
}))