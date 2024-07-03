import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// =============== STYLE ==============
import '../styles/index.css';

// =============== ASSETS ===============


const Form = () => {
    const apiKey = 'k79yoovcj46ggvjizyxw4urdiggg8dj2lb3i0iu36uopr1qh';

    const { id } = useParams(); // Use useParams to get the id from the route parameter
    const [contenido, setContenido] = useState({
        titulo: '',
        palabras_clave: '',
        area_conocimiento: '',
        tipo_contenido: '',
        imagen_portada: '',
        thumbnail: '',
        descripcion: '',
        contenido: ''
    });

    const [fileT, setFileT] = useState(null);
    const [fileP, setFileP] = useState(null);

    const [previewT, setPreviewT] = useState(null);
    const [previewP, setPreviewP] = useState(null);

    const [errors, setErrors] = useState({});

    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    
    const fileInputRefT = useRef(null);
    const fileInputRefP = useRef(null);
    const editorRef = useRef(null);

    const acceptedFileExtensions = ["jpg", "png", "jpeg", "webp"];

    const acceptedFileTypesString = acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");

    useEffect(() => {
        if (id) {
            // SE OBTIENE LA INFORMACION DE LA API REST
            axios.get(`http://localhost:8080/api/Contenidos/verContenido/${id}`)
                .then(response => {
                    setContenido(response.data);
                    setPreviewT(response.data.thumbnail);
                    setPreviewP(response.data.imagen_portada);
                })
                .catch(error => {
                    console.error("Error fetching contenidos:!", error);
                });
        } else {
            // SE CONFIGURAN VALORES POR DEFECTO
            setContenido({
                titulo: '',
                palabras_clave: '',
                area_conocimiento: '',
                tipo_contenido: '',
                imagen_portada: '',
                thumbnail: '',
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

    // PARA EL MANEJO DE LA SOLICITUD SUBMIT
    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        const elements = event.target.elements;
        const emptyFields = {};

        for (let i = 0; i < elements.length; i++) {
            const item = elements.item(i);
            if (item.name) {
                if (item.type === 'file'){
                    if (item.files.length > 0){
                        formData.append(item.name, item.files[0]);
                    } else {
                        emptyFields[item.name] = true;
                    }
                } else {
                    formData.append(item.name, item.value);
                    if (!item.value) {
                        emptyFields[item.name] = true;
                    }
                }
            }
        }

        // SE OBTIENE EL CONTENIDO DEL EDITOR HTML
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            formData.append("contenido", content);
            if (!editorRef.current.getContent()) {
                emptyFields["contenido"] = true;
            }
        }

        setErrors(emptyFields);

        if (Object.keys(emptyFields).length === 0) {
            try {
                // SE MANDA LA SOLICITUD POST A LA API
                const response = await axios.post('http://localhost:8080/api/Contenidos/nuevoContenido', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            
                setMensajeError('');
                setMensajeExito(response.data.message);
                setTimeout(() => {
                    setMensajeExito('');
                }, 3000);
                } catch (error) {
                setMensajeError('Error al subir el contenido.');
                setMensajeExito('');
                }
        } else {
            setMensajeError('Existen campos vacíos.');
            setMensajeExito('');
        }

    };

    const handleDropT = (event) => {
        event.preventDefault();

        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles.length) {
            const fileT = droppedFiles[0];
            setFileT(droppedFiles[0]);
            setPreviewT(URL.createObjectURL(fileT));
        }
    };

    const handleDropP = (event) => {
        event.preventDefault();

        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles.length) {
            const fileP = droppedFiles[0];
            setFileP(droppedFiles[0]);
            setPreviewP(URL.createObjectURL(fileP));
        }
    };

    const handleChangeT = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewT(reader.result);
                setFileT(file); // Guardar el archivo en el estado
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangeP = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFileP(selectedFile);
            setPreviewP(URL.createObjectURL(selectedFile));
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
                        <label htmlFor="thumbnail" className='flex'>Imagen previa <span className="text-red-400">*</span>: </label>

                        <div className="py-4 px-2 flex flex-col justify-center items-center border-dashed border-azulPrimario border-4 bg-blue-50 rounded-md" onDragOver={(e) => e.preventDefault()} onDrop={handleDropT}>
                            <div className="flex flex-row items-center justify-center space-x-2">
                                <i className="bi bi-cloud-arrow-up-fill text-2xl"></i>
                                <p className="text-lg font-medium">Arrastra y suelta la imagen</p>
                            </div>
                            <p className="text-lg font-medium">o</p>
                            <button type="button" className="px-4 py-2 bg-azulPrimario text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => fileInputRefT.current.click()}>
                                Busca en archivos
                            </button>
                            <input type="file" 
                                id="thumbnail" 
                                name="thumbnail" 
                                accept={acceptedFileTypesString} 
                                ref={fileInputRefT} 
                                className="hidden" 
                                onChange={handleChangeT} 
                                onClick={(event) => {
                                    event.target.value = null;
                                }}
                                />

                            {previewT && (
                                <img src={previewT} alt="Vista previa" className="w-[100%] max-h-32 mt-4 object-cover rounded-md" />
                            )}
                        </div>
                    </div>

                    <div className={`md:col-span-3 input_group ${errors.imagen_portada ? "bg-red-200 rounded-md py-3 px-2" : ""}`}>
                        <label htmlFor="imagen_portada" className='flex'>Imagen de portada <span className="text-red-400">*</span>: </label>

                        <div className="py-4 px-2 flex flex-col justify-center items-center border-dashed border-azulPrimario border-4 bg-blue-50 rounded-md" 
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={handleDropP}>
                            <div className="flex flex-row items-center justify-center space-x-2">
                                <i className="bi bi-cloud-arrow-up-fill text-2xl"></i>
                                <p className="text-lg font-medium">Arrastra y suelta la imagen</p>
                            </div>
                            <p className="text-lg font-medium">o</p>
                            <button type="button" className="px-4 py-2 bg-azulPrimario text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => fileInputRefP.current.click()}>
                                Busca en archivos
                            </button>
                            <input type="file" 
                                id="imagen_portada" 
                                name="imagen_portada" 
                                accept={acceptedFileTypesString} 
                                ref={fileInputRefP} 
                                className="hidden" 
                                onChange={handleChangeP} 
                                onClick={(event) => {
                                    event.target.value = null;
                                }}
                                />

                            {previewP && (
                                <img src={previewP} alt="Vista previa" className="w-[100%] max-h-32 mt-4 object-cover rounded-md" />
                            )}
                        </div>
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
                            apiKey='k79yoovcj46ggvjizyxw4urdiggg8dj2lb3i0iu36uopr1qh'
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