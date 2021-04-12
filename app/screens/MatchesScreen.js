import React, { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes"
import matchesApi from "../api/matches"
import AuthContext from "../auth/context";


function MatchesScreen({navigation}) {
  const authContext = useContext(AuthContext)
  const user = authContext.user
  const [didMount, setDidMount] = useState(false);



  const [matches, setMatches] = useState([])
  const loadMatches = async () => {
    const response = await matchesApi.getMatches(user.id)
    setMatches(response.data)
  }


  useEffect(()=> {
    setDidMount(true);
    loadMatches()
    return () => setDidMount(false);
  }, [])

  if(!didMount) {
    return null;
  }

  console.log("M", matches)

  return (
    <Screen style={styles.screen}>
      <AppText style={styles.title}>Our Movie Matches</AppText>
      <FlatList
        data={matches}
        keyExtractor= {(movie) => {
          return movie.id;
        }}
        key={(movie) => {
          return movie.id;
        }}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            runtime={"Runtime: " + item.runtime}
            genre={"Genre: " + item.genre}
            image={item.image}
            onPress={()=> navigation.navigate(routes.MOVIE_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.darkBlue,
    marginBottom: 15,
    alignSelf: "center"
  }
});

export default MatchesScreen;
