import React from 'react';
import {
    View,
    Text,
    SectionList,
    Image
} from 'react-native';
import { connect } from "react-redux";

import {
    IconButton
} from "../../components";
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../constants";

const Notification = ({ navigation, appTheme }) => {

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

            <View
                style={{
                    marginHorizontal: SIZES.padding,
                }}
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
                        backgroundColor: appTheme.name == "light" ? COLORS.white : COLORS.gray60
                    }}
                    onPress={() => navigation.goBack()}
                />

                {/* Notifications */}
                <SectionList
                    sections={dummyData.notificationByDays}
                    keyExtractor={(item) => item.id}
                    stickySectionHeadersEnabled={false}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={

                        <Text style={{
                            marginTop: SIZES.padding,
                            color: appTheme.textColor,
                            ...FONTS.h2
                        }}>Notifications</Text>
                    }
                    renderItem={({ item, index }) => (
                        <View style={{
                            flexDirection: 'row',
                            height: 120,
                            borderTopColor: appTheme.lineDivider,
                            borderTopWidth: index == 0 ? 0 : 1,
                            alignItems: 'center',
                        }}>
                            <View style={{ width: 90 }}>
                                <Image
                                    source={item.avatar}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 35,
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', marginBottom: SIZES.base }}>
                                    <Text style={{ ...FONTS.h3, color: appTheme.textColor }}>{item.name}</Text>
                                    <Text style={{ ...FONTS.body4, color: COLORS.gray40, marginLeft: SIZES.radius }}>{item.created_at}</Text>
                                </View>
                                <Text style={{ ...FONTS.body3, color: appTheme.textColor5 }}>{item.message}</Text>
                            </View>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View
                            style={{
                                marginTop: SIZES.radius,
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.gray40
                                }}
                            >
                                {title}
                            </Text>
                        </View>
                    )}
                    ListFooterComponent={
                        <View style={{ height: 50 }} />
                    }
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
