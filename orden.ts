export class Orden {
    empresa: string;
    cantidad: number;
    precio: number;
    tipo: 'compra' | 'venta';

    constructor(empresa: string, cantidad: number, precio: number, tipo: 'compra' | 'venta') {
        this.empresa = empresa;
        this.cantidad = cantidad;
        this.precio = precio;
        this.tipo = tipo;
    }
}
