import React, { useState, useEffect } from "react"
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from "react-native"
import DatePicker from 'react-native-date-picker'

export const Formulario=({ 
    modalVisible,
    pacientes,
    setPacientes,
    pacienteSelect,
    setPacienteSelect,
    cerrarModalFormulario 
})=>{

    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');

    useEffect(() => {
        if(Object.keys(pacienteSelect).length>0){
            setId(pacienteSelect.id)
            setPaciente(pacienteSelect.paciente)
            setPropietario(pacienteSelect.propietario)
            setEmail(pacienteSelect.email)
            setTelefono(pacienteSelect.telefono)
            setFecha(pacienteSelect.fecha)
            setSintomas(pacienteSelect.sintomas)
        }


    }, [pacienteSelect])


    const handleCita = ()=>{
        //validaciones
        if([paciente, propietario,email,fecha,sintomas].includes('')){
            
            Alert.alert(
                'Error',
                'Todos los campos son obligatorio',
                [{text: 'Aceptar'}]//se pude poner mas de un boton el primero es el de cancelar
            )//Encabezado, cuerpo, boton
            
            return 
        }
        //datos del formulario
        const nuevoPaciente = {
                    paciente,
                    propietario,
                    email,
                    telefono,
                    fecha,
                    sintomas
        }

        //Revisar si es nuevo paciente 
        if(id){
            //ediatando
            nuevoPaciente.id = id;

            const pacientesActualizado = pacientes.map((p)=>
            p.id=== nuevoPaciente.id? nuevoPaciente: p)

            setPacientes(pacientesActualizado)
            setPacienteSelect({})//limpia el formulario


        }else{
            //nuevo registro le asociamos el id
            nuevoPaciente.id = Date.now()
             setPacientes([...pacientes,nuevoPaciente]);
        }
       //reset y cerrar modal
     
        setId('')
        setPaciente(''),
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
        cerrarModalFormulario()
       
    }

    const handleCalcel = ()=>{
     
        setId('')
        setPaciente(''),
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
        setPacienteSelect({})//limpia el formulario
        cerrarModalFormulario()
    }

    return(
        <Modal
          animationType='slide'
          visible={modalVisible}
        >
            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    <Text style={styles.titulo }>{(id)?'Editar': 'Nueva'} {''}
                            <Text style={styles.tituloBold }>Cita</Text>
                    </Text> 

                    <Pressable 
                        style={styles.btnCancelar}
                        onPress={ handleCalcel }
                        >
                        <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                    </Pressable>



                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciencite: </Text>
                        <TextInput
                            style={styles.input} 
                            placeholder="Nombre Paciente"
                            placeholderTextColor={'#444E61'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario: </Text>
                        <TextInput
                            style={styles.input} 
                            placeholder="Nombre Propietario"
                            placeholderTextColor={'#444E61'}   
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propetario: </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='email-address' 
                            placeholder="Email"
                            placeholderTextColor={'#444E61'}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono Propetario: </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='number-pad'
                            placeholder="Telefono"
                            placeholderTextColor={'#444E61'}                
                            value={telefono}
                            onChangeText={setTelefono}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha: </Text>
                        <View style={styles.datePiker}>
                            <DatePicker 
                            date={fecha}
                            locale="es"
                            onDateChange={ (date)=> setFecha(date) }
                        />
                        </View>
                        
                    </View>
                    

                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas</Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            placeholderTextColor={'#444E61'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <Pressable 
                        style={styles.btnAgregarNueva}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnAgregarNuevaText}>{(id)?'Actualizar Paciente':'Agregar Paciente'}</Text>
                    </Pressable>
                    
                </ScrollView>
            </SafeAreaView>
          
        </Modal>
    )
}

const styles = StyleSheet.create({
    contenido:{
        backgroundColor:'#8C52FF',
        flex: 1,
    },

    titulo:{
        color: '#FFF',
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
    },
    tituloBold:{
        fontWeight: '900',
    },
    btnCancelar:{
        marginVertical: 20,
        backgroundColor:'#6E03FF',
        marginHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#A201E6'
    },
    btnCancelarTexto:{
        color:'#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },

    campo:{
        marginTop: 15,
        marginHorizontal: 30,
      
    },
    label:{
        color:'#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input:{
        color:'#252B36',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        fontSize: 15,
        marginBottom: 10,
    },
    sintomasInput:{
        height: 100,
    },
    datePiker:{
        color:'#252B36',
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    btnAgregarNueva:{
        marginVertical: 30,
        backgroundColor: '#E6A019',
        paddingVertical: 15,
        marginHorizontal:30,
        borderRadius: 15

    },
    btnAgregarNuevaText:{
        textAlign: 'center',
        color: '#6E03FF',
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'uppercase'
    },

})