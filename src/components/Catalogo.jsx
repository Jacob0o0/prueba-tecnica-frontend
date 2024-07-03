import React, { useState, useEffect } from 'react';
import axios from 'axios';

// =============== STYLE ==============
import '../styles/index.css';
import Tarjeta from './Tarjeta';

import {truncateDescription} from '../js/utils'


const Catalogo = () => {
    const [contenidos, setContenidos] = useState([]);

    useEffect(() => {
        fetchContenidos();
    }, []);

    const fetchContenidos = async () => {
        try {
            // SE SOLICITA TODOS LOS ARTICULOS SUBIDOS A LA BASE DE DATOS A LA API
            const response = await axios.get('http://localhost:8080/api/Contenidos/listaContenidosPortada');
            setContenidos(response.data);
        } catch (error) {
            console.error('Error fetching contenidos:', error);
        }
    };

    return(
        <div className="max-w-screen w-[100%] pb-10 pt-[100px] flex justify-center bg-azulPrimario">
            <section className='container px-10 flex flex-col items-center justify-center space-y-6' id='cursos'>
                <h3 className='text-3xl font-bold text-white'>Catálogo de contenidos</h3>
                <p className='text-white'>Descubre nuestro contenido más reciente para impulsar tus conocimientos</p>

                <div className='container p-10 flex items-center justify-center bg-white shadow-md rounded-xl'>
                    <div className='w-[100%] grid gap-8 text-sm grid-cols-1 md:grid-cols-3'>
                        {contenidos.slice(0,6).map((contenido) => (
                            <Tarjeta 
                                key={contenido.id}
                                id={contenido.id}
                                titulo={contenido.titulo}
                                thumbnail={contenido.thumbnail}
                                area_conocimiento={contenido.area_conocimiento}
                                descripcion={truncateDescription(contenido.descripcion, 60)}
                                created_at={contenido.created_at}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Catalogo;