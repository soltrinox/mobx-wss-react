import React, { useContext, useEffect } from "react";
import { coinsContext } from "./CoinsStore";
import { globalContext } from "./GlobalStore";
import { useObserver } from "mobx-react-lite";

const CoinsTable = () => {
  // const { startSocket, readSocket, fetchCoins, coins } = useContext(
  //   coinsContext
  // );
  const { coinsStore } = useContext(globalContext);
  const { startSocket, readSocket, fetchCoins, coins } = coinsStore;

  useEffect(() => {
    fetchCoins()
      .then(() => startSocket())
      .then(() => readSocket());
  }, [fetchCoins, startSocket, readSocket]);

  return useObserver(() => (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Coins</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(coins).map((coin, idx) => (
          <tr key={coin}>
            <td>{idx + 1}.</td>
            <td>{coins[coin].symbol}</td>
            <td>{coins[coin].priceUsd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
};

export default CoinsTable;
