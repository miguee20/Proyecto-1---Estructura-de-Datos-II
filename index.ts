// index.ts
import { SimuladorMercado } from './simulador';
import { Orden } from './orden';  

const simulador = new SimuladorMercado();

// Ejemplos de órdenes de compra y venta para cada empresa (X, Y, Z)
simulador.insertarOrdenCompra(new Orden('X', 100, 130, 'compra'));
simulador.insertarOrdenVenta(new Orden('X', 50, 85, 'venta'));

simulador.insertarOrdenCompra(new Orden('Y', 150, 120, 'compra'));
simulador.insertarOrdenVenta(new Orden('Y', 100, 105, 'venta'));

simulador.insertarOrdenCompra(new Orden('Z', 200, 110, 'compra'));
simulador.insertarOrdenVenta(new Orden('Z', 150, 100, 'venta'));


// Ejecutar la simulación
simulador.ejecutarSimulacion();
