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
            backgroundColor: '#34495E',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Muestra') {
              iconName = focused ? '📋' : '📋';
            }else if(route.name === 'Registrar muestra'){
              iconName = focused ? '📋' : '📋';
            }
            return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
          },
          tabBarStyle: {
            backgroundColor: '#eff',
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Muestra" component={Muestras} />
        <Tab.Screen name="Registrar muestra"   component={FormMuestra} />
      </Tab.Navigator>
    </NavigationContainer>
 );
};

export default App;
