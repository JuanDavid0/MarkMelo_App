export interface Stock {
    referencia: string;
    color: string;
    bodegaLocal: number;
    bodegaZonaFranca: number;
    totalDisponible: number;
    llegadaBodegaLocal: Date | null;
    cantidadTransito: number | null;
    estadoOrden: string;
    id: number;
}