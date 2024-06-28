import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CadConta from "./src/screens/cad-conta/cad-conta.jsx";
import Home from "./src/screens/home/home.jsx";

const Stack = createNativeStackNavigator();

function App() {
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="home">

      <Stack.Screen name="home" component={Home} options={{
        headerShown: false
      }} />

      <Stack.Screen name="conta" component={CadConta} options={{
        title: "Conta à Receber",
        headerTitleAlign: "center",
        headerShadowVisible: false
      }} />

    </Stack.Navigator> 
  </NavigationContainer>
  );
};

export default App;