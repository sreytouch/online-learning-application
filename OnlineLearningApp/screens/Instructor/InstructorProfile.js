import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Svg, { G, Circle } from "react-native-svg";
import { connect } from "react-redux";

import {
    IconButton,
    TextButton,
    // HorizontalCourseCard,
    LineDivider,
} from "../../components";
import HorizontalCourseCard from "../../components/HorizontalCourseCard";
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../constants";

const InstructorProfile = ({ appTheme, navigation }) => {

    const truncate = (input, length) => input.length > length ? `${input.substring(0, length)}...` : input;

    const [showMore, setShowMore] = React.useState(false); //To show remaining Text
    const [lengthMore, setLengthMore] = React.useState(false); //To show remaining Text

    const onAboutTextLayout = React.useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 3); //to check if "about me" is having more than 3 lines
    }, []);

    function renderHeader() {
        return (
            <View>
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
                    justifyContent: 'space-between',
                    height: 80,
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
                            borderRadius: 25
                        }}
                        onPress={() => navigation.goBack()}
                    />

                    {/* Share */}
                    <IconButton
                        icon={icons.share}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,

                        }}
                        onPress={() => console.log("share")}
                    />
                </View>
            </View>
        )
    }

    function renderInstructorInfo() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: -40,
                        height: 80,
                        width: 80,
                        alignSelf: 'center',
                    }}
                >
                    <Image
                        source={dummyData.instructorProfile.avatar}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                        }}
                    />
                    {
                        dummyData.instructorProfile.isVerified &&
                        <Image
                            source={icons.verified}
                            style={{
                                position: 'absolute',
                                bottom: -10,
                                height: 20,
                                width: 20,
                                alignSelf: 'center',
                            }}
                        />
                    }

                </View>

                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 60,
                        marginBottom: SIZES.radius
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: appTheme.textColor }}>{dummyData.instructorProfile.name}</Text>
                    <Text style={{ ...FONTS.body4, marginTop: SIZES.base, color: appTheme.textColor3 }}>{dummyData.instructorProfile.title}</Text>
                    <TextButton
                        label="+ Follow"
                        contentContainerStyle={{
                            width: 80,
                            height: 35,
                            borderRadius: 20,
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                            backgroundColor: appTheme.backgroundColor1,
                            marginTop: SIZES.radius,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color: COLORS.primary,
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderInstructorStats() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SIZES.radius }}>
                {
                    dummyData.instructorProfile.stats.map((item, index) => (
                        <View
                            key={`stat-${index}`}
                            style={{
                                flex: 1,
                                height: 80,
                                backgroundColor: item.color,
                                marginHorizontal: (index != 0 && index != dummyData.instructorProfile.stats.length - 1) ? SIZES.radius : 0,
                                borderRadius: SIZES.radius,
                                borderColor: item.borderColor,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{
                                ...FONTS.h2,
                            }}>
                                {item.value}
                            </Text>
                            <Text style={{
                                ...FONTS.h4,
                            }}>
                                {item.title}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function renderAboutMe() {
        return (
            <View style={{ marginTop: SIZES.radius }}>
                <Text
                    style={{
                        ...FONTS.h2,
                        marginBottom: SIZES.base,
                        color: appTheme.textColor
                    }}
                >
                    About Me
                </Text>

                <Text
                    style={{
                        textAlign: 'justify',
                        color: appTheme.textColor3,
                        ...FONTS.body4,
                    }}
                    onTextLayout={onAboutTextLayout}
                    numberOfLines={!showMore ? 3 : null}
                >
                    {dummyData.instructorProfile.aboutMe}
                </Text>

                {lengthMore &&
                    <View
                        style={{
                            alignItems: 'flex-start'
                        }}
                    >
                        <TextButton
                            label={showMore ? "Show Less" : "Show More"}
                            contentContainerStyle={{
                                backgroundColor: null,
                                marginVertical: SIZES.radius,
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.h3
                            }}
                            onPress={() => setShowMore(!showMore)}
                        />
                    </View>
                }
            </View>
        )
    }

    function renderRatings() {

        let totalRatings = (dummyData.instructorProfile.ratings).reduce((a, b) => a + (b.count || 0), 0)

        let totalSatisfiedCount = dummyData.instructorProfile.ratings.filter(a => [1, 2].includes(a.id)).reduce((a, b) => a + (b.count || 0), 0)

        let totalSatisfiedPerc = (totalSatisfiedCount / totalRatings * 100).toFixed(0)

        const radius = 60;
        const circleCircumference = 2 * Math.PI * radius;

        const strokeDashoffset =
            circleCircumference - (circleCircumference * totalSatisfiedPerc) / 100;

        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h2, marginBottom: SIZES.base, color: appTheme.textColor }}>Student Rating</Text>

                <View
                    style={{
                        ...styles.shadowStyle,
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: appTheme.backgroundColor13,
                            height: 60,
                            borderTopLeftRadius: SIZES.radius * 1.5,
                            borderTopRightRadius: SIZES.radius * 1.5,
                            alignItems: 'center',
                            padding: SIZES.base,
                        }}
                    >
                        {/* Chart */}
                        <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center", }}>
                            <Svg height="60" width="60" viewBox="0 0 180 180">
                                <G rotation={-90} originX="90" originY="90">
                                    <Circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke={COLORS.gray20}
                                        fill={COLORS.white}
                                        strokeWidth="20"
                                    />
                                    <Circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke={COLORS.primary}
                                        fill={COLORS.white}
                                        strokeWidth="20"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                    />
                                </G>
                            </Svg>
                            <Text style={{ position: 'absolute', textAlign: 'center', ...FONTS.h5 }}>{totalSatisfiedPerc}%</Text>
                        </View>

                        <Text style={{ ...FONTS.h3, color: COLORS.white, marginLeft: SIZES.base }}>Students satisfied with courses</Text>
                    </View>

                    {/* Content */}
                    <View
                        style={{
                            marginTop: SIZES.base,
                            borderWidth: 1,
                            borderColor: appTheme.borderColor1,
                            backgroundColor: appTheme.backgroundColor1,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: SIZES.base,
                            }}
                        >
                            {
                                dummyData.instructorProfile.ratings.map((item, index) => (
                                    <View
                                        key={`rt-${index}`}
                                        style={{
                                            height: 10,
                                            backgroundColor: item.color,
                                            width: `${item.count / totalRatings * 100}%`,
                                            borderColor: appTheme.backgroundColor1,
                                            borderTopLeftRadius: index == 0 ? 5 : 0,
                                            borderBottomLeftRadius: index == 0 ? 5 : 0,
                                            borderTopRightRadius: index == dummyData.instructorProfile.ratings.length - 1 ? 5 : 0,
                                            borderBottomRightRadius: index == dummyData.instructorProfile.ratings.length - 1 ? 5 : 0,
                                            borderLeftWidth: (index != 0 && index != dummyData.instructorProfile.ratings.length - 1) ? 2 : 0,
                                            borderRightWidth: (index != 0 && index != dummyData.instructorProfile.ratings.length - 1) ? 2 : 0,
                                        }}
                                    />
                                ))
                            }
                        </View>

                        <FlatList
                            style={{
                                paddingHorizontal: SIZES.radius,
                            }}
                            data={dummyData.instructorProfile.ratings}
                            keyExtractor={(item, index) => `r-${item.id}-${index}`}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        height: 50,
                                    }}
                                >
                                    <Image
                                        source={item.icon}
                                        style={{
                                            tintColor: item.color,
                                            height: 20,
                                            width: 20,
                                            backgroundColor: COLORS.white,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ ...FONTS.h3, marginLeft: SIZES.base, color: appTheme.textColor7 }}>{item.description}</Text>
                                        <Text style={{ ...FONTS.h3, color: appTheme.textColor7 }}>{item.count}</Text>
                                    </View>
                                </View>
                            )}
                            ItemSeparatorComponent={() => (
                                <LineDivider />
                            )}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function renderReviews() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Text style={{ ...FONTS.h2, marginBottom: SIZES.base, color: appTheme.textColor }}>Student Reviews</Text>
                    <TextButton
                        label="See All"
                        onPress={() => navigation.navigate('Feedback')}
                        contentContainerStyle={{
                            height: 35,
                            width: 80,
                            borderRadius: 20,
                        }}
                    />
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={dummyData.instructorProfile.reviews}
                    keyExtractor={(item, index) => `c-${item.id}`}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                marginLeft: index == 0 ? SIZES.padding : 0,
                                marginRight: index == dummyData.instructorProfile.reviews.length - 1 ? SIZES.padding : SIZES.radius,
                                padding: SIZES.radius,
                                width: 250,
                                backgroundColor: appTheme.backgroundColor13,
                                borderRadius: SIZES.radius * 2,
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Image
                                    source={item.profile}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 10,
                                    marginLeft: 10,
                                }}
                            >
                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.name}</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.white }}>{truncate(item.comment, 100)}</Text>
                                <Text style={{ ...FONTS.h5, color: COLORS.white, marginTop: 5 }}>{item.posted_on}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }

    function renderConnectHere() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginBottom: SIZES.padding,
                        color: appTheme.textColor,
                        ...FONTS.h2,
                    }}
                >
                    Connect Here
                </Text>

                {
                    dummyData.instructorProfile.socialMedias.map((item, index) => (
                        <TouchableOpacity
                            key={`connect-${item.id}`}
                            style={{
                                flexDirection: 'row',
                                padding: SIZES.radius,
                                borderWidth: appTheme.name == "dark" ? 1 : 0,
                                borderColor: appTheme.borderColor1,
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                backgroundColor: appTheme.backgroundColor12,
                            }}
                        >
                            <Image
                                source={item.icon}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                            <Text style={{ flex: 1, color: appTheme.textColor5, marginLeft: SIZES.base, ...FONTS.body3 }}>{item.name}</Text>

                            <Image
                                source={icons.right_arrow}
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: appTheme.textColor,
                                }}
                            />
                        </TouchableOpacity>
                    ))
                }
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
                    backgroundColor: appTheme.backgroundColor1,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2
                }}
            >
                {/* Instructor Header Info */}
                {renderInstructorInfo()}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={dummyData.instructorProfile.courses.slice(0, 2)}
                    keyExtractor={(item, index) => `course-${item.id}`}
                    contentContainerStyle={{
                        paddingBottom: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View
                            style={{
                                paddingHorizontal: SIZES.padding
                            }}
                        >
                            {/* Stats */}
                            {renderInstructorStats()}

                            {/* About */}
                            {renderAboutMe()}

                            <LineDivider lineStyle={{ marginTop: SIZES.radius }} />

                            {/*  Course Header */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: SIZES.radius
                                }}
                            >
                                <Text style={{ color: appTheme?.textColor, ...FONTS.h2 }}>My Courses ({dummyData.instructorProfile.courses.length})</Text>
                                <TextButton
                                    label="See All"
                                    contentContainerStyle={{
                                        width: 80,
                                        height: 35,
                                        borderRadius: 20,
                                    }}
                                />
                            </View>
                        </View>
                    }
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                                paddingHorizontal: SIZES.padding,
                            }}
                            onPress={() => navigation.navigate("CourseDetails", { selectedCourse: item })}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                paddingHorizontal: SIZES.padding
                            }}
                        >
                            <LineDivider
                            />
                        </View>
                    )}
                    ListFooterComponent={
                        <View>
                            <LineDivider />

                            {/* Ratings */}
                            {renderRatings()}

                            {/* Reviews */}
                            {renderReviews()}

                            <LineDivider
                                lineStyle={{
                                    marginVertical: SIZES.padding
                                }}
                            />

                            {/* Social */}
                            {renderConnectHere()}
                        </View>
                    }
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorProfile);
