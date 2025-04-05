import { BrowserRouter, Routes, Route } from "react-router";
import { LazyMain } from "@/components/index.lazy";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/Fallback";
// ДЛЯ АССИНХРОННЫХ ОПЕРАЦИЙ ИСПОЛЬЗОВАТЬ suspense

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
            <Routes>
                <Route index element={<LazyMain />} />
            </Routes>
        </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;