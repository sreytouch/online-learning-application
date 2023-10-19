import React from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient} from 'expo-linear-gradient';
import { connect } from "react-redux";

import { TextButton, IconButton } from '../../components';
import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../../constants';

const PromoModal = ({ visible, onClose, appTheme }) => {

    const navigation = useNavigation();

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <IconButton
                    icon={icons.cross}
                    iconStyle={{
                        height: 15,
                        width: 15,
                        tintColor: appTheme?.textColor
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: appTheme.name == "light" ? COLORS.gray10 : COLORS.gray60
                    }}
                    onPress={() => onClose("")}
                />
            </View>
        )
    }

    function renderContent() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                {/* Image */}
                <Image
                    source={images.promo}
                    resizeMode="contain"
                    style={{
                        height: SIZES.height > 800 ? 250 : 180
                    }}
                />

                <TextButton
                    label="7-Day Free Trial"
                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h2,
                        fontSize: 20
                    }}
                    contentContainerStyle={{
                        height: 50,
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 25,
                        backgroundColor: COLORS.white,
                    }}
                    onPress={() => {
                        onClose("Membership");
                    }}
                />
                {/* Promo info */}
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.primary2,
                            ...(SIZES.height > 800 ? FONTS.largeTitle : FONTS.h1),
                            lineHeight: SIZES.height > 800 ? 40 : 30
                        }}
                    >
                        50% OFF
                    </Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...(SIZES.height > 800 ? FONTS.largeTitle : FONTS.h1),
                            lineHeight: SIZES.height > 800 ? 40 : 30
                        }}
                    >
                        Online Courses
                    </Text>

                    <View
                        style={{
                            marginBottom: SIZES.height > 800 ? SIZES.padding : SIZES.base,
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.white, textAlign: 'center' }}>
                            Select a professional course online and get 50% instant discount.
                            <Text
                                style={{
                                    color: COLORS.primary2,
                                    ...FONTS.body3
                                }}
                            >Hurry! offers are limited </Text>
                            to availabe seats. Get your course now!
                        </Text>

                        <Text
                            style={{
                                textAlign: 'center',
                                color: COLORS.white,
                                ...FONTS.body5
                            }}
                        >
                            (Limited Time offer)
                        </Text>

                        <View
                            style={{
                                marginTop: SIZES.height > 800 ? SIZES.padding : SIZES.radius
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, textAlign: 'center' }}>7-Day Free Trial Available.</Text>
                            <Text style={{ ...FONTS.h3, color: COLORS.white, textAlign: 'center' }}>Start $10/Month. Cancel Anytime</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
        >
            <LinearGradient
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                colors={appTheme?.name == "light" ? [COLORS.lightGreen, COLORS.primary] : [COLORS.black, COLORS.black]}
            >
                {/* Header */}
                {renderHeader()}

                {/* Content */}
                {renderContent()}

                <TextButton
                    label="Start 7-Day Free Trial"
                    labelStyle={{
                        color: COLORS.white,
                        ...FONTS.h2,
                    }}
                    contentContainerStyle={{
                        height: 55,
                        marginHorizontal: SIZES.padding,
                        marginBottom: SIZES.padding,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary2,
                    }}
                    onPress={() => {
                        onClose("Membership");
                    }}
                />

            </LinearGradient>
        </Modal>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(PromoModal);
