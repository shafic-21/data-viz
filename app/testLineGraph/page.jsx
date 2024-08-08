import React from 'react'
import DynamicLineGraph from '../components/DynamicLineGraph'
const dataset = [
  //testing with eastern values
  { name: "Burundi", number: 0.9 },
  { name: "Comoros", number: 0.4 },
  { name: "Djibouti", number: 10 },
  { name: "Eritrea", number: 10 },
  { name: "Ethiopia", number: 39.5 },
  { name: "Kenya", number: 19.9 },
  { name: "Madagascar", number: 3.1 },
  { name: "Malawi", number: 2.4 },
  { name: "Mauritius", number: 0.4 },
  { name: "Mozambique", number: 10 },
  { name: "Rwanda", number: 3.2 },
  { name: "Seychelles", number: 0.1 },
  { name: "Somalia", number: 10 },
  { name: "South Sudan", number: 10 },
  { name: "Tanzania", number: 16.2 },
  { name: "Uganda", number: 10.6 },
  { name: "Zambia", number: 0.9 },
  { name: "Zimbabwe", number: 10 },
];

const page = () => {
  return (
    <div className='text-white grid place-items-center h-screen'>
     <DynamicLineGraph CurrentData={dataset}/>
    </div>
  )
}

export default page
