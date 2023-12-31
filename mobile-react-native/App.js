import React from "react";
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import themeReducer from "./stores/themeReducer";
import {
    Login,
    Register,
    Walkthrough,
    ChooseCategory,

    CourseListing,
    CourseDetails,

    Notification,
    InstructorProfile,

    PopularCourses,
    CategoryList,

    Feedback,
} from "./screens";
import MainLayout from "./screens/Dashboard/MainLayout"
import { useFonts } from 'expo-font';

const Stack = createSharedElementStackNavigator();
const options = {
    gestureEnabled: false,
    transitionSpec: {
        open: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) },
        },
        close: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) },
        },
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress,
            },
        };
    },
};

const store = createStore(
    themeReducer,
    applyMiddleware(thunk)
)

const App = () => {

    const [loaded] = useFonts({
        "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    })
    
    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        useNativeDriver: true,
                        headerShown: false,
                    }}
                    initialRouteName={'Login'}
                    detachInactiveScreens={false}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />

                    <Stack.Screen
                        name="Register"
                        component={Register}
                    />

                    <Stack.Screen
                        name="Walkthrough"
                        component={Walkthrough}
                    />

                    <Stack.Screen
                        name="ChooseCategory"
                        component={ChooseCategory}
                    />

                    <Stack.Screen
                        name="Dashboard"
                        component={MainLayout}
                    />

                    <Stack.Screen
                        name="CourseListing"
                        component={CourseListing}
                        options={() => options}
                    />

                    <Stack.Screen
                        name="CourseDetails"
                        component={CourseDetails}
                    />

                    <Stack.Screen
                        name="PopularCourses"
                        component={PopularCourses}
                    />

                    <Stack.Screen
                        name="CategoryList"
                        component={CategoryList}
                    />

                    <Stack.Screen
                        name="Notification"
                        component={Notification}
                    />

                    <Stack.Screen
                        name="InstructorProfile"
                        component={InstructorProfile}
                    />

                    <Stack.Screen
                        name="Feedback"
                        component={Feedback}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App