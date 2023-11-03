import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { connect } from "react-redux";

import {
    IconButton,
    CategoryCard,
} from "../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    images,
    icons,
    dummyData
} from "../../constants";

// call service
// import CategoryService from "../../service/categoryService";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/v1/categories';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const HEADER_HEIGHT = 190;

const CategoryList = ({ navigation, appTheme }) => {
    const [datas, setData] = useState([]);
    useEffect(() => {
        const getToken = () => {
            return SecureStore.getItemAsync('secure_token');
        };
        const loadCategory = async () => {
            await axios.get(baseUrl , {
                headers: {
                    Authorization: "Bearer " + await getToken(),
                    ContentType: "application/json",
                }
              }).then((response) => {
                const item = response.data.data;
                setData([...datas, item]);
              }); 
        };
        loadCategory();
    }, []);
    // console.log("---datas---", datas[0]);

    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    function renderHeader() {
        const inputRange = [0, HEADER_HEIGHT - 130];

        // Main Title

        const headerTitleFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [0, 30], [1, 0]),
            };
        });

        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 110], Extrapolate.CLAMP),
            };
        });

        // Secondary Title

        const headerTitle2OnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [150, 130], Extrapolate.CLAMP),
                    }
                ],
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: appTheme.backgroundColor1
                }, headerHeightAnimatedStyle]}
            >
                {/* Back */}
                <IconButton
                    icon={icons.back}
                    iconStyle={{
                        tintColor: appTheme.name == "light" ? COLORS.black : COLORS.white
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: SIZES.height > 800 ? 50 : 30,
                        borderRadius: 25,
                        backgroundColor: appTheme.name == "light" ? COLORS.gray10 : COLORS.gray60,
                        zIndex: 1,
                    }}
                    onPress={() => navigation.goBack()}
                />

                {/* Main Title & Sub-Title */}
                <Animated.View
                    style={headerTitleFadeAnimatedStyle}
                >
                    <Text style={{ ...FONTS.h1, marginTop: SIZES.radius, color: appTheme?.textColor }}>Categories</Text>
                    <Text style={{ ...FONTS.body3, marginVertical: SIZES.radius, color: COLORS.gray30 }}>All Categories</Text>
                </Animated.View>

                {/* Secondary Title & Sub-Title */}
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: -80,
                            left: 0,
                            right: 0,
                            alignItems: 'center',
                            zIndex: 0
                        },
                        headerTitle2OnScrollAnimatedStyle
                    ]}
                >
                    <Text style={{ ...FONTS.h2, color: appTheme?.textColor }}>Categories</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.gray30 }}>All Categories</Text>
                </Animated.View>
            </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme.backgroundColor1
            }}
        >
            <AnimatedFlatList
                data={datas[0] && datas[0]}
                listKey="Categories"
                numColumns={2}
                keyExtractor={item => `Categories-${item.id}`}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    marginTop: 190,
                    paddingBottom: 220,
                }}
                scrollEventThrottle={16}
                onScroll={onScroll}
                renderItem={({ item, index }) => (
                    <CategoryCard
                        sharedElementPrefix="CategoryList"
                        category={item}
                        containerStyle={{
                            height: 130,
                            width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                            marginTop: SIZES.radius,
                            marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding
                        }}
                        onPress={() => navigation.navigate("CourseListing", { category: item, sharedElementPrefix: "CategoryList" })}
                    />
                )}
                ListFooterComponent={() => (
                    <View style={{ height: 50 }} />
                )}
            />

            {renderHeader()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);