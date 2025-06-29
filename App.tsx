import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListPage from './src/pages/List';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';

const Stack = createNativeStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />
      <Stack.Screen name="List" component={ListPage} options={{ title: 'Lista de Usuários' }} />
    </Stack.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterPage} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: 'person-circle-outline' | 'person-add-outline';

            if (route.name === 'LoginTab') iconName = 'person-circle-outline';
            else iconName = 'person-add-outline';

            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarLabelStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 16,
          },
          tabBarStyle: {
            height: 70,
          },
        })}
      >
        <Tab.Screen
          name="LoginTab"
          component={LoginStack}
          options={{ title: 'Login', headerShown: false }}
        />
        <Tab.Screen
          name="ListTab"
          component={RegisterStack}
          options={{ title: 'Cadastrar', headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
