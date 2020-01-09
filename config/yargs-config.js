/* 
 * Requires
 */
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente una tarea por hacer'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento o tarea por hacer', { descripcion })
    .command('actualizar', 'Actualizar es estado de una tarea', { descripcion, completado })
    .command('borrar', 'Eliminar elementos del listado de tareas por hacer', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}