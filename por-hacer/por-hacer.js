/**
 * Requires
 */
const fs = require('fs');
const colors = require('colors/safe');

let listadoPorHacer = [];

/* Función para añador tarea por hacer al listado */
const creatTarea = (descripcion) => {
    cargarDB();
    let porHacer = { descripcion, completado: false };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

/* Funcion para guardar tarea creada en el archivo de dataDB */
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) { throw new Error(`No se pudo guardar la data`); }
    });
}

/* Funcion para cargar los datos del archivo dataDB */
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) { listadoPorHacer = []; }
}

/* Funcion para obtener el listado de las taeas por hacer */
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

/* Funcion para actualizar el estado de una tarea por hacer */
const actualizarTarea = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

/* Funcion para eliminar tareas por hacer del listado de tareas */
const borrarTarea = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    creatTarea,
    getListado,
    actualizarTarea,
    borrarTarea
}