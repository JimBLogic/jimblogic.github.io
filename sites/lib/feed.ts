export type CyberDailySnapshot = {
  above_threshold: number;
  generated_at: string;
  pipeline_status: string;
  qualified_developments: number;
  source_health: { core: { healthy: number; total: number } };
};

export function isCyberDailySnapshot(value: unknown): value is CyberDailySnapshot {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CyberDailySnapshot>;
  const counts = [data.above_threshold, data.qualified_developments,
    data.source_health?.core?.healthy, data.source_health?.core?.total];
  return counts.every((n) => Number.isSafeInteger(n) && Number(n) >= 0) &&
    typeof data.generated_at === "string" && Number.isFinite(Date.parse(data.generated_at)) &&
    typeof data.pipeline_status === "string" && data.pipeline_status.length > 0;
}

export function publicSnapshot(value: CyberDailySnapshot): CyberDailySnapshot {
  return {
    above_threshold: value.above_threshold,
    generated_at: value.generated_at,
    pipeline_status: value.pipeline_status,
    qualified_developments: value.qualified_developments,
    source_health: { core: { healthy: value.source_health.core.healthy, total: value.source_health.core.total } },
  };
}
