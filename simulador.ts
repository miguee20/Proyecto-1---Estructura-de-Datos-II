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
        console.log("  - TechCorp\n  - BioHealth\n  - AutoMotive\n");

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
        // Simulación de transacciones entre el MaxHeap (compras) y MinHeap (ventas)
        while (!this.maxHeap.isEmpty() && !this.minHeap.isEmpty()) {
            const compra = this.maxHeap.getMax();
            const venta = this.minHeap.getMin();

            if (compra.precio >= venta.precio) {
                const cantidadTransaccionada = Math.min(compra.cantidad, venta.cantidad);
                const remanenteCompra = compra.cantidad - cantidadTransaccionada;
                const remanenteVenta = venta.cantidad - cantidadTransaccionada;

                const transaccion = `📄 Transacción: ${compra.empresa} | ${cantidadTransaccionada} acciones | Precio: $${venta.precio}`;
                this.historial.push(transaccion);

                // Remanentes si es necesario
                if (remanenteCompra > 0) {
                    this.maxHeap.insert({...compra, cantidad: remanenteCompra});
                }
                if (remanenteVenta > 0) {
                    this.minHeap.insert({...venta, cantidad: remanenteVenta});
                }

                console.log(`✔️ Transacción realizada: ${cantidadTransaccionada} acciones de ${compra.empresa} a $${venta.precio} por acción.`);
            } else {
                break;
            }
        }

        if (this.maxHeap.isEmpty() || this.minHeap.isEmpty()) {
            console.log("✅ Todas las órdenes procesadas.");
        }
    }
}

    mostrarHistorial() {
        this.registro.mostrarHistorial();
    }
}
