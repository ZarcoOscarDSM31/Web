import Data from '../models/sensor.model.js';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const url = 'mongodb://localhost:27017';
const dbName = 'proyect';
const collectionName = 'sensors';
const sensorIP = 'http://192.168.100.41/datos';

async function fetchDataFromSensor() {
  try {
    const response = await fetch(sensorIP);
    const sensorData = await response.json();
    return sensorData;
  } catch (error) {
    console.error('Error al obtener datos del sensor:', error);
    return null;
  }
}

async function insertDataIntoMongoDB(data) {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(data);
    console.log(`Se insertaron ${result.insertedCount} documentos en MongoDB`);

  } catch (error) {
    console.error('Error al insertar datos en MongoDB:', error);
  } finally {
    await client.close();
  }
}

async function main() {
  const sensorData = await fetchDataFromSensor();
  if (sensorData) {
    await insertDataIntoMongoDB(sensorData);
  }
}

// Llamar a la función main() inicialmente
main();

// Programar la ejecución de la función main() cada 15 minutos
setInterval(main, 60000); // 15 minutos * 60 segundos/minuto * 1000 milisegundos/segundo

// Controlador para obtener todos los datos
export const getAllData = async (req, res) => {
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un nuevo dato
export const createData = async (req, res) => {
    const newData = new Data(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
