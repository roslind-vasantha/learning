import { useState, useEffect } from "react";
import axios from "axios";
import { da, faker } from "@faker-js/faker";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    // setInterval(fetchData, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sensor");
      // console.log(response.data, "res");
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(data, "data");

  // console.log(faker.date.anytime(), "time");

  return (
    <>
      <div>
        <p>MacAddress: {data.MacAddress}</p>
        <p>DewPointC: {faker.number.float({ max: 100, precision: 0.01 })}</p>
        <p>DewPointF: {faker.number.float({ max: 100, precision: 0.01 })}</p>
        <p>Humidity: {faker.number.float({ max: 100, precision: 0.01 })}</p>
        <p>TemperatureC: {faker.number.float({ max: 100, precision: 0.01 })}</p>
        <p>TemperatureF: {faker.number.float({ max: 100, precision: 0.01 })}</p>
      </div>
    </>
  );
}

export default App;
