import React, { useState } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";

import {
    FormInput,
    IconButton,
    TextButton,
} from "../../components";
import { COLORS, FONTS, SIZES, images, icons } from "../../constants";

// call service
import { loginService } from "../../service/authService";
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation, appTheme }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)

    const renderForm = () => {
        return (
            <View>
                {/* Username */}
                <FormInput
                    label="Username or Email"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    value={username}
                    onChange={(value) => {
                        setUsername(value)
                    }}
                    inputStyle={{
                        color: appTheme.textColor
                    }}
                />

                {/* Password */}
                <FormInput
                    label="Password"
                    secureTextEntry={!showPass}
                    autoCompleteType="password"
                    containerStyle={{
                        marginTop: SIZES.padding
                    }}
                    value={password}
                    onChange={(value) => setPassword(value)}
                    appendComponent={
                        <IconButton
                            icon={showPass ? icons.eye_close : icons.eye}
                            iconStyle={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray30
                            }}
                            onPress={() => setShowPass(!showPass)}
                        />
                    }
                    inputStyle={{
                        color: appTheme.textColor
                    }}
                />
            </View>
        )
    }
    
    async function setItem(key, value) {
        return SecureStore.setItemAsync(key, value);
    }

    const onsubmit = (event) => {
        event.preventDefault();
        const body = {
            "email": username,
            "password": password
        }
        loginService(body)
            .then((res) => {
                if (res.status === 200) {
                    const token = res.data.token;
                    const user_id = res.data.user_id;
                    setItem('secure_token', token);
                    setItem('user_id', user_id);
                    navigation.navigate("Walkthrough");
                }
            })
            .catch((e) => {
                alert(e.message);
            });
        
    }

    const renderButtons = () => {
        return (
            <View>
                {/* Login */}
                <TextButton
                    contentContainerStyle={{
                        height: 60,
                        marginTop: 30,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    label="LOGIN"
                    // onPress={() => navigation.navigate("Walkthrough")}
                    onPress={(event) => onsubmit(event)}
                />

                {/* Divider */}
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: SIZES.radius,
                        color: appTheme.textColor3,
                        ...FONTS.body3
                    }}
                >
                    or login with
                </Text>

                {/* Sign Up */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.gray40,
                            ...FONTS.body3
                        }}
                    >
                        New User?
                    </Text>
                    <TextButton
                        label="Sign Up Now"
                        labelStyle={{
                            color: COLORS.primary
                        }}
                        contentContainerStyle={{
                            marginLeft: SIZES.radius,
                            backgroundColor: null
                        }}
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme.backgroundColor1
            }}
        >
            {/* Background */}
            <Image
                source={appTheme.name == "dark" ? images.bg_dark : images.bg}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    width: SIZES.width,
                    height: 300
                }}
            />

            {/* Title */}
            <Text
                style={{
                    marginTop: 60,
                    textAlign: 'center',
                    color: appTheme.textColor,
                    ...FONTS.h1
                }}
            >
                Login
            </Text>

            <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
                enableResetScrollToCoords={false}
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: 30
                }}
            >
                {/* Form */}
                {renderForm()}

                {/* Buttons */}
                {renderButtons()}
            </KeyboardAwareScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);