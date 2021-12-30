import React from 'react'
import { Text, View,StyleSheet,Pressable} from 'react-native'

import { formatearFecha } from '../helpers/fecha';

export const Paciente = ({
    item,  
    setModalVisible, 
    pacienteEditar, 
    pacienteEliminar,
    setModalPaciente,
    setPacienteSelect 
}) => {

    const { paciente, fecha, id} = item;

    const handleEditar=()=>{
        setModalVisible(true);
        pacienteEditar(id)
    }

    const handleDelete = ()=>{
       pacienteEliminar(id)
    }

    
    return (
        <Pressable
            onLongPress={()=>{
                setModalPaciente(true)
                setPacienteSelect(item)
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:  </Text>
                <Text style={styles.texto}>{ paciente } </Text>
                <Text style={styles.fecha}>{ formatearFecha(fecha) }</Text>

                <View style={ styles.contenedorBotones}>
                    <Pressable 
                        style={[styles.btn, styles.btnEditar]} 
                        onLongPress={handleEditar}
                    >
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>

                    <Pressable 
                        style={[styles.btn, styles.btnEliminar]}
                        onLongPress={ handleDelete }    
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({

    contenedor:{
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        borderBottomColor: '#94a3B8',
        borderBottomWidth: 1
       
    },
    label:{
        color: '#6B6E70',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 5,
    },
    texto:{
        color: '#8C52FF',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
    },
    fecha:{
        color: '#6B6E70',
        fontSize: 15
    },

    contenedorBotones:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btn:{
        paddingVertical: 5,
        paddingHorizontal:15,
        borderRadius: 10
    },
    btnEditar:{
        backgroundColor: '#26A2FF'
    },
    btnEliminar:{
        backgroundColor: '#FF3279'
    },
    btnTexto:{
        textTransform:'uppercase',
        fontWeight: '400',
        fontSize: 12,
        color: '#FFF'

    }
})