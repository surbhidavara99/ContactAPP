import React, { useRef, useState } from 'react';
import {
    TouchableOpacity,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    ListRenderItem,
    SafeAreaView
} from 'react-native';
import DataArray from './../data.json';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


interface ImageList {
    id: string;
    image: string;
};

interface List {
    id: number;
    name: string,
    profession: string,
    about_me: string
};

const LISTDATA: List[] = DataArray;
const CATEGORIES: ImageList[] = [
    { id: '1', image: require('./Assests/Image/Allan_Munger.png') },
    { id: '2', image: require('./Assests/Image/Amanda_Brady.png') },
    { id: '3', image: require('./Assests/Image/Ashley_Mc_Carthy.png') },
    { id: '4', image: require('./Assests/Image/Carlos_Slattery.png') },
    { id: '5', image: require('./Assests/Image/Cecil_Folk.png') },
    { id: '6', image: require('./Assests/Image/Celeste_Burton.png') },
    { id: '7', image: require('./Assests/Image/Charlotte_Waltson.png') },
    { id: '8', image: require('./Assests/Image/Daisy_Phillips.png') },
    { id: '9', image: require('./Assests/Image/Erik_Nason.png') },
    { id: '10', image: require('./Assests/Image/Mauricio_August.png') },
];

const ContactList = () => {
    const imageListRef = useRef(null);
    const listRef = useRef(null);

    const [image, setimage] = useState(0);


    const onListRef = React.useRef(({ changed }) => {
        imageListRef.current.scrollToIndex({
            animated: true,
            index: changed[0].index,
        });
        setimage(changed[0].index);
    });
    const viewListRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderItem: ListRenderItem<ImageList> = ({ item, index }) => (


        <TouchableOpacity
            onPress={() => {
                listRef.current &&
                    listRef.current.scrollToIndex({ animated: true, index });
                setimage(index);
            }}>
            <Image
                source={item.image}
                style={styles.item(image === index)}
            />
        </TouchableOpacity>
    )
    const detailrenderItem: ListRenderItem<List> = ({ item }) => (
        <View style={[styles.item1]}>
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 60,
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                {item.name}
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>
                {item.profession}
            </Text>
            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>About me</Text>
            <Text style={{ textAlign: 'justify', marginTop: 10, fontSize: 15, lineHeight: 20 }}>
                {item.about_me}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFF' }}>
            <View style={styles.root}>
                <Text style={{ fontSize: 20 }}>Contact</Text>
                <FlatList
                    ref={imageListRef}
                    horizontal
                    data={CATEGORIES}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View
                style={{
                    height: height,
                    width: width,
                    alignSelf: 'center',
                }}>
                <FlatList
                    ref={listRef}
                    data={LISTDATA}
                    contentContainerStyle={{ paddingBottom: 250 }}
                    onViewableItemsChanged={onListRef.current}
                    viewabilityConfig={viewListRef.current}
                    renderItem={detailrenderItem}
                    keyExtractor={(item) => item.id}
                />

            </View>

        </SafeAreaView>
    );

};

// styles
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        marginTop: 30,
        left: 25
    },
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
    item: (isSelected) => ({
        width: width * 0.25,
        height: 95,
        backgroundColor: '#FFFF',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: isSelected ? '#87CEEB' : '#FFFF',
    }),
    item1: {
        height: height * 0.7,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#FFFF',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
    },
});

export default ContactList;
