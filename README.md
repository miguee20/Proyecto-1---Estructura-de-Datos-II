# Proyecto #1 Estructura de Datos II

# Simulador de Mercado de Acciones
Este proyecto es un simulador de mercado de acciones que gestiona órdenes de compra y venta de diferentes empresas. Utiliza montículos para priorizar las transacciones, dando preferencia a las órdenes con mejores precios. Las órdenes de compra se organizan en un montículo de máximos, mientras que las órdenes de venta usan un montículo de mínimos. Cuando los precios coinciden, se emparejan de forma automática y se registran las transacciones. El simulador permite a los usuarios experimentar cómo funciona un mercado de valores de manera controlada y educativa.

# Funcionamiento del Simulador de Mercado de Acciones
El simulador gestiona órdenes de compra y venta de acciones para varias empresas, utilizando montículos para optimizar la priorización de las órdenes. En el archivo index.ts, se inicializa el simulador y se insertan órdenes de compra y venta para diferentes empresas (X, Y, Z). Las órdenes de compra se almacenan en un MaxHeap y las de venta en un MinHeap. Luego, se ejecuta la simulación que procesa las transacciones automáticamente cuando los precios de compra y venta coinciden. Las transacciones se registran en un historial, y cualquier remanente de las órdenes no ejecutadas se reinserta en los montículos para futuras transacciones.

El proyecto fue trabajado en archivos separados (6 en total) para poder tener un mejor orden de cada parte del codigo fuente, en el archivo simulador.ts se pueden modificar las empresas disponibles y en el index.ts los ejemplos de uso, aquí 'Empresa X', 100, 130, 'compra' el primer número representa el número de acciones disponibles y el segundo a cuanto se puede llegar a vender o comprar

