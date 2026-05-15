import {
    getSpotsRealtimeInitial,
    subscribeToCajonesEstado,
} from "@/services/spots.service";
import { Spot, SpotEstadoBroadcast } from "@/types/spot.types";
import { useEffect, useMemo, useState } from "react";

export function useSpots() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const initial = await getSpotsRealtimeInitial();
        if (!active) return;
        setSpots(initial);
      } catch (e) {
        if (!active) return;
        setError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();

    const unsubscribe = subscribeToCajonesEstado(
      (payload: SpotEstadoBroadcast) => {
        setSpots((prev) =>
          prev.map((s) =>
            s.id === payload.cajon_id ? { ...s, estado: payload.estado } : s,
          ),
        );
      },
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const porZona = useMemo(() => {
    return spots.reduce<Record<string, Spot[]>>((acc, s) => {
      const key = s.zona ?? "Sin zona";
      acc[key] = acc[key] ?? [];
      acc[key].push(s);
      return acc;
    }, {});
  }, [spots]);

  return { spots, porZona, loading, error };
}
