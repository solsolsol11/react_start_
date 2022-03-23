import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers") // 정보 가져올 url
      .then((response) => response.json()) // url에서 가져온 정보를 json으로 변환
      .then((json) => {
        setCoins(json); // 변환된 json을 coins(빈 array)에 넣기
        setLoading(false); // loading 글자 지우기
      });
  }, []);
  return (
    //함수 사이에 string 삽입 시: `~`, string 사이에 인자나 함수 삽입 시: ${~}
    <div>
      <h1>The Coins!{loading ? "" : `${coins.length}`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <label htmlFor="USD">$USD :</label>
        <input value={setMoney} id="USD" type="number" />
      </div>
      <div>
        HOW :<input id="" type="text" disabled />
      </div>
    </div>
  );
}

export default App;
