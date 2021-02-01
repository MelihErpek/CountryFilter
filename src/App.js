import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

import { Table } from 'react-bootstrap';


function App() {
  let result;
  const [data, setData] = useState([]); // Gerekli değişkenler tanımlanıyor.
  const [capital, setCapital] = useState();
  const [general, setGeneral] = useState();
  const url = "https://restcountries.eu/rest/v2/all";

  useEffect(() => { 
    axios.get(url).then(json => setData(json.data)) // useEffect ile sayfa yüklendikten sonra ilk olarak axios isteği ile api erişimi sağlanıyor ve veriler elde ediliyor.
    setGeneral(""); // tablonun ilk başta boş olmaması için değişkene  boşluk atanıyor
    
  }, [])
  
  const renderTable = () => {
    if (capital) { // başkent girildiyse
      result = data.filter(word => word.capital.includes(capital)); // filter fonksiyonuyla girilen capital stringi apidan elde edilen bilgilerde var mı bakılıyor 
      return result.map(country => { // varsa elde edilen objenin bilgilerine göre ekrana tablo bastırılıyor.
        return (
          <tr>
            <td>{country.name}</td>
            <td>{country.capital}</td>
            <td>{country.region}</td>
            <td><img className="img-fluid rounded" src={country.flag} style={{ height: 150, width: 150 }} alt="" /></td>
          </tr>
        )
      })
    }
    else{
      result = data.filter(word =>Object.values(word).toString().includes(general)) // general değişkeni stringe çevriliyor çünkü eğer obje olarak kalsaydı filter fonksiyonu bire bir eşleşmeye bakacaktı stringe çevrildiği için kelimelerin içerisinde var mı onada bakıyor, filter fonksiyonuyla girilen general stringi apidan elde edilen bilgilerde var mı bakılıyor
      return result.map(country => { // varsa elde edilen objenin bilgilerine göre ekrana tablo bastırılıyor.
        return (
          <tr>
            <td>{country.name}</td>
            <td>{country.capital}</td>  
            <td>{country.region}</td>
            <td><img className="img-fluid rounded" src={country.flag} style={{ height: 150, width:150 }} alt="" /></td>
          </tr>
        )
      })
    }

  }
  return (
    <div className="App">
      <div className="row"> 
        <div className="col-md-6">
          <h1>Başkentlere Göre Arama</h1>
          <input type="text" onChange={e => setCapital(e.target.value)} />
        </div>
        <div className="col-md-6">
          <h1>Genel Arama</h1>
          <input type="text" onChange={e => setGeneral(e.target.value)} />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 350 }}>Name</th>
            <th style={{ width: 350 }}>Capital</th>
            <th style={{ width: 350 }}>Region</th>
            <th style={{ width: 350 }}>Flag</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </Table>
    </div>
  );
}

export default App;
