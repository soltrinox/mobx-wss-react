import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const coinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    coins: {},
    socket: null,

    setCoinsData(data) {
      for (let i = 0; i < data.length; i++) {
        store.coins[data[i].id] = data[i];
      }
    },

    changeCoinsPrices(newPrices) {
      for (let coinId in newPrices) {
        if (store.coins[coinId]) {
          store.coins[coinId].priceUsd = newPrices[coinId];
        }
      }
    },

    fetchCoins() {
      return fetch("https://api.coincap.io/v2/assets")
        .then(res => res.json())
        .then(json => store.setCoinsData(json.data));
    },

    startSocket() {
      store.socket = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");
      store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
    },

    readSocket() {
      store.socket.onmessage = evt => {
        const newPrices = JSON.parse(evt.data);
        store.changeCoinsPrices(newPrices);
      };
    }
  }));

  return (
    <coinsContext.Provider value={store}>{children}</coinsContext.Provider>
  );
};
