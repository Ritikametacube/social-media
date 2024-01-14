import React, { useEffect, useState } from 'react'
import { ScrollView, View, Button, StyleSheet, Text, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const dummyItems = [
    {
        id: 1,
        img: require('./assets/headphones.jpg'),
        name: 'headphones',
        price: 1900
    },
    {
        id: 2,
        img: require('./assets/iPhone.jpg'),
        name: "Iphone",
        price: 14000
    },
    {
        id: 3,
        img: require('./assets/laptop.jpg'),
        name: 'Laptop',
        price: 75000
    },
    {
        id: 4,
        img: require('./assets/purse.jpg'),
        name: "Purse",
        price: 1850
    },
    {
        id: 5,
        img: require('./assets/shoes.jpg'),
        name: 'Shoes',
        price: 1600
    },
    {
        id: 6,
        img: require('./assets/shoes2.jpg'),
        name: "New Shoes",
        price: 2400
    },
    {
        id: 7,
        img: require('./assets/tshirt.jpg'),
        name: "T-shirt",
        price: 799
    },
    {
        id: 8,
        img: require('./assets/tablet.jpg'),
        name: "Tablet",
        price: 39000
    },
    {
        id: 9,
        img: require('./assets/trowsers2.jpg'),
        name: "Trousers",
        price: 999
    },
    {
        id: 10,
        img: require('./assets/smartwatch.jpg'),
        name: "Smart-Watch",
        price: 1900
    }
]

const Cart = ({ navigation }) => {
    const route = useRoute();
    const items = route.params

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems(items)
    }, [items])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ alignItems: "center", width: "90%", marginTop: 10, marginBottom: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginLeft: 30, marginRight: 110, color: "black", fontSize: 18 }}>Shopping Cart</Text>
                    <Button onPress={() => navigation.navigate('Home')} title='Go to Items' />
                </View>
                {cartItems.map((item, index) => (
                    item > 0 && <View key={index} style={styles.card}>
                        <Image style={styles.image} source={dummyItems[index].img} />
                        <View style={{ width: wp('70%') }}>
                            <Text style={styles.name}>{dummyItems[index].name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.price}>{`₹${dummyItems[index].price}`}</Text>
                                <Text style={{ ...styles.price, marginRight: 30 }}>Total: {`₹${dummyItems[index].price * item}`}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f0eded",
        width: wp("90%"),
        marginTop: 10,
        marginLeft: 30,
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        height: 70,
        width: 70,
        marginRight: 10
    },
    name: {
        color: "black",
        fontSize: 20,
        marginBottom: 10
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
    button: {
        width: 400,
        borderRadius: 10
    }
})

export default Cart