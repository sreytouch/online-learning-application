import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";

import {
    IconButton,
    TextButton,
} from "../../components";
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../constants";

const Membership = ({ navigation, appTheme }) => {

    const [selectedPlan, setSelectedPlan] = React.useState(null)

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGreen
            }}
        >
            {/* Background */}
            <Image
                source={appTheme.name == "dark" ? images.bg_dark : images.bg_shape}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    width: SIZES.width,
                    height: 300
                }}
            />
            {/* Header */}
            <View style={{
                marginHorizontal: SIZES.radius,
                flexDirection: 'row',
                marginTop: SIZES.height > 800 ? 50 : 30,
            }}>
                {/* Back */}
                <IconButton
                    icon={icons.left_arrow}
                    iconStyle={{
                        tintColor: COLORS.white
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        //backgroundColor: appTheme.name == "light" ? COLORS.gray10 : COLORS.gray60
                    }}
                    onPress={() => navigation.goBack()}
                />

                <View style={{
                    flex: 1,
                    height: 50,
                    marginRight: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, }}>Membership</Text>
                </View>
            </View>

            <View
                style={{
                    marginTop: 30,
                    marginHorizontal: SIZES.padding,
                    height: 100,
                    width: 300,
                }}>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Unlimited Study Anytime, Anywhere</Text>
            </View>

            {/* Plans */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: appTheme?.backgroundColor1,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2
                }}
            >
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            marginBottom: SIZES.base,
                            color: appTheme.textColor,
                            ...FONTS.h3,
                            fontSize: 18
                        }}
                    >
                        Choose a plan
                    </Text>

                    <FlatList
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingBottom: SIZES.padding
                        }}
                        showsVerticalScrollIndicator={false}
                        data={dummyData.membershipPans}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            let textColor = (item === selectedPlan) ? appTheme.textColor4 : appTheme.textColor

                            return (
                                <TouchableOpacity
                                    style={{
                                        height: 180,
                                        width: (SIZES.width / 2) - (SIZES.base * 4),
                                        margin: SIZES.base,
                                        borderRadius: 15,
                                        backgroundColor: (item === selectedPlan) ? appTheme.backgroundColor9 : appTheme.backgroundColor5,
                                        borderColor: (item === selectedPlan) ? COLORS.gray85 : COLORS.gray40,
                                        borderWidth: appTheme.name == "dark" ? 1 : 0,
                                    }}
                                    onPress={() => setSelectedPlan(item)}
                                >
                                    {/* Checkbox */}
                                    <View
                                        style={{
                                            marginTop: SIZES.radius,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                borderWidth: (selectedPlan === item) ? 0 : 1,
                                                backgroundColor: (selectedPlan === item) ? COLORS.white : null,
                                                borderColor: appTheme.name == "light" ? COLORS.black : COLORS.gray40,
                                                marginLeft: SIZES.radius,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {selectedPlan === item &&
                                                <Image
                                                    source={icons.checked}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                    }}
                                                />
                                            }
                                        </View>

                                        {item.withBestOffer &&
                                            <View
                                                style={{
                                                    width: 80,
                                                    height: 30,
                                                    backgroundColor: COLORS.primary2,
                                                    borderTopLeftRadius: 15,
                                                    borderBottomLeftRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text style={{ ...FONTS.body4, color: COLORS.white }}>Best Offer</Text>
                                            </View>
                                        }
                                    </View>

                                    {/* Price */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: SIZES.radius,
                                            paddingHorizontal: SIZES.radius
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h1,
                                                alignSelf: 'center',
                                                color: textColor
                                            }}
                                        >
                                            ${item.price}
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                alignSelf: 'flex-end',
                                                color: textColor
                                            }}
                                        >
                                            /{item.perDuration}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: SIZES.radius,
                                            paddingHorizontal: SIZES.radius
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: textColor,
                                                ...FONTS.body5,
                                                lineHeight: 15
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <TextButton
                        contentContainerStyle={{
                            height: 50,
                            borderRadius: 25,
                        }}
                        label="Start Free Trial"
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                        onPress={() => console.log("Start Free Trial")}
                    />
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Membership);