// index.ts
import { Orden } from './orden';
import { SimuladorMercado } from './simulador';

// @ts-ignore
const readline = require('readline');

// Configuración para leer desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    const simulador = new SimuladorMercado();
    
    console.log("¡Bienvenido al Simulador de Mercado de Acciones!");
    mostrarMenu(simulador);
}

function mostrarMenu(simulador: SimuladorMercado) {
    console.log("\nPor favor, selecciona una opción:");
    console.log("1. Agregar orden de compra");
    console.log("2. Agregar orden de venta");
    console.log("3. Mostrar historial de transacciones");
    console.log("4. Salir");

    rl.question("Opción: ", (respuesta: string) => {
        const opcion = parseInt(respuesta);
        switch (opcion) {
            case 1:
                agregarOrden(simulador, 'compra');
                break;
            case 2:
                agregarOrden(simulador, 'venta');
                break;
            case 3:
                simulador.mostrarHistorial();
                mostrarMenu(simulador);
                break;
            case 4:
                console.log("Gracias por usar el Simulador de Mercado de Acciones. ¡Hasta pronto!");
                rl.close();
                break;
            default:
                console.log("Opción inválida. Por favor, intenta nuevamente.");
                mostrarMenu(simulador);
        }
    });
}

function agregarOrden(simulador: SimuladorMercado, tipo: 'compra' | 'venta') {
    rl.question("Ingrese el nombre de la empresa: ", (empresa: string) => {
        rl.question("Ingrese la cantidad de acciones: ", (cantidad: string) => {
            rl.question(`Ingrese el precio ${tipo === 'compra' ? 'máximo' : 'mínimo'} por acción: `, (precio: string) => {
                
                const nuevaOrden = new Orden(empresa, parseInt(cantidad), parseFloat(precio), tipo);
                simulador.agregarOrden(nuevaOrden);
                
                console.log(`Orden de ${tipo} agregada exitosamente.`);
                mostrarMenu(simulador);
            });
        });
    });
}

// Ejecutar el simulador
main();
