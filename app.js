/* 
 * Requires
 */

const argv = require('./config/yargs-config').argv;
const colors = require('colors/safe');
const porHacer = require('./por-hacer/por-hacer');

// Capturar el comando proveniente de la consola
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.creatTarea(argv.descripcion);
        console.log(`Se ha creado la tarea: "`, colors.green(tarea), `"`);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log(`=========\tPor Hacer\t==========`);
            console.log(tarea.descripcion);
            if (tarea.completado) {
                console.log(`Estado:`, colors.green(tarea.completado));
            } else { console.log(`Estado:`, colors.red(tarea.completado)); }
            console.log(`==========================================`);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizarTarea(argv.descripcion, argv.completado);
        console.log(`Resultado: ${actualizado}`);
        break;

    case 'borrar':
        let borrado = porHacer.borrarTarea(argv.descripcion);
        if (borrado) {
            console.log(colors.green(`Se ha borrado la tarea con exito`));
        } else { console.log(colors.red(`Ocurrio un inconveniente y no se ha podido eliminar la tarea`)); }
        break;
    default:
        console.log(`El comando "`, colors.red.inverse(comando), `" no es reconocido`);
        break;
}
// console.log(argv);