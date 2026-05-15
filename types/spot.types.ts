export type EstadoCajon = "Libre" | "Ocupado";

export type Spot = {
  id: string;
  codigo: string | null;
  zona: string | null;
  estado: EstadoCajon | null;
};

export type SpotEstadoBroadcast = {
  cajon_id: string;
  estado: EstadoCajon | null;
  fecha_entrada?: string | null;
};
