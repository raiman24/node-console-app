require('colors');

/* 
    _listado:
    {
        'uuid-23124332342-42342': { 'id': 12, 'desc': 'descripcion de la tarea', 'completadoEn': 2132334}   
    }
*/

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];

        Object.keys( this._listado ).forEach( key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    cargarTareas( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {

        console.log();

        this.listadoArr.forEach( (tarea, idx) => {
            const i = `${ idx + 1}`.concat('.').green;
            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${ i } ${ descripcion } :: ${ estado }`);
        }); 

    }

    listarPorEstado( completadas = true ){

       this.listadoArr.filter( tarea => {
            if ( completadas ){ 
                return tarea.completadoEn !== null; 
            }
            return tarea.completadoEn === null;
        }).forEach( (tarea, idx) => {
            const i = `${ idx + 1}`.concat('.').green;
            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn ) ? `${ completadoEn }`.green : 'Pendiente'.red;

            console.log(`${ i } ${ descripcion } :: ${ estado }`);
        });

    }

    borrarTarea ( id = '' ){
        if ( this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ){


        ids.forEach ( id => {
            const tarea = this._listado[id];

            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.filter ( tarea => {
            return !ids.includes( tarea.id );
        }).forEach( ({ id }) => this._listado[id].completadoEn = null );


    }


}

module.exports = Tareas;