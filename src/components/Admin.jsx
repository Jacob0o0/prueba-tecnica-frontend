import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// =============== STYLE ==============
import '../styles/index.css';

import {truncateDescription} from '../js/utils'

const Admin = () => {
    const [contenidos, setContenidos] = useState([]);

    useEffect(() => {
        fetchContenidos();
    }, []);

    const fetchContenidos = async () => {
        try {
            // SE SOLICITA TODAS LAS PUBLICACIONES SUBIDAS AL SISTEMA  A LA API
            const response = await axios.get('http://localhost:8080/api/Contenidos/listaContenidosPortada');
            setContenidos(response.data);
        } catch (error) {
            console.error('Error fetching contenidos:', error);
        }
    };
    
    const handleDelete = async (event, id) => {
        event.preventDefault();

        if(window.confirm('¿Estás seguro de que quieres borrar este contenido?')){
            try {
                // SE SOLICITA A LA API BORRAR LA PUBLICACIÓN ELEGIDA POR EL USUARIO
                const response = await axios.delete(`http://localhost:8080/api/Contenidos/eliminarContenido/${id}`);
        
                if (response.status === 200) {
                    alert("Se eliminó la publicación con éxito");
                    fetchContenidos();
                } else {
                    console.error("Unexpected error deleting contenido:", response.statusText);
                }
            } catch (error) {
                console.error("There was an error deleting the contenido!", error);
                alert(error);
            }
        }

    };


    return(
        <main className='max-w-screen py-10 flex flex-col items-center bg-azulPrimario'>
            <section className="container flex flex-col justify-center px-10 py-8 bg-white rounded-lg shadow-lg">
                <table className='table-auto'>
                    <thead className='align-bottom'>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Información</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {contenidos.map((contenido) => (
                            <tr key={contenido.id} className='border-b-8'>
                                <td className='relative max-w-72 border-azulPrimario border-3'>
                                    <img className='h-52 w-full object-cover rounded-l-lg' src={contenido.thumbnail} alt="Thumbnail" />
                                    <div className='absolute z-10 bottom-3 left-3'>
                                        <p className='px-2 py-1 text-sm font-medium text-white bg-azulPrimario rounded-md'>{contenido.area_conocimiento}</p>
                                    </div>
                                </td>
                                <td className='px-3 py-4 align-bottom relative'>
                                    <div className='flex flex-col'>
                                        <p className='text-sm font-semibold'>Título:</p>
                                        {contenido.titulo}
                                        <p className='text-sm font-semibold'>Descripción:</p>
                                        {truncateDescription(contenido.descripcion, 60)}
                                    </div>
                                    <div className='absolute top-2 right-2 flex flex-row space-x-3'>
                                        <Link className='h-6 w-6 flex items-center justify-center bg-azulPrimario rounded-md hover:scale-110'
                                            to={`/formulario/${contenido.id}`}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Link>
                                        <a href="" className='h-6 w-6 flex items-center justify-center bg-red-400 rounded-md hover:scale-110'
                                            onClick={(event) => handleDelete(event, contenido.id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link className='pt-5 flex justify-center' to={'/formulario'}>
                    <p className='px-3 py-2 flex text-white font-semibold bg-azulPrimario rounded-md hover:scale-110'>Subir contenido</p>
                </Link>
            </section>
        </main>
    )
}

export default Admin