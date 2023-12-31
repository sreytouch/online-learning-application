import React from 'react';
import moment from 'moment';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";

import {
    IconLabel
} from "../components";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const VerticalCourseCard = ({ containerStyle, course, appTheme }) => {
    return (
        <TouchableOpacity
            style={{
                width: 270,
                ...containerStyle
            }}
        >
            {/* Thumbnail */}
            <Image
                source={require("../assets/images/thumbnail_1.png")}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: 150,
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius
                }}
            />

            {/* Details */}
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                {/* Play Icon */}
                <View
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={icons.play}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </View>

                {/* Info */}
                <View
                    style={{
                        flexShrink: 1,
                        paddingHorizontal: SIZES.radius,
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: appTheme?.textColor,
                            ...FONTS.h3,
                            fontSize: 18
                        }}
                    >
                        {course.title}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={moment(course.dateTime).utc().format('YYYY-MM-DD')}
                        containerStyle={{
                            marginTop: SIZES.base
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerticalCourseCard);