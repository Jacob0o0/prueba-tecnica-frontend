import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// =============== STYLE ==============
import '../styles/index.css';


const Form = () => {
    const apiKey = 'k79yoovcj46ggvjizyxw4urdiggg8dj2lb3i0iu36uopr1qh';

    // ID obtenido por la ruta
    const { id } = useParams();
    // Variable para llenar el formato
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

    const [errors, setErrors] = useState({});

    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    
    const editorRef = useRef(null);

    useEffect(() => {
        if (id) {
            // SE OBTIENE EL CONTENIDO DE LA BASE DE DATOS
            axios.get(`http://localhost:8080/api/Contenidos/verContenido/${id}`)
                .then(response => {
                    setContenido(response.data);
                })
                .catch(error => {
                    console.error("Error fetching contenidos:!", error);
                });
        } else {
            // SE LLENA DE ESPACIOS VACÍOS SI NO SE OBTUVO EL ID DE LA RUTA
            setContenido({
                titulo: '',
                palabras_clave: '',
                area_conocimiento: '',
                tipo_contenido: '',
                descripcion: '',
                contenido: ''
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContenido(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const formData      = {};
        const elements      = event.target.elements;
        const emptyFields   = {};

        // SE HACE LA COMPROBACIÓN DE SI HAY CAMPOS VACÍOS
        for (let i = 0; i < elements.length; i++) {
            const item = elements.item(i);
            if (item.name) {
                if (item.type === 'file'){
                    if (item.files.length > 0){
                        formData[item.name] = item.files[0];
                    } else {
                        emptyFields[item.name] = true;
                    }
                } else {
                    formData[item.name] = item.value;
                    if (!item.value) {
                        emptyFields[item.name] = true;
                    }
                }
            }
        }

        // SE OBTIENE EL CONTENIDO DEL EDITOR HTML
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            formData["contenido"] = content;
            if (!editorRef.current.getContent()) {
                emptyFields["contenido"] = true;
            }
        }

        setErrors(emptyFields);

        if (Object.keys(emptyFields).length === 0) {
            try {
                // SE MANDA LA SOLICITUD A LA API REST
                const response = await axios.put(`http://localhost:8080/api/Contenidos/actualizarContenido/${id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            
                setMensajeError('');
                setMensajeExito(response.data.message);
                setTimeout(() => {
                    setMensajeExito('');
                }, 3000);
            } catch (error) {
                setMensajeError('Error al subir el contenido.');
                console.log(error);
                setMensajeExito('');
            }
        } 
    };

    return(
        <main className='max-w-screen py-10 flex flex-col items-center bg-azulPrimario'>
            <section className="container flex flex-col items-center px-10 py-8 bg-white rounded-lg shadow-lg">
                <form className="w-[70%] grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5" 
                    onSubmit={handleSubmit}>
                    <div className={`md:col-span-3 input_group ${errors.titulo ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="titulo" className="flex">Título<span className="text-red-400">*</span>: </label>
                        <input className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                            type="text" maxLength={150} 
                            placeholder="Título de la publicación" 
                            name="titulo" 
                            id="titulo"  
                            onChange={handleChange} 
                            value={contenido.titulo}/>
                    </div>
                    <div className={`md:col-span-2 input_group ${errors.area_conocimiento ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="area_conocimiento" className="flex">Área de conocimiento <span className="text-red-400">*</span>: </label>
                        <input className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                            type="text" 
                            maxLength={9} 
                            placeholder="Una sola palabra (0-9)" 
                            name="area_conocimiento" 
                            id="area_conocimiento" 
                            onChange={handleChange} 
                            value={contenido.area_conocimiento} />
                    </div>
                    <div className={`md:col-span-2 input_group ${errors.tipo_contenido ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="tipo_contenido" className="flex">Tipo de contenido <span className="text-red-400">*</span>: </label>
                        <input className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                            type="text" 
                            maxLength={9} 
                            placeholder="Una sola palabra (0-9)" 
                            name="tipo_contenido" 
                            id="tipo_contenido" 
                            onChange={handleChange} 
                            value={contenido.tipo_contenido}/>
                    </div>
                    <div className={`md:col-span-3 input_group ${errors.palabras_clave ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="palabras_clave" className="flex">Palabras clave <span className="text-red-400">*</span>: </label>
                        <input className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                            type="text" 
                            placeholder="Ingresa palabras separadas por comas (ejemplo: matemáticas, computación, ...)" 
                            name="palabras_clave" 
                            id="palabras_clave" 
                            onChange={handleChange} 
                            value={contenido.palabras_clave}/>
                    </div>

                    <div className={`md:col-span-2 input_group ${errors.thumbnail ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="thumbnail" className='flex'>Imagen previa: <span className="text-red-400">(no se puede modificar)</span> </label>
                        <img src={contenido.thumbnail} alt="Vista previa" className="w-[100%] max-h-32 mt-4 object-cover rounded-md" />
                    </div>

                    <div className={`md:col-span-3 input_group ${errors.imagen_portada ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="imagen_portada" className='flex'>Imagen de portada: <span className="text-red-400">(no se puede modificar)</span>: </label>
                        <img src={contenido.imagen_portada} alt="Vista previa" className="w-[100%] max-h-32 mt-4 object-cover rounded-md" />
                    </div>

                    <div className={`md:col-span-5 input_group ${errors.descripcion ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="descripcion" className="flex">Descripción <span className="text-red-400">*</span>: </label>
                        <textarea className='h-20 border mt-1 rounded px-4 w-full bg-gray-50'  
                            placeholder='Descripcion del contenido' 
                            maxLength={200} 
                            name="descripcion" 
                            id="descripcion" 
                            onChange={handleChange} 
                            value={contenido.descripcion}></textarea>
                    </div>
                    <div className={`md:col-span-5 input_group ${errors.contenido ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label className="flex">Contenido <span className="text-red-400">*</span>: </label>
                        <Editor
                            apiKey={apiKey}
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                plugins: 'lists',
                                toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | bullist numlist',
                                tinycomments_mode: 'embedded'
                            }}
                            initialValue={contenido.contenido}
                        />
                    </div>

                    <button className="md:col-start-3 mt-5 mb-5 px-3 py-2 text-white text-md font-bold bg-azulPrimario rounded shadow-sm hover:scale-125 transition-transform transition-opacity transition-colors duration-500 ease-in-out" type="submit">
                            Enviar
                    </button>

                </form>

                {mensajeError && (
                    <div className="md:col-span-5 m-2 p-2 flex justify-center bg-red-300 rounded" 
                        id="alerta_campos_vacios">
                        {mensajeError}
                    </div>
                )}

                {mensajeExito && (
                    <div className="md:col-span-5 m-2 p-2 flex justify-center bg-green-300 rounded" 
                        id="alerta_exito">
                        {mensajeExito}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Form