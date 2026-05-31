import {
  DAY_1_INDEXABLE_ROUTES,
  NEXT_BATCH_INDEXABLE_ROUTES,
  FINAL_BATCH_INDEXABLE_ROUTES,
  SEO_LAUNCH_STAGE,
} from "@/lib/constants";

export function getActiveIndexableRoutes(): readonly string[] {
  if (SEO_LAUNCH_STAGE === "day-1") {
    return DAY_1_INDEXABLE_ROUTES;
  }

  if (SEO_LAUNCH_STAGE === "batch-2") {
    return [
      ...DAY_1_INDEXABLE_ROUTES,
      ...NEXT_BATCH_INDEXABLE_ROUTES,
    ];
  }

  return [
    ...DAY_1_INDEXABLE_ROUTES,
    ...NEXT_BATCH_INDEXABLE_ROUTES,
    ...FINAL_BATCH_INDEXABLE_ROUTES,
  ];
}

export function isRouteIndexable(path: string): boolean {
  return getActiveIndexableRoutes().includes(path);
}
