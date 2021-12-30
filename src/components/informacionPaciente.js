import React from 'react'
import { Text, SafeAreaView,Pressable,View, StyleSheet } from 'react-native'

import { formatearFecha } from '../helpers/fecha';

export const InformacionPaciente = ({pacienteSelect,setModalPaciente,setPacienteSelect }) => {
   
    const { paciente, propietario, email, telefono, fecha, sintomas }= pacienteSelect;
    

    const handleCalcel =() =>{
       
        setModalPaciente(false);
        setPacienteSelect({})
    }
    return (
        <SafeAreaView 
            style={styles.contenedor}
        >
            <View>
                <Pressable 
                    style={styles.btnCerrar}
                    onPress={ handleCalcel }
                    >
                    <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
                </Pressable>
            </View>
            
            <Text style={styles.titulo}>
            Información de {paciente}
            </Text>
            <View 
                style={styles.contenido}
            >
                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario: </Text>
                    <Text style={styles.valor}> {propietario} </Text> 
                </View>
                
                <View style={styles.campo}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.valor}> {email} </Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono: </Text>
                    <Text style={styles.valor}> {telefono} </Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha: </Text>
                    <Text style={styles.valor}> {formatearFecha(fecha)} </Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Sintomas: </Text>
                    <Text style={styles.valor}> {sintomas} </Text> 
                </View>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#EB9000',
        flex: 1, 
    }, 

    btnCerrar:{
        marginVertical: 20,
        backgroundColor:'#DA7D19',
        marginHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#A201E6'
    },
    btnCerrarTexto:{
        color:'#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    titulo:{
        textAlign: 'center',
        fontSize:30,
        color: '#161929',
        fontWeight:'600'
    },
    contenido:{
        backgroundColor: '#FFF',
        marginVertical: 20,
        marginHorizontal: 30,
        borderRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5,
        elevation: 6,
    },
    campo:{
        marginBottom: 10
    },
    label:{
        textTransform:'uppercase',
        color: '#374151',
        fontWeight:'700',
        fontSize: 12
    },
    valor:{
        fontWeight:'700',
        fontSize: 20,
        color:'#334155'
    },
})
