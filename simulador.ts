// simulador.ts
import { Orden } from './orden'; 
import { MaxHeap } from './maxHeap'; 
import { MinHeap } from './minHeap'; 

export class SimuladorMercado {
    private maxHeap: MaxHeap;
    private minHeap: MinHeap;
    private historial: string[] = [];

    constructor() {
        this.maxHeap = new MaxHeap(10); // Montículo de valores máximos (órdenes de compra)
        this.minHeap = new MinHeap(10); // Montículo de valores mínimos (órdenes de venta)
    }

    // Método para insertar una orden de compra
    public insertarOrdenCompra(orden: Orden): void {
        this.maxHeap.insert(orden);
    }

    // Método para insertar una orden de venta
    public insertarOrdenVenta(orden: Orden): void {
        this.minHeap.insert(orden);
    }

    // Método que simula la ejecución del mercado de acciones
    public ejecutarSimulacion(): void {
        console.log("=".repeat(50));
        console.log("💼 SIMULADOR DE MERCADO DE ACCIONES 💼".padStart(35));
        console.log("=".repeat(50));
        console.log("\n📊 COMPAÑÍAS DISPONIBLES:\n");
        console.log("  - X\n  - Y\n  - Z\n");

        console.log("\n🛒 PROCESANDO ÓRDENES DE COMPRA Y VENTA...\n");
        this.realizarTransacciones();
        
        console.log("\n\n🔍 HISTORIAL DE TRANSACCIONES");
        console.log("=".repeat(50));
        this.historial.forEach(transaccion => {
            console.log(transaccion);
        });
        console.log("=".repeat(50));
    }

    // Método para realizar las transacciones entre compra y venta
    private realizarTransacciones(): void {
        // Crear un mapa para agrupar las órdenes por empresa
        const empresasProcesadas = new Set<string>();
        const ordenesPendientes: Orden[] = [];  // Lista para almacenar órdenes no coincidentes
    
        while (!this.maxHeap.isEmpty() && !this.minHeap.isEmpty()) {
            const compra = this.maxHeap.extractMax();
            const venta = this.minHeap.getMin();
    
            // Verificar si ya se procesó una transacción para esta empresa
            if (empresasProcesadas.has(compra.empresa)) {
                // Si ya se procesó una compra para esta empresa, saltar a la siguiente iteración
                continue;
            }
    
            if (compra.empresa === venta.empresa) {
                // Verificar si los precios permiten realizar la transacción
                if (compra.precio >= venta.precio) {
                    const cantidadTransaccionada = Math.min(compra.cantidad, venta.cantidad);
                    const remanenteCompra = compra.cantidad - cantidadTransaccionada;
                    const remanenteVenta = venta.cantidad - cantidadTransaccionada;
    
                    console.log(`\n🔔 Ocurre una transacción (Compra-Venta):`);
                    console.log(`   ✔️ Empresa: ${compra.empresa}`);
                    console.log(`   🛒 Comprador dispuesto a pagar: $${compra.precio}`);
                    console.log(`   🛍️ Vendedor acepta por: $${venta.precio}`);
                    console.log(`   🔄 Cantidad de acciones intercambiadas: ${cantidadTransaccionada}`);
                    console.log(`   💵 Precio de transacción: $${venta.precio}`);
    
                    const transaccion = `📄 Transacción: ${compra.empresa} | ${cantidadTransaccionada} acciones | Precio: $${venta.precio}`;
                    this.historial.push(transaccion);
    
                    // Manejar remanentes
                    if (remanenteCompra > 0) {
                        this.maxHeap.insert({ ...compra, cantidad: remanenteCompra });
                        console.log(`   ➡️ Cantidad restante para el comprador: ${remanenteCompra}`);
                    }
                    if (remanenteVenta > 0) {
                        this.minHeap.insert({ ...venta, cantidad: remanenteVenta });
                        console.log(`   ➡️ Cantidad restante para el vendedor: ${remanenteVenta}`);
                    }
    
                    console.log(`✔️ Transacción realizada: ${cantidadTransaccionada} acciones de ${compra.empresa} a $${venta.precio} por acción.\n`);
    
                    // Marcar la empresa como procesada para evitar más transacciones de la misma compañía
                    empresasProcesadas.add(compra.empresa);
    
                } else {
                    console.log(`⚠️ No se pudo realizar la transacción. Precio de compra insuficiente: ${compra.precio} < ${venta.precio}`);
                    // Guardar la orden de compra para intentar más adelante
                    ordenesPendientes.push(compra);
                }
            } else {
                // Si las empresas no coinciden, almacenar la orden de compra para procesarla más tarde
                ordenesPendientes.push(compra);
            }
        }
    
        // Reinserta las órdenes no procesadas
        ordenesPendientes.forEach(orden => this.maxHeap.insert(orden));
    
        if (!this.maxHeap.isEmpty() || !this.minHeap.isEmpty()) {
            console.log("⚠️ Algunas órdenes no pudieron procesarse en esta ronda.");
        }
    
        console.log("✅ Todas las órdenes procesadas.");
    }
    
    
}
  
