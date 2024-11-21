import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MapScreens from "./screens/MapScreens";
import PlacesScreen from "./screens/PlacesScreen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import user from "./reducers/user";

const Stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user }
})

export default function App() {
  const Search = () => {
    return (
      <tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = "location-arrow"
          } else if (route.name === "Places") {
            iconName = "map-pin"
          }

          return (
            <FontAwesomeIcon name={iconName} color={color} size={size} />
          )
        },
        tabBarActiveTintColor: "#B733D0",
        tabBarInactiveTintColor: "#335561",
        headerShown: false
      })}>
        <tab.Screen name="Map" component={MapScreens} />
        <tab.Screen name="Places" component={PlacesScreen} />
      </tab.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}
