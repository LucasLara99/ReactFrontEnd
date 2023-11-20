// ConsultaItem.tsx
import React from 'react';

interface Item {
  id_pais: number;
  nombre_pais: string;
  id_ciudad: number;
  nombre_ciudad: string;
  valor: number;
  descripcion_tipo_jjoo: string | null;
  numero_veces_sede: number;
}

const ConsultaItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <p>{item.id_pais}</p>
      <p>{item.nombre_pais}</p>
      <p>{item.id_ciudad}</p>
      <p>{item.nombre_ciudad}</p>
      <p>{item.valor}</p>
      <p>{item.descripcion_tipo_jjoo}</p>
      <p>{item.numero_veces_sede}</p>
    </div>
  );
};

export default ConsultaItem;