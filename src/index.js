import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";
import { cargarIdioma, idiomaGuardado, idiomaListo } from "@/i18n/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const pintar = () => root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

// El español viaja DENTRO de este archivo: se pinta al instante, sin esperar a
// nada (`idiomaListo('es-MX')` siempre es cierto). Es el idioma de casi todo el
// tráfico y no se le añade ni un milisegundo.
//
// Si el visitante dejó el sitio en inglés o en portugués, se espera al archivo
// de su idioma ANTES de pintar. Esperar aquí es lo que evita el parpadeo: como
// React todavía no ha tocado #root, en pantalla sigue el pintado previo (el
// título y el precio ya escritos en el HTML) en vez de un armazón en español
// que un instante después salta al inglés. Y el archivo ya suele estar en la
// caché del navegador, porque para tenerlo guardado hubo que bajarlo antes.
//
// Si el archivo del idioma no llegara (sin red, o una versión recién
// publicada), se pinta igual: el sitio sale en español, nunca en blanco.
const idioma = idiomaGuardado();
if (idiomaListo(idioma)) pintar();
else cargarIdioma(idioma).then(pintar, pintar);
