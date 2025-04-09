import { lazy } from "react";

export const LazyMain = lazy(() => import("@/pages/Main"))
export const LazyTabs = lazy(() => import("@/pages/Tabs"))