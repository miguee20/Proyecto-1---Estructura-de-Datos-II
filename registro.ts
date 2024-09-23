// registro.ts
export class RegistroTransacciones {
    private historial: any[] = [];

    registrarTransaccion(empresa: string, cantidad: number, precio: number, comprador: string, vendedor: string) {
        const transaccion = {
            empresa,
            cantidad,
            precio,
            comprador,
            vendedor,
            fecha: new Date(),
        };
        this.historial.push(transaccion);
    }

    mostrarHistorial() {
        console.log("Historial de transacciones:");
        this.historial.forEach((transaccion, index) => {
            console.log(`${index + 1}. ${transaccion.empresa} - ${transaccion.cantidad} acciones a $${transaccion.precio} cada una (comprador: ${transaccion.comprador}, vendedor: ${transaccion.vendedor}) en ${transaccion.fecha}`);
        });
    }
}
