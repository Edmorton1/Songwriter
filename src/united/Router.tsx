import { BrowserRouter, Routes, Route } from "react-router";
import { LazyMain } from "@/united/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/united/Fallback";
import "@/css/App.scss"
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function Router() {
  return (
    // <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
            <Routes>
                <Route index element={<LazyMain />} />
            </Routes>
        </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default Router;