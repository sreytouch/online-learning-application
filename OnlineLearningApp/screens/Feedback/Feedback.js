import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MotiImage } from 'moti'
import { connect } from "react-redux";

import {
    IconButton,
    TextButton,
} from "../../components";
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../constants";


const Feedback = ({ navigation, appTheme }) => {

    const [selectedFeedback, setSelectedFeedback] = React.useState("");

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.height > 800 ? 50 : 30,
                    marginHorizontal: SIZES.radius,
                    height: 80
                }}
            >
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
                    }}
                    onPress={() => navigation.goBack()}
                />

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 10,
                        marginRight: 50,
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                        }}
                    >
                        Feedback
                    </Text>
                </View >
            </View >
        )
    }

    function renderTitleInfo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: appTheme.textColor,
                        ...FONTS.h2,
                        fontSize: 28
                    }}
                >
                    How was Your Experience in this Session?
                </Text>

                <Text
                    style={{
                        marginTop: SIZES.radius,
                        textAlign: 'center',
                        color: appTheme.name == "dark" ? COLORS.gray30 : COLORS.black,
                        ...FONTS.body3
                    }}
                >
                    We'd love to hear from you.
                </Text>
            </View>
        )
    }

    function renderFeedbackIcons() {
        return (
            <View
                style={{
                    marginVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: 350,
                        height: 100,
                    }}
                >
                    {/* Line */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            right: 20,
                            height: 2,
                            backgroundColor: appTheme.backgroundColor17,
                        }}
                    />
                    {
                        dummyData.feedbackIcons.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={`Feedback-${index}`}
                                    onPress={() => {
                                        setSelectedFeedback(item)
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: 90
                                        }}
                                    >
                                        <MotiImage
                                            source={item.icon}
                                            resizeMode="contain"
                                            from={{ width: 40, height: 40 }}
                                            animate={{
                                                width: selectedFeedback?.id == item?.id ? 60 : 40,
                                                height: selectedFeedback?.id == item?.id ? 60 : 40
                                            }}
                                            transition={{
                                                type: 'spring',
                                            }}
                                            style={{
                                                borderRadius: 30,
                                                backgroundColor: COLORS.white,
                                                tintColor: item.id == selectedFeedback?.id ? COLORS.primary : appTheme.backgroundColor14,
                                            }}
                                        />

                                        <Text
                                            style={{
                                                color: selectedFeedback?.id == item?.id ? appTheme?.textColor : appTheme?.textColor3,
                                                ...FONTS.body4,
                                                fontFamily: selectedFeedback?.id == item?.id ? "Roboto-Bold" : "Roboto-Regular"
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </View>

        )
    }

    function renderReviewForm() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.body3,
                    }}
                >
                    Leave a Review
                </Text>

                <TextInput
                    numberOfLines={8}
                    multiline={true}
                    scrollEnabled={false}
                    style={{
                        height: 150,
                        marginTop: SIZES.base,
                        padding: SIZES.radius,
                        paddingTop: SIZES.radius,
                        borderRadius: SIZES.base,
                        color: appTheme?.textColor,
                        backgroundColor: appTheme.backgroundColor17,
                        ...FONTS.body3
                    }}
                    placeholder="Type here..."
                    placeholderTextColor={COLORS.gray30}
                    textAlignVertical={'top'}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGreen
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Content */}
            <View
                style={{
                    flex: 1,

                }}
            >
                <View
                    style={{
                        flex: 1,
                        borderTopLeftRadius: SIZES.radius * 2,
                        borderTopRightRadius: SIZES.radius * 2,
                        backgroundColor: appTheme.backgroundColor1,
                    }}
                >
                    {/* Form */}
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        enableResetScrollToCoords={false}
                        showsVerticalScrollIndicator={false}
                        extraScrollHeight={-80}
                    >
                        {/* Header Info */}
                        {renderTitleInfo()}

                        {/* Feedback Icons */}
                        {renderFeedbackIcons()}

                        {/* Form Input */}
                        {renderReviewForm()}
                    </KeyboardAwareScrollView>

                    <TextButton
                        label={'Submit Feedback'}
                        onPress={() => navigation.goBack()}
                        contentContainerStyle={{
                            marginHorizontal: SIZES.padding,
                            height: 50,
                            marginBottom: SIZES.padding,
                            borderRadius: 25,
                        }}
                        labelStyle={{
                            ...FONTS.h3
                        }}
                    />
                </View>
            </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
