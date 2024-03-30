import mongoose from 'mongoose'; 

const sensorSchema = new mongoose.Schema(
    {
        humidity:{
            type: Number,
            required: true,
        },
        temperature:{
            type: Number,
            required: true,
        },
        waterLevel:{
            type: Number,
            required: true,
        },
        lightIntensity: {
            type: Number,
            required: true,
        },
        gasValue: {
            type: Number,
            required: true,
        },
        gasPPM: {
            type: Number,
            required: true,
        },
        gasType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;
