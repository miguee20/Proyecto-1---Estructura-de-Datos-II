// simulador.ts
import { Orden } from './orden';
import { MaxHeap, MinHeap } from './heap';
import { RegistroTransacciones } from './registro';

export class SimuladorMercado {
    private compras: MaxHeap = new MaxHeap();
    private ventas: MinHeap = new MinHeap();
    private registro: RegistroTransacciones = new RegistroTransacciones();

    agregarOrden(orden: Orden) {
        if (orden.tipo === 'compra') {
            this.compras.insert(orden);
        } else {
            this.ventas.insert(orden);
        }
        this.procesarOrdenes();
    }

    procesarOrdenes() {
        let mejorCompra = this.compras.peek();
        let mejorVenta = this.ventas.peek();

        while (mejorCompra && mejorVenta && mejorCompra.precio >= mejorVenta.precio) {
            const cantidadTransaccion = Math.min(mejorCompra.cantidad, mejorVenta.cantidad);
            const precioTransaccion = mejorVenta.precio;

            // Registrar transacción
            this.registro.registrarTransaccion(
                mejorCompra.empresa,
                cantidadTransaccion,
                precioTransaccion,
                mejorCompra.tipo,
                mejorVenta.tipo
            );

            // Actualizar cantidades
            mejorCompra.cantidad -= cantidadTransaccion;
            mejorVenta.cantidad -= cantidadTransaccion;

            // Remover órdenes si se han completado
            if (mejorCompra.cantidad === 0) this.compras.extractMax();
            if (mejorVenta.cantidad === 0) this.ventas.extractMin();

            // Verificar las siguientes órdenes
            mejorCompra = this.compras.peek();
            mejorVenta = this.ventas.peek();
        }
    }

    mostrarHistorial() {
        this.registro.mostrarHistorial();
    }
}
