// simulador.ts
import { Orden } from './orden'; 
import { MaxHeap } from './maxHeap'; 
import { MinHeap } from './minHeap'; 

interface EmpresaHeaps {
    maxHeap: MaxHeap;
    minHeap: MinHeap;
}

export class SimuladorMercado {
    private empresasHeaps: Map<string, EmpresaHeaps>;
    private historial: string[] = [];

    constructor() {
        this.empresasHeaps = new Map<string, EmpresaHeaps>();
    }

    public insertarOrdenCompra(orden: Orden): void {
        let empresaHeaps = this.empresasHeaps.get(orden.empresa);
        if (!empresaHeaps) {
            empresaHeaps = { maxHeap: new MaxHeap(10), minHeap: new MinHeap(10) };
            this.empresasHeaps.set(orden.empresa, empresaHeaps);
        }
        empresaHeaps.maxHeap.insert(orden);
    }

    public insertarOrdenVenta(orden: Orden): void {
        let empresaHeaps = this.empresasHeaps.get(orden.empresa);
        if (!empresaHeaps) {
            empresaHeaps = { maxHeap: new MaxHeap(10), minHeap: new MinHeap(10) };
            this.empresasHeaps.set(orden.empresa, empresaHeaps);
        }
        empresaHeaps.minHeap.insert(orden);
    }

    public ejecutarSimulacion(): void {
        console.log("=".repeat(67));
        console.log("💼 BIENVENIDO AL SIMULADOR DE MERCADO DE ACCIONES DE FITECH LABS 💼".padStart(35));
        console.log("=".repeat(67));
        console.log("\n📊 COMPAÑÍAS DISPONIBLES:\n");
        console.log("  - Empresa X\n  - Empresa Y\n  - Empresa Z\n");

        console.log("\n🛒 PROCESANDO ÓRDENES DE COMPRA Y VENTA...\n");
        
        // Procesar transacciones por cada empresa
        this.empresasHeaps.forEach((heaps, empresa) => {
            this.realizarTransacciones(empresa, heaps.maxHeap, heaps.minHeap);
        });

        console.log("\n\n🔍 HISTORIAL DE TRANSACCIONES");
        console.log("=".repeat(56));
        this.historial.forEach(transaccion => {
            console.log(transaccion);
        });
        console.log("=".repeat(56));
    }

    // Método para realizar las transacciones entre compra y venta para una empresa específica
    private realizarTransacciones(empresa: string, maxHeap: MaxHeap, minHeap: MinHeap): void {
        const ordenesPendientes: Orden[] = [];
        let noProcesadas = false;  // Variable para rastrear si hubo órdenes no procesadas

        while (!maxHeap.isEmpty() && !minHeap.isEmpty()) {
            const compra = maxHeap.extractMax();
            const venta = minHeap.getMin();

            // Verificar si los precios permiten realizar la transacción
            if (compra.precio >= venta.precio) {
                const cantidadTransaccionada = Math.min(compra.cantidad, venta.cantidad);
                const remanenteCompra = compra.cantidad - cantidadTransaccionada;
                const remanenteVenta = venta.cantidad - cantidadTransaccionada;

                console.log(`\n🔔 Ocurre una transacción (Compra-Venta):`);
                console.log(`   ✔️ Empresa: ${empresa}`);
                console.log(`   🛒 Comprador dispuesto a pagar: $${compra.precio}`);
                console.log(`   🛍️ Vendedor acepta por: $${venta.precio}`);
                console.log(`   🔄 Cantidad de acciones intercambiadas: ${cantidadTransaccionada}`);
                console.log(`   💵 Precio de transacción: $${venta.precio}`);

                const transaccion = `📄 Transacción: ${empresa} | ${cantidadTransaccionada} acciones | Precio: $${venta.precio}`;
                this.historial.push(transaccion);

                // Mostrar el remanente del comprador
                if (remanenteCompra > 0) {
                    maxHeap.insert({ ...compra, cantidad: remanenteCompra });
                    console.log(`   ➡️ Cantidad restante para el comprador: ${remanenteCompra}`);
                }

                // Mostrar el remanente del vendedor
                if (remanenteVenta > 0) {
                    minHeap.insert({ ...venta, cantidad: remanenteVenta });
                    console.log(`   ➡️ Cantidad restante para el vendedor: ${remanenteVenta}`);
                }

                console.log(`✔️ Transacción realizada: ${cantidadTransaccionada} acciones de ${empresa} a $${venta.precio} por acción.\n`);
            } else {
                console.log(`⚠️ No se pudo realizar la transacción. Precio de compra insuficiente: ${compra.precio} < ${venta.precio}`);
                ordenesPendientes.push(compra);
                noProcesadas = true; 
            }
        }

        // Reinserta las órdenes no procesadas
        ordenesPendientes.forEach(orden => maxHeap.insert(orden));

        if (noProcesadas) {
            console.log(`⚠️ Algunas órdenes no pudieron procesarse para la empresa ${empresa}.`);
        } else {
            console.log(`✅ Todas las órdenes procesadas para ${empresa}.`);
        }
    }
}
