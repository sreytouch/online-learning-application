import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { toggleTheme } from "../../stores/themeActions";
import {
    IconButton,
    ProgressBar,
    TextButton,
    ProfileValue,
    ProfileRadioButton,
    LineDivider
} from "../../components";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

// call service
// import CategoryService from "../../service/categoryService";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

const Profile = ({ appTheme, toggleTheme }) => {
    const navigation = useNavigation();
    const [newCourseNotification, setNewCourseNotification] = useState(false)
    const [studyReminder, setStudyReminder] = useState(false)
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const getToken = () => {
            return SecureStore.getItemAsync('secure_token');
        };
        const userId = () => {
            return SecureStore.getItemAsync('user_id');
        };

        const loadUser = async () => {
            const baseUrlUsers = 'http://localhost:8000/api/v1/users/'+ await userId();
            await axios.get(baseUrlUsers , {
                headers: {
                    Authorization: "Bearer " + await getToken(),
                    ContentType: "application/json",
                }
              }).then((response) => {
                const item = response.data.data; 
                setDataUser([...dataUser, item]);
              }); 
        };
        loadUser();
    }, []);
    // console.log("===dataUser[0]===", dataUser[0])



    // Handler
    function toggleThemeHandler() {
        if (appTheme?.name == "light") {
            toggleTheme("dark")
        } else {
            toggleTheme("light")
        }
    }

    // Render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h1
                    }}
                >
                    Profile
                </Text>

                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: appTheme?.tintColor
                    }}
                    onPress={() => toggleThemeHandler()}
                />
            </View>
        )
    }

    function renderProfileCard() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor2
                }}
            >
                {/* Profile Image */}
                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 80,
                    }}
                >
                    <Image
                        source={images.student_3}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            width: "100%",
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: -15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15,
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image
                                source={icons.camera}
                                resizeMode="contain"
                                style={{
                                    width: 17,
                                    height: 17,
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Details */}
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        alignItems: 'flex-start'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        {dataUser[0] && (dataUser[0].firstName + " " + dataUser[0].lastName)}
                    </Text>

                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        Full Stack Developer
                    </Text>

                    {/* Progress */}
                    <ProgressBar
                        progress="99%"
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                        >
                            Overall Progress
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                        >
                            89%
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderProfileSection() {
        return (
            <View
                style={styles.profileSectionContainer}
            >
                <ProfileValue
                    icon={icons.profile}
                    label="Name"
                    value={dataUser[0] && (dataUser[0].firstName + " " + dataUser[0].lastName)}
                />

                <LineDivider />

                <ProfileValue
                    icon={icons.email}
                    label="Email"
                    value={dataUser[0] && dataUser[0].email}
                />

                <LineDivider />

                <ProfileValue
                    icon={icons.password}
                    label="Password"
                    value="*********"
                />

                <LineDivider />

                <ProfileValue
                    icon={icons.call}
                    label="Contact Number"
                    value= {dataUser[0] && ("+1" + dataUser[0].phone)}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme?.backgroundColor1
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 150
                }}
            >
                {renderProfileCard()}

                {renderProfileSection()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSectionContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20
    }
})

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => { return dispatch(toggleTheme(themeType)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);