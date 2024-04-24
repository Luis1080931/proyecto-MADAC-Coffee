import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Muestras from './src/pages/Muestras.jsx';
import FormMuestra from './src/components/FormMuestra.jsx';


const Tab = createBottomTabNavigator();

const App = () => {

 return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#3B6EA1',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Muestra') {
              iconName = focused ? '📋' : '📋';
            } else if(route.name === 'Registrar muestra'){
              iconName = focused ? '📋' : '📋';
            } /* else if(route.name === 'Actualizar'){
              iconName = focused ? '📋' : '📋';
            } */
            return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
          },
          tabBarStyle: {
            backgroundColor: '#EFF',
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          headerTintColor: 'white', 
        })}
      >
        <Tab.Screen name="Muestra" component={Muestras} />
        <Tab.Screen name="Registrar muestra" component={FormMuestra} />
{/*         <Tab.Screen name="Actualizar" component={ActualizarMuestra} /> */}
      </Tab.Navigator>
    </NavigationContainer>
 );
};

export default App;
