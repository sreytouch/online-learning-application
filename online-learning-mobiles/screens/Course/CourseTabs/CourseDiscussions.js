import React from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    FlatList,
    Image
} from 'react-native';
import { connect } from "react-redux";

import {
    IconButton,
    IconLabelButton
} from "../../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    dummyData
} from "../../../constants";

const CommentSection = ({ appTheme, commentItem, commentOption, replies }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: SIZES.padding
            }}
        >
            {/* Profile */}
            <Image
                source={commentItem?.profile}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20
                }}
            />

            {/* Content */}
            <View
                style={{
                    flex: 1,
                    marginTop: 3,
                    marginLeft: SIZES.radius
                }}
            >
                {/* Name */}
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h3
                    }}
                >
                    {commentItem?.name}
                </Text>

                {/* Comment */}
                <Text
                    style={{
                        color: appTheme?.textColor5,
                        ...FONTS.body4
                    }}
                >
                    {commentItem?.comment}
                </Text>

                {/* Comment Option */}
                {commentOption}

                {replies}
            </View>
        </View>
    )
}

const CourseDiscussions = ({ appTheme }) => {

    const [footerPosition, setFooterPosition] = React.useState(0)
    const [footerHeight, setFooterHeight] = React.useState(60)

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
            console.log("Keyboard Shown");
            console.log(e.endCoordinates.height)
            setFooterPosition(e.endCoordinates.height)
        });
        const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
            console.log("Keyboard Hidden");
            setFooterPosition(0)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function renderDiscussions() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <FlatList
                    data={dummyData?.course_details?.discussions}
                    keyExtractor={item => `Discussions-main-${item.id}`}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 70
                    }}
                    renderItem={({ item, index }) => (
                        <CommentSection
                            appTheme={appTheme}
                            commentItem={item}
                            commentOption={
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: SIZES.radius,
                                        paddingVertical: SIZES.base,
                                        borderTopWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: COLORS.gray20
                                    }}
                                >
                                    <IconLabelButton
                                        icon={icons.comment}
                                        label={item?.no_of_comments}
                                        containerStyle={{
                                            paddingHorizontal: 0,
                                            paddingVertical: 0,
                                        }}
                                        iconStyle={{
                                            width: 20,
                                            height: 20,
                                            tintColor: appTheme?.textColor5
                                        }}
                                        labelStyle={{
                                            marginLeft: 3,
                                            color: appTheme?.textColor5,
                                            ...FONTS.h4
                                        }}
                                    />

                                    <IconLabelButton
                                        icon={icons.heart}
                                        label={item?.no_of_likes}
                                        containerStyle={{
                                            paddingHorizontal: 0,
                                            paddingVertical: 0,
                                            marginLeft: SIZES.radius
                                        }}
                                        iconStyle={{
                                            width: 20,
                                            height: 20,
                                            tintColor: COLORS.secondary
                                        }}
                                        labelStyle={{
                                            marginLeft: 3,
                                            color: appTheme?.textColor5,
                                            ...FONTS.h4
                                        }}
                                    />

                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            color: appTheme?.textColor5,
                                            ...FONTS.h4
                                        }}
                                    >
                                        {item?.posted_on}
                                    </Text>
                                </View>
                            }
                            replies={
                                <FlatList
                                    data={item?.replies}
                                    scrollEnabled={false}
                                    keyExtractor={item => `Discussions-replies-${item.id}`}
                                    renderItem={({ item, index }) => (
                                        <CommentSection
                                            appTheme={appTheme}
                                            commentItem={item}
                                            commentOption={
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginTop: SIZES.radius,
                                                        paddingVertical: SIZES.base,
                                                        borderTopWidth: 1,
                                                        borderBottomWidth: 1,
                                                        borderColor: COLORS.gray20
                                                    }}
                                                >
                                                    <IconLabelButton
                                                        icon={icons.reply}
                                                        label="Reply"
                                                        containerStyle={{
                                                            paddingHorizontal: 0,
                                                            paddingVertical: 0,
                                                        }}
                                                        iconStyle={{
                                                            width: 20,
                                                            height: 20,
                                                            tintColor: appTheme?.textColor5,
                                                        }}
                                                        labelStyle={{
                                                            marginLeft: 5,
                                                            color: appTheme?.textColor5,
                                                            ...FONTS.h4
                                                        }}
                                                    />

                                                    <IconLabelButton
                                                        icon={icons.heart_off}
                                                        label="Like"
                                                        containerStyle={{
                                                            paddingHorizontal: 0,
                                                            paddingVertical: 0,
                                                            marginLeft: SIZES.radius
                                                        }}
                                                        iconStyle={{
                                                            width: 20,
                                                            height: 20,
                                                            tintColor: appTheme?.textColor5,
                                                        }}
                                                        labelStyle={{
                                                            marginLeft: 3,
                                                            color: appTheme?.textColor5,
                                                            ...FONTS.h4
                                                        }}
                                                    />

                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                            textAlign: 'right',
                                                            color: appTheme?.textColor5,
                                                            ...FONTS.h4
                                                        }}
                                                    >
                                                        {item?.posted_on}
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    )}
                                />
                            }
                        />
                    )}
                />
            </View>
        )
    }

    function renderFooterTextInput() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: footerPosition,
                    left: 0,
                    right: 0,
                    height: footerHeight,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor8
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: SIZES.base,
                        color: appTheme?.textColor,
                        ...FONTS.body3,
                    }}
                    multiline={true}
                    placeholder="Type Something"
                    placeholderTextColor={appTheme?.textColor3}
                    onContentSizeChange={(event) => {
                        const height = event.nativeEvent.contentSize.height

                        if (height <= 60) {
                            setFooterHeight(60)
                        } else if (height > 60 && height <= 100) {
                            setFooterHeight(height)
                        } else if (height > 100) {
                            setFooterHeight(100)
                        }
                    }}
                />

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <IconButton
                        icon={icons.send}
                        iconStyle={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.primary
                        }}
                        containerStyle={{
                            width: 25,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </View>
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
            {/* Discussions */}
            {renderDiscussions()}

            {/* Footer */}
            {renderFooterTextInput()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseDiscussions);