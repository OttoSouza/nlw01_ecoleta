import React from "react";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { AppLoading } from "expo";
export default function App() {
  const [fontloaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontloaded) {
    //sinal de carregamento do app, ira ficar girando tipo um bolinha
    return <AppLoading />;
  }

  return (
    <>
      {/* 'barStyle' é a cor para o IOS, 'backgrounColor' para o ANDROID, 
      'translucent' para o conteudo nao ficar por cima da statusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}
