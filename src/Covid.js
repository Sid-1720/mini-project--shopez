import "./Covid.css"
import React from 'react'
import { useState ,useEffect } from 'react';
import { MenuItem,FormControl,Select,Card,CardContent, } from '@material-ui/core';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData,prettyPrintStat } from "./util";
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css";
import "./Map.css"
import "./InfoBox.css";



function Covid() {
    const [countries, setCountries] = useState([]);
    const [country , setCountry]=useState('worldwide');
    const [countryInfo ,setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter ,setMapCenter ] = useState({ lat: 34.80746, lng: -40.4796 })
     const [mapZoom, setMapZoom] = useState(3);
     const [mapCountries,setMapCountries ] =useState([]);
    

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })

    }, [])
    useEffect(() => {
    
        const getCountriesData  = async() => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) =>({    
                    name: country.country,
                    value: country.countryInfo.iso2,
                }));

             const sortedData=sortData(data)
             setTableData(sortedData);
             setCountries(countries); 
             setMapCountries(data);
            });
        };
        getCountriesData();

       

     },[]);
     const onCountryChange =  async (event) => {
        const countryCode =event.target.value;
        console.log("YOOOO",countryCode);

        setCountry(countryCode);
        const url=countryCode==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountry(countryCode);

            setCountryInfo(data);

            if(countryCode === 'worldwide'){
                setMapCenter([34.80746, -40.4796])}else{
              setMapCenter([data.countryInfo.lat, data.countryInfo.long]);}
              if(countryCode === 'worldwide'){
                setMapZoom(3)}else{
                  setMapZoom(4)};
    
    
        });

    };
    console.log(countryInfo);

    return (
        <div className='ap-main'>
            <div className="app-left">
                 <div className="app_header">

                <h1>Covid-19 Tracker</h1> 
                
                    <FormControl className='app_dropdown'>
                    <Select variant='outlined'  onChange={onCountryChange} value={country}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map((country) => (
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))}
            
            
                    </Select>
                    </FormControl>
                </div>
                
                {/* Header*/}

                {/*title*/}

                <div className="app-stats">
                {/*infobox* covid cases*/}
                <InfoBox
                isRed    
                active={casesType==='cases'}
                onClick={e=>setCasesType('cases')}
                title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
                {/*infobox* recoveries*/}
                <InfoBox 
                active={casesType==='recovered'}
                onClick={e=>setCasesType('recovered')}
                title="Recoveries" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
                {/*infobox*/}
                <InfoBox 
                isRed
                active={casesType==='deaths'}
                onClick={e=>setCasesType('deaths')}
                title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>

                </div>
                

               
                {/*  map*/ }
                <Map
                    casesType={casesType}
                    countries={mapCountries}
                   center={mapCenter}
                   zoom ={mapZoom} 
                />
            </div>
        <Card className="app-right">
            <CardContent>
               <h3>Live Cases by Country</h3> 
                <Table countries={ tableData } />
            </CardContent>
            {/*table*/}
            

            {/*graph*/}
            
            <LineGraph  casesType={casesType} />

        </Card>
        
        </div>

    )
}

export default Covid
