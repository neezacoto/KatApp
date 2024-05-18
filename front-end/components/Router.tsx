import React, { useContext, useEffect, useRef } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  StatusBar,
} from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import History from "./pages/History";
import UserContext, { UserProvider } from "../Context/UserContext";
import GearModal from "./GearModal";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const withModalize = (Component: any) => {
    return (props: any) => <Component {...props} modalizeRef={modalizeRef} />;
  };

  // Defaulting to an initial route name if routes are not available
  const routes = useNavigationState((state) => state?.routes ?? []);
  const currentRouteName =
    routes.length > 0 ? routes[routes.length - 1].name : "Welcome"; // Default to "Welcome"

  // Set the status bar style based on the current route
  const statusBarStyle = ["Welcome", "Signup", "Login"].includes(
    currentRouteName
  )
    ? "dark-content"
    : "light-content";

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor:
            statusBarStyle === "dark-content" ? "white" : "#D391F2",
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Navigator
          initialRouteName="Welcome"
          screenOptions={{
            cardStyle: { flex: 1, backgroundColor: "transparent" },
            headerShown: false,
            presentation: "card",
          }}
        >
          <Screen name="Welcome" component={withModalize(Welcome)} />
          <Screen name="Signup" component={withModalize(Signup)} />
          <Screen name="Login" component={withModalize(Login)} />
          <Screen name="History" component={withModalize(History)} />
          <Screen name="Main" component={withModalize(Main)} />
          <Screen
            name="Profile"
            component={withModalize(Profile)}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal-inverted",
            }}
          />
          <Screen name="Settings" component={withModalize(Settings)} />
          {/* Add other screens here */}
        </Navigator>
      </SafeAreaView>
      <GearModal ref={modalizeRef} navigation={navigation} />
    </View>
  );
};

export default function Router() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    backgroundColor: "#D391F2",
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
