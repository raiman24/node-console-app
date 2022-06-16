
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    if ( leerDB() ) tareas.cargarTareas( leerDB() );

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput( 'Descripción:');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPorEstado();
                break;
            case '4':
                tareas.listarPorEstado( false );
                break;
            case '5':
                const ids = await mostrarCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                }
                break;

        }
    }


        guardarDB( tareas.listadoArr );

        if ( opt !== '0' ) await pausa();

    }while ( opt !== '0');



    // pausa();
}




main();