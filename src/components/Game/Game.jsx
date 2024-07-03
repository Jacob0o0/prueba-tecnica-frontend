import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";

function Game() {
    const constraintsRef = useRef(null);
    const cajeroRef = useRef(null);

    const [billetes100, setBilletes100] = useState([
        {id: 1, value: 100, x:0, y:0, inside: false}
    ]);
    
    const [billetesEnCajero, setBilletesEnCajero] = useState(0);
    const billetesEnCajeroRef = useRef(billetesEnCajero);
    
    const handleDragEnd = (event, info, id, value) => {

        const cajero = cajeroRef.current;
        const billete = event.target;

        let inside = false;
    
        if (cajero && billete) {
            const cajeroRect = cajero.getBoundingClientRect();
            const billeteRect = billete.getBoundingClientRect();
        
            inside = (
                billeteRect.top >= cajeroRect.top &&
                billeteRect.bottom <= cajeroRect.bottom &&
                billeteRect.left >= cajeroRect.left &&
                billeteRect.right <= cajeroRect.right
            )

            if(inside){
                setBilletesEnCajero(prev => {
                    const valorActual = Math.max(0, prev + value)
                    console.log("billetes en CAJERO: " + valorActual);
                    return valorActual;
                });

                // Crear un nuevo billete
                const newId = Math.max(...billetes100.map(b => b.id)) + 1;

                const newBillete = {
                    id: newId,
                    value: 100,
                    x: info.point.x,
                    y: info.point.y,
                    inside: false,
                };
                setBilletes100([...billetes100, newBillete]);
            } else {
                eliminarBillete(id, value);
            }
        }

    };

    const eliminarBillete = (id, value) => {
        setBilletes100(prevBilletes => prevBilletes.filter(billete => billete.id !== id));
        setBilletesEnCajero(prev => {
            const dineroActual = Math.max(0, prev - value);
            console.log("Dinero eliminado ->"+ dineroActual);
            return dineroActual;
        });
    };

    const contarBilletesEnCajero = () => {
       alert("Hay " + billetesEnCajeroRef.current + " entregados");
    };

    return (
        <main className='max-w-screen min-h-screen flex flex-col items-center bg-azulPrimario overflow-hidden'>
            <section className='container h-full flex flex-col items-center text-center'>
                <div className='flex items-end relative h-52'>
                    <img 
                        className='h-full object-contain'
                        src="/imgs/cajero.png" 
                        alt="cajero.png" />
                    
                    <img 
                        className='absolute w-[40vw] md:w-[10vw] object-contain bottom-0 right-0'
                        src="/imgs/caja.png" 
                        alt="cajero.png" />
                </div>
                
                <motion.div 
                    className='w-full' 
                    ref={constraintsRef}>

                    <div className='h-60 mb-2 w-full bg-negroPrimario rounded-md' id='cajero' ref={cajeroRef}>

                    </div>
                    <div className='flex h-44 px-4 py-3 w-full bg-cafePrimario rounded-md' id='cartera'>
                        {billetes100.map((billete) => (
                            <motion.div
                                key={billete.id}
                                className='flex h-14 w-28 items-center justify-center bg-green-500 rounded-md item absolute'
                                drag
                                dragConstraints={constraintsRef}
                                initial={{x: 0, y:0}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onDoubleClick={() => eliminarBillete(billete.id, billete.value)}
                                onDragEnd={(event, info) => handleDragEnd(event, info, billete.id, billete.value)}
                                id={billete.id}
                                >
                                <p className='px-2 py-1 bg-green-300 rounded-xl'>$100</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <button onClick={contarBilletesEnCajero} className="mt-4 px-4 py-2 bg-white text-azulPrimario rounded-md font-bold">
                    Contar Billetes en Cajero
                </button>

            </section>
        </main>
    )
}

export default Game;