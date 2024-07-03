import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {palabrasClave} from '../js/utils'
import {quitarComillas} from '../js/utils'

function Publicacion() {
    // ID obtenido por la ruta
    const { id } = useParams(); 
    const [contenido, setContenido] = useState({
        titulo:             '',
        palabras_clave:     '',
        area_conocimiento:  '',
        tipo_contenido:     '',
        imagen_portada:     '',
        thumbnail:          '',
        descripcion:        '',
        contenido:          ''
    });
    const [letras, setLetras] = useState([]);

    useEffect(() => {
        if (id) {
            // SE SOLICITA LA PUBLICACIÓN A LA API REST
            axios.get(`http://localhost:8080/api/Contenidos/verContenido/${id}`)
                .then(response => {
                    setContenido(response.data);
                    setLetras(palabrasClave(response.data.palabras_clave));
                })
                .catch(error => {
                    console.error("Error fetching contenidos:!", error);
                });
        } else {
            // SE CONFIGURAN VALORES POR DEFECTO
            setContenido({
                titulo:             '',
                palabras_clave:     '',
                area_conocimiento:  '',
                tipo_contenido:     '',
                imagen_portada:     '',
                thumbnail:          '',
                descripcion:        '',
                contenido:          ''
            });
        }
    }, [id]);

  return (
        <main className='max-w-screen py-10 flex flex-col items-center justify-center bg-azulPrimario'>
            <div className='container relative flex justify-center rounded-lg'>
                <img className='w-full h-80 object-cover rounded-lg' src={contenido.imagen_portada} alt="" />

                <div className='absolute left-6 bottom-2'>
                    <h1 className='px-3 py-2 font-bold text-3xl rounded-md bg-white bg-opacity-80'>{contenido.titulo}</h1>
                </div>

                <div className='absolute right-6 top-2 md:bottom-2 md:top-auto'>
                    <ul className='flex flex-row space-x-6'>
                        <li className='px-3 py-2 text-md font-medium text-white rounded-md bg-naranjaPrimario'>{contenido.tipo_contenido}</li>
                        <li className='px-3 py-2 text-md font-medium text-white rounded-md bg-azulPrimario'>{contenido.area_conocimiento}</li>
                    </ul>
                </div>
            </div>

            <section className="container flex flex-col justify-start items-start px-10 py-8 bg-white rounded-lg shadow-lg space-y-5">
                <h3 className='font-semibold text-xl'>Palabras clave</h3>
                <div>
                    <ul className='flex flex-row space-x-2'>
                        {letras.map((letras, index) => (
                            <li className='px-3 py-2 font-medium bg-gray-300 rounded-md' key={index}>{letras}</li>
                        ))}
                    </ul>
                </div>

                <h4 className='font-bold text-2xl'>Descripción</h4>
                <p>{contenido.descripcion}</p>

                <h2 className='font-bold text-2xl'>Contenido</h2>
                <div dangerouslySetInnerHTML={{ 
                        __html: quitarComillas(contenido.contenido) 
                    }} />
            </section>
        </main>
  )
}

export default Publicacion