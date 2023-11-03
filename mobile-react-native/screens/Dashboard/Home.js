import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";

import {
    IconButton,
    TextButton,
    LineDivider,
    CategoryCard
} from "../../components";

import VerticalCourseCard from '../../components/VerticalCourseCard';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

import * as SecureStore from "expo-secure-store";
import axios from 'axios';
const baseUrlCategory = 'http://localhost:8000/api/v1/categories';
const baseUrlCourse = 'http://localhost:8000/api/v1/courses';

const Section = ({ containerStyle, title, onPress, children, appTheme }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        color: appTheme?.textColor,
                        ...FONTS.h2
                    }}
                >
                    {title}
                </Text>

                <TextButton
                    contentContainerStyle={{
                        width: 80,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    label="See All"
                    onPress={onPress}
                />
            </View>

            {children}
        </View>
    )
}

const Home = ({ appTheme }) => {

    const navigation = useNavigation();
    const [dataUser, setDataUser] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);

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
        const loadCourse = async () => {
            await axios.get(baseUrlCourse , {
                headers: {
                    Authorization: "Bearer " + await getToken(),
                    ContentType: "application/json",
                }
              }).then((response) => {
                const item = response.data.data;
                setDataCourse([...dataCourse, item]);
              }); 
        };
        const loadCategory = async () => {
            await axios.get(baseUrlCategory , {
                headers: {
                    Authorization: "Bearer " + await getToken(),
                    ContentType: "application/json",
                }
              }).then((response) => {
                const item = response.data.data;
                setDataCategory([...dataCategory, item]);
              }); 
        };

        loadUser();
        loadCourse();
        loadCategory();
    }, []);
    // console.log("===dataCourse[0]===", dataCourse[0])

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                {/* Greetings */}
                <View
                    style={{
                        flex: 1,
                        paddingTop: 15
                    }}
                >
                    <Text
                        style={{
                            color: appTheme?.textColor,
                            ...FONTS.h2
                        }}
                    >
                        Hello, {dataUser[0] && dataUser[0].firstName}  {dataUser[0] && dataUser[0].lastName}! 
                    </Text>
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >
                        {new Date().toDateString()}
                    </Text>
                </View>

                {/* Notification */}
                <IconButton
                    icon={icons.notification}
                    iconStyle={{
                        tintColor: appTheme?.tintColor
                    }}
                    onPress={() => navigation.navigate('Notification')}
                />
            </View>
        )
    }

    function renderStartLearning() {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                {/* Info */}
                <View>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body2
                        }}
                    >
                        HOW TO
                    </Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        learning React Native by yourself ?
                    </Text>

                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        By Jessica Lang
                    </Text>
                </View>

                {/* Image */}
                <Image
                    source={images.start_learning}
                    style={{
                        width: "100%",
                        height: 110,
                        marginTop: SIZES.padding
                    }}
                />

                {/* Button */}
                <TextButton
                    label="Start Learning"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                    labelStyle={{
                        color: COLORS.black
                    }}
                />
            </ImageBackground>
        )
    }

    function renderCourses() {
        return (
            <FlatList
                horizontal={true}
                data={dataCourse[0]}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                renderItem={({ item, index }) => (
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dataCourse[0].length - 1 ? SIZES.padding : 0
                        }}
                        course={item}
                    />
                )}
            />
        )
    }

    function renderCategories() {
        return (
            <Section
                title="Categories"
                appTheme={appTheme}
                onPress={() => navigation.navigate('CategoryList')}
            >
                <FlatList
                    horizontal={true}
                    data={dataCategory[0]}
                    listKey="Categories"
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElementPrefix="Home"
                            category={item}
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == dataCategory[0].length - 1 ? SIZES.padding : 0
                            }}
                            onPress={() => navigation.navigate("CourseListing", { category: item, sharedElementPrefix: "Home" })}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderPopularCourses() {
        return (
            <Section
                title="Popular Courses"
                appTheme={appTheme}
                containerStyle={{
                    marginTop: 30
                }}
                onPress={() => navigation.navigate("PopularCourses")}
            >
                <FlatList
                    data={dataCourse[0]}
                    listKey="PopularCourses"
                    scrollEnabled={false}
                    keyExtractor={item => `PopularCourses-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding
                            }}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider />
                    )}
                />
            </Section>
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
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Start Learning */}
                {renderStartLearning()}

                {/* Courses */}
                {renderCourses()}

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Categories */}
                {renderCategories()}

                {/* Popular Courses */}
                {renderPopularCourses()}
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);