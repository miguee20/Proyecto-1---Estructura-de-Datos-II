// orden.ts
export class Orden {
    constructor(
        public empresa: string,
        public cantidad: number,
        public precio: number,
        public tipo: 'compra' | 'venta'
    ) {}
}
