import { View, Text, Button } from 'react-native'
import React from 'react'

const Favourites = ({ navigation }) => {
  return (
    <View>
      <Text>favourites</Text>
      <Button title="Back" onPress={() => navigation.navigate("Home")} />
    </View>
  )
}

export default Favourites