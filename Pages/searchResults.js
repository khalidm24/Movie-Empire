import { View, Text, Button, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult } from '../redux/actions/movies'

const SearchResults = ({ navigation, moviesState, addToSearchResult, addToHistory, clearSearchResult, route }) => {
  const { searchtext } = route.params;
  const url = "https://www.omdbapi.com/?s=" + searchtext + "&page=1-100&apikey=ee42d47b"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        json.Search.map(movie => {
          addToSearchResult(movie)
        });
      });
  }, []);

  const renderSearchResults = ({ item }) => (
    <View>
      <Text>{item.Title}</Text>
      <Button title="Details" onPress={() => {
        addToHistory(item)
        navigation.navigate("Movie Details", { id: item.imdbID })
      }} />
    </View>
  );

  return (
    <View>
      <Text>Showing Results For: {searchtext}</Text>
      <FlatList data={moviesState.searchResult} renderItem={renderSearchResults} />
      <Button title="Back" onPress={() => {
        clearSearchResult()
        navigation.navigate("Home")
      }} />
    </View>
  )
}

const mapStateToProps = (moviesState) => (moviesState)
const mapDispatchToProps = { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult }

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)