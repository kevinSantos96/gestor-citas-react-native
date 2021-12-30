

export const formatearFecha = (fecha) =>{
    const event = new Date(fecha)
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    }

    return event.toLocaleDateString(['es-Es', [options]])//convertir la fecha en español
}
