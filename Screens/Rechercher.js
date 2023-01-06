import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import SerieItem from '../Components/SerieItem';
import SeriesRequest from '../Services/SeriesRequest';

export const Rechercher = () => {
  const [text, setText] = useState('');
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchSeries = async () => {
    setTimeout(async ()=> {
        let data = await SeriesRequest.getFilmsFromApiWithText(text, page);
    setSeries(data.results);
    setTotalPage(data.total_pages);
    setLoading(false);
    })
    
  };

  const handleChange = (e) => {
    setText(e);
  };

  const loadFilms = async () => {
    await SeriesRequest.getFilmsFromApiWithText(text, page+1).then((data) => {
      setPage(data.page);
      series.push(data.results)
    });
  };

  return (
    <View style={[styles.margin_top, styles.marginBottom]}>
      <TextInput
        style={[styles.textinput, styles.margin_top]}
        placeholder="Titre de la serie"
        onChangeText={(text) => handleChange(text)}
        onSubmitEditing={() => {
            setPage(1);
          setLoading(true);
          searchSeries();
        }}
      />
      <Button
        title="Rechercher"
        onPress={() => {
            setPage(1);
          setLoading(true);
          searchSeries();
        }}
      />

      {loading && <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
      {!loading && (
        <FlatList
          numColumns={3}
          data={series}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <SerieItem serie={item.item} />}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (page < totalPage) {
                console.log("ok");
              loadFilms();
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textinput: {
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
  },
  margin_top: {
    marginTop: 30,
  },
  marginBottom:{
    marginBottom:130
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 120,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
