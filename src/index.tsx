import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Router from "./united/Router";
import { preloadSound } from "@/scripts/sound";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
preloadSound()

root.render(
    <StrictMode>
        <Router />
    </StrictMode>
)