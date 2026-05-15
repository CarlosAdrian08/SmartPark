import { Spot, SpotEstadoBroadcast } from "@/types/spot.types";
import { supabase } from "@/utils/supabase";

type FetchResult = Spot[];

export async function getSpotsRealtimeInitial(): Promise<FetchResult> {
  const { data, error } = await supabase
    .from("cajon")
    .select("id, codigo, zona, estado:estado_cajon(nombre)")
    .order("zona", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((r: any) => ({
    id: r.id,
    codigo: r.codigo,
    zona: r.zona,
    estado: r.estado?.nombre ?? null,
  }));
}

export function subscribeToCajonesEstado(
  onMessage: (payload: SpotEstadoBroadcast) => void,
) {
  // Canal para el tablero
  const channel = supabase.channel("cajones:tablero");

  channel.on("broadcast", { event: "cajon_estado_actualizado" }, (msg: any) => {
    const payload = (msg?.payload ?? msg) as SpotEstadoBroadcast;
    if (!payload?.cajon_id) return;
    onMessage(payload);
  });

  channel.subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
