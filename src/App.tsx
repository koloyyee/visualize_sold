import DRPicker from '../components/DRPicker';

import csv from 'csvtojson';
import ReactApexChart from 'react-apexcharts';

import {useState} from 'react';
import './App.css';


const path = '../data/RK-dish-sold-report.csv'


    const jsonObj = fetch(path)
      .then(response => response.text())
      .then(text => csv().fromString(text))
      .then(function(result){
        return result
      })

    const data = await jsonObj




  async function updateConfig(data:any[],  query:string ='', date: string ='', param:string ='Item name', descBySales:boolean = true){
    
    


    const filtered = data.filter( predicate => {
      return predicate['Item name'].toLowerCase().includes(query.toLowerCase()) && predicate['Date'].includes(date)

    })
    
   
    const grossSales = filtered.map(item=> item['Gross sales'])
    const itemName= filtered.map(item=> item['Item name'])
    
      const config ={
        series: [{
          data: grossSales?.slice(0,10),
        }],
        options: {
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: itemName?.slice(0, 10) , // top 5, 10, 20
            title: {
              text: 'Revenue($)'
            }
          }, 
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },

        }
      }

      return config;
  }
  const config = await updateConfig(data, 'Beast', '11/01/2022')
function App() {
  const [param, setParam] = useState('')
  const [configState, setConfigState] = useState (config)
  const [dateState, setDateState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

  function dateHandler(selection:[]){
    console.log(selection.map(x => (x.startDate, x.endDate)))
    setDateState(selection)
  }


  return (
    <div className="App" style={{width: '1000px'}}>
      <select name="parameter" id="" onChange={(e)=>setParam(e.target.value)}>
        <option value="Date">Date</option>
        <option value="Item name">Item name</option>
        <option value="Location">Location</option>
      </select>
    <DRPicker dateState={dateState} setDateState={dateHandler}/>
     <ReactApexChart options={configState.options} series={configState.series} type="bar" />
    </div>
  )
}

export default App
