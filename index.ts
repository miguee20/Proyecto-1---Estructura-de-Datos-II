import { SimuladorMercado } from './simulador';
import { Orden } from './orden';  

const simulador = new SimuladorMercado();

// ejemplos
simulador.insertarOrdenCompra(new Orden('TechCorp', 100, 120, 'compra'));
simulador.insertarOrdenCompra(new Orden('BioHealth', 200, 90, 'compra'));
simulador.insertarOrdenVenta(new Orden('TechCorp', 50, 115, 'venta'));
simulador.insertarOrdenVenta(new Orden('BioHealth', 100, 85, 'venta'));
simulador.insertarOrdenVenta(new Orden('AutoMotive', 150, 70, 'venta'));

simulador.ejecutarSimulacion();

