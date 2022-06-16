const inquirer = require('inquirer');
require('colors');


const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tarea`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            },
        ],
        
    }

];

const pausaOpts = [
    {
        type: 'input',
        name: 'pausa',
        message: `\nPresione ${'ENTER'.green} para continuar\n `
    }
]

const inquirerMenu  = async() => {

    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt( menuOpts );

    return opcion;
}


const pausa = async() => {
    return await inquirer.prompt( pausaOpts );
}


const leerInput = async( message = '') => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ){
                if ( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const  { desc } = await inquirer.prompt( question );

    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    const preguntas =     [
        {
            type: 'list',
            name: 'id',
            message: '¿Qué desea borrar?',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt( preguntas );
    return id;
}

const confirmar = async( message ) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( pregunta );
    return ok;

}

const mostrarCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`,
            checked: ( tarea.completadoEn )? true : false
        }
    });

    const preguntas =     [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt( preguntas );
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarCheckList
}