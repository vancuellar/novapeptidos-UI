import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const CONTENT = {
  envios: {
    title: 'Envíos y entregas',
    body: ['Realizamos envíos a todo México mediante paqueterías de confianza.', 'Tiempo estimado: 2 a 5 días hábiles según la zona.', 'Envío gratis en compras desde $2,500 MXN; por debajo de ese monto el costo es de $199 MXN.', 'Todos los pedidos se empacan de forma discreta y, cuando aplica, con control de temperatura.'],
  },
  devoluciones: {
    title: 'Devoluciones',
    body: ['Por la naturaleza de los productos (uso en investigación), solo aceptamos devoluciones de artículos con sello intacto dentro de los 7 días posteriores a la recepción.', 'Si tu pedido llegó dañado, contáctanos dentro de las primeras 48 horas con evidencia fotográfica.', 'Escríbenos a hola@novapeptides.mx para iniciar el proceso.'],
  },
  calidad: {
    title: 'Calidad y COA',
    body: ['Cada lote de nuestros péptidos se analiza por HPLC (y MS cuando aplica) para verificar su pureza.', 'Publicamos el número de lote en cada producto y ponemos a disposición el Certificado de Análisis (COA) correspondiente.', 'Para verificar, basta con hacer coincidir el lote impreso en el vial con el del COA.', 'La pureza típica de nuestro catálogo es ≥ 99%.'],
  },
  terminos: {
    title: 'Términos y aviso RUO',
    body: ['Todos los productos vendidos por Nova Peptides son exclusivamente para uso en investigación y desarrollo (RUO).', 'No están destinados al consumo humano ni animal, ni para diagnóstico, tratamiento, cura o prevención de enfermedades.', 'Al realizar una compra, el cliente declara ser un investigador calificado y asume la responsabilidad del manejo y uso de los productos conforme a la normativa aplicable.', 'Nova Peptides no se hace responsable por el uso indebido de los productos.'],
  },
};

const InfoPage = () => {
  const { page } = useParams();
  const data = CONTENT[page] || { title: 'Información', body: ['Página no encontrada.'] };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-6">{data.title}</h1>
      <Card className="p-6 space-y-4">
        {data.body.map((p, i) => <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>)}
      </Card>
      <Link to="/catalogo" className="inline-block mt-6 text-[hsl(var(--primary))] text-sm">← Volver al catálogo</Link>
    </div>
  );
};

export default InfoPage;
