// heap.ts
import { Orden } from './orden';

// MaxHeap (compras) y MinHeap (ventas) usando arrays
export class MaxHeap {
    private heap: Orden[] = [];

    insert(orden: Orden) {
        this.heap.push(orden);
        this.heap.sort((a, b) => b.precio - a.precio);  // Ordenar por precio en orden descendente
    }

    extractMax(): Orden | null {
        return this.heap.length > 0 ? this.heap.shift() || null : null;
    }

    peek(): Orden | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

export class MinHeap {
    private heap: Orden[] = [];

    insert(orden: Orden) {
        this.heap.push(orden);
        this.heap.sort((a, b) => a.precio - b.precio);  // Ordenar por precio en orden ascendente
    }

    extractMin(): Orden | null {
        return this.heap.length > 0 ? this.heap.shift() || null : null;
    }

    peek(): Orden | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}
