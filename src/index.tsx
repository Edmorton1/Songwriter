import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Router from "./united/Router";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

root.render(
    <StrictMode>
        <Router />
    </StrictMode>
)