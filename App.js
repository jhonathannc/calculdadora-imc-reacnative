import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {

  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor: '#BDC3C7'
  }

  calcularIMC = () => {
    const peso = this.state.peso.replace(',','.') //substitui virgula por ponto
    const altura = this.state.altura.replace(',','.')

    const imc = Math.ceil( // Math.ceil() arrendonda o numero.
      peso / Math.pow(altura,2) ) /* Math.pow() eleva o expoente. No caso altura² */
    let legenda = ''
    let cor = ''

    switch (true) {
      case imc < 18.5 :
        legenda = 'Magreza'
        cor = '#F39C12'
        break
      case imc < 24.9 :
        legenda = 'Normal'
        cor = '#2ECC71'
        break
      case imc < 29.9 :
        legenda = 'Sobrepeso'
        cor = '#F1C40F'
        break
      case imc < 39.9 :
        legenda = 'Obesidade'
        cor = '#E74C3C'
        break
      case imc > 40 :
        legenda = 'Obesidade grave'
        cor = '#C0392B'
        break
    }

    this.setState({
      imc,
      legenda,
      cor
    })
  }

  render() {
    return (
      <View style={styles.app}>
        <Text style={styles.title}>Seu IMC</Text>
        <View style={[styles.painel, {backgroundColor: this.state.cor}]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.legenda}</Text>
        </View>
        <View>
          <TextInput
            placeholder="Peso. ex: 69,5"
            style={styles.peso} 
            onChangeText={(value) => { this.setState({peso: value}) }}
          />
          <TextInput
            placeholder="Altura. ex: 1,69"
            style={styles.altura}
            onChangeText={value => this.setState({altura: value}) }          
          />
          <Button mode="contained" onPress={this.calcularIMC} >
            Calcular
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5ECEB",
    padding: 15
  },
  title: {
    textAlign: "center",
    fontSize: 15
  },
  painel: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 15,
    width: 150,
    backgroundColor: "#BDC3C7",
    padding: 10,
    borderRadius: 7
  },
  resultado: {
    fontSize: 30,
    fontWeight: "500",
    color: "white"
  },
  diagnostico: {
    fontSize: 15,
    color: "white"
  },
  peso: {
    marginTop: 10
  },
  altura: {
    marginTop: 10,
    marginBottom: 10
  }
});
