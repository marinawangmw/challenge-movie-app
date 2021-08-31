import React, { useEffect, useState } from 'react';
import { Dimensions, View, FlatList } from 'react-native';
import { Hero, MovieList } from '@/components';
import { getTrending, getRecentlyAdded } from '@/controllers/MovieController';

export function Home() {
  const [movieLists, setMovieLists] = useState([]);

  const windowHeight = Dimensions.get('window').height;

  const getMovieLists = async () => {
    try {
      const responses = await Promise.all([getTrending(), getRecentlyAdded()]);
      const myList = responses[0].results.slice(10, 20);
      const trendingNow = responses[0].results.slice(0, 10);
      const recentlyAdded = responses[1].results.slice(0, 10);

      setMovieLists([
        { title: 'My List', movieList: myList },
        { title: 'Trending Now', movieList: trendingNow },
        { title: 'Recently Added', movieList: recentlyAdded },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieLists();
  }, []);

  const renderItem = (item) => <MovieList item={item.item} />;

  return (
    <View>
      <FlatList
        data={movieLists}
        renderItem={renderItem}
        keyExtractor={(_item, idx) => idx}
        ListHeaderComponent={Hero}
        ListHeaderComponentStyle={{ height: windowHeight * 0.8 }}
      />
    </View>
  );
}
