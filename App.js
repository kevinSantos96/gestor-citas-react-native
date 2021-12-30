import React,{ useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal
 
} from 'react-native';

import { Formulario } from './src/components/Formulario';
import { InformacionPaciente } from './src/components/informacionPaciente';
import { Paciente } from './src/components/Paciente';




const App= () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([])//los datos de los pacienetes
  const [pacienteSelect, setPacienteSelect] = useState({})// seleccionar un pacioente para editar su informacion
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = (id)=>{
    const pacienteEditar = pacientes.filter(p => p.id ===id);// filtramos el id del paciente
    setPacienteSelect(pacienteEditar[0])//[0] para que ingrese al objeto
  }
  
  const pacienteEliminar = (id)=>{
    Alert.alert(
      '¿Quieres eliminar este archivo?', 
      'Un paciente eliminado no se puede recuperar',
      [{text:'Cancelar' },
      {text: 'Si, Eliminar', onPress:()=>{
        const listaPacienteActualizada= pacientes.filter(
          pState => pState.id !== id)//me traiga los distintos al paciente a eliminar

          setPacientes(listaPacienteActualizada)

      }}]
    )
  }

  const cerrarModalFormulario = ()=>{
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Veterinaria {''}
        <Text style={styles.tituloBold}>Dr. Santos</Text>
      </Text>
      {/* <Button 
        title='Nueva Cita'
        onPress={()=>console.log('Prsionaste un boton')}//onClick en Navite
        ></Button> */}
        <Pressable
          onPress={ ()=>{setModalVisible(true)} }
          style={styles.btnNuevaCita}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
        </Pressable>

        {pacientes.length===0?
          <Text style={styles.noPacientes}>No hay pacientes</Text>: 
          <FlatList 
            style={styles.listado}
            data={pacientes}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
              return(
                <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={ pacienteEliminar }
                setModalPaciente = { setModalPaciente }
                setPacienteSelect ={setPacienteSelect}
                />
              )
            }}
          />

        }

        {modalVisible &&( //desmonta el modal cuando no se esta usando
            <Formulario 
            cerrarModalFormulario={cerrarModalFormulario}
              pacientes={pacientes}
              setPacientes={setPacientes}
              pacienteSelect={pacienteSelect} 
              setPacienteSelect={setPacienteSelect} 
          />
        ) }
        

        <Modal 
          visible={modalPaciente}
          animationType='fade'
        >
          <InformacionPaciente 
            pacienteSelect={ pacienteSelect }
            setModalPaciente={ setModalPaciente }
            setPacienteSelect={setPacienteSelect}
          />
        </Modal>
        
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({ // definimos nuestros estilos y los pasamos a la etiqueta
  container:{
    backgroundColor:'#F3F4F6',
    flex: 1
  },

  titulo: {
    textAlign: 'center',
    fontSize:30,
    color: '#161929',
    fontWeight:'400',
  },
  tituloBold:{
    fontWeight: '600',
    color: '#FF337A',
  },
  btnNuevaCita:{
    backgroundColor: '#8557DB',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 20
  },
  btnTextoNuevaCita:{
    textAlign:"center",
    color:'#FFF',
    fontSize: 15,
    fontWeight: '900',
  },
  noPacientes:{
    color: '#150D24',
    marginTop:10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'

  },
  listado:{
    marginTop: 50,
    marginHorizontal: 30,
    color:'#150D24'
  }

})



export default App;
