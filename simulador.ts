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

    // Método para insertar una orden de compra
    public insertarOrdenCompra(orden: Orden): void {
        let empresaHeaps = this.empresasHeaps.get(orden.empresa);
        if (!empresaHeaps) {
            empresaHeaps = { maxHeap: new MaxHeap(10), minHeap: new MinHeap(10) };
            this.empresasHeaps.set(orden.empresa, empresaHeaps);
        }
        empresaHeaps.maxHeap.insert(orden);
    }

    // Método para insertar una orden de venta
    public insertarOrdenVenta(orden: Orden): void {
        let empresaHeaps = this.empresasHeaps.get(orden.empresa);
        if (!empresaHeaps) {
            empresaHeaps = { maxHeap: new MaxHeap(10), minHeap: new MinHeap(10) };
            this.empresasHeaps.set(orden.empresa, empresaHeaps);
        }
        empresaHeaps.minHeap.insert(orden);
    }

    // Método que simula la ejecución del mercado de acciones
    public ejecutarSimulacion(): void {
        console.log("=".repeat(50));
        console.log("💼 SIMULADOR DE MERCADO DE ACCIONES 💼".padStart(35));
        console.log("=".repeat(50));
        console.log("\n📊 COMPAÑÍAS DISPONIBLES:\n");
        console.log("  - X\n  - Y\n  - Z\n");

        console.log("\n🛒 PROCESANDO ÓRDENES DE COMPRA Y VENTA...\n");
        
        // Procesar transacciones por cada empresa
        this.empresasHeaps.forEach((heaps, empresa) => {
            this.realizarTransacciones(empresa, heaps.maxHeap, heaps.minHeap);
        });

        console.log("\n\n🔍 HISTORIAL DE TRANSACCIONES");
        console.log("=".repeat(50));
        this.historial.forEach(transaccion => {
            console.log(transaccion);
        });
        console.log("=".repeat(50));
    }

    // Método para realizar las transacciones entre compra y venta para una empresa específica
    private realizarTransacciones(empresa: string, maxHeap: MaxHeap, minHeap: MinHeap): void {
        const ordenesPendientes: Orden[] = [];

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

                // Manejar remanentes
                if (remanenteCompra > 0) {
                    maxHeap.insert({ ...compra, cantidad: remanenteCompra });
                    console.log(`   ➡️ Cantidad restante para el comprador: ${remanenteCompra}`);
                }
                if (remanenteVenta > 0) {
                    minHeap.insert({ ...venta, cantidad: remanenteVenta });
                    console.log(`   ➡️ Cantidad restante para el vendedor: ${remanenteVenta}`);
                }

                console.log(`✔️ Transacción realizada: ${cantidadTransaccionada} acciones de ${empresa} a $${venta.precio} por acción.\n`);
            } else {
                console.log(`⚠️ No se pudo realizar la transacción. Precio de compra insuficiente: ${compra.precio} < ${venta.precio}`);
                ordenesPendientes.push(compra);
            }
        }

        // Reinserta las órdenes no procesadas
        ordenesPendientes.forEach(orden => maxHeap.insert(orden));

        if (!maxHeap.isEmpty() || !minHeap.isEmpty()) {
            console.log(`⚠️ Algunas órdenes no pudieron procesarse para la empresa ${empresa}.`);
        }

        console.log(`✅ Todas las órdenes procesadas para ${empresa}.`);
    }
}
  
