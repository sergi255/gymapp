const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter exercise name"]
        },
        description: {
            type: String,
            required: [true, "Enter description name"]
        },
        bodyPart: {
            type: String,
            required: [true, "Enter body part name"]
        },
        exerciseType: {
            type: String,
            required: [true, "Enter type name"]
        },
        email: {
            type: String,
            required: [true, "Missing email"]
        }
    },
    {
        collection: "Exercises",
        timestamps: true
    }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise