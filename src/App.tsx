import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Link from '@mui/material/Link';
import { useEffect, useState, createContext, useContext } from "react";

import jsonData from './data.json';

const loadData = JSON.parse(JSON.stringify(jsonData));
const urlRakuten = "https://fr.shopping.rakuten.com/"

interface Item {
  brand: string;
  href: string;
  title: string;
  newPrice: string;
  usedPrice: string;
  image: string;
}


interface DisplayProps {
  item: Item;
}

const ItemContext = createContext({
    users: [], fetchItems: () => {}
})

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      secondary: '#696969',
      primary: '#333',
    },
    action: {
      active: '#001E3C',
      brand: '#696969',
    },
    success: {
      dark: '#009688',
    },
  },
});


function DisplayBrand({item}: DisplayProps)
{
    return (<Box sx={{ color: 'text.secondary',
                       fontSize: 12,
                       fontWeight: 'bold'
            }}>{item["brand"]}
            </Box>
           );
}

function DisplayTitle({item}: DisplayProps)
{
    return (<Box sx={{ color: 'text.primary', 
                       fontSize: 14,
                       fontWeight: 'bold' }}>
                       <Link href={urlRakuten + item["href"]}
                           underline="hover"
                           color= "text.primary"> {item["title"] }</Link>
            </Box>);
}


function DisplayNewPrice({item}: DisplayProps)
{
    return(<Box sx={{ display: 'flex',  alignItems: 'baseline' }}>
                <Box sx={{ color: '#BF0000', 
                           display: 'inline',
                           fontSize: 20,
                           fontWeight: 'bold' }}>
                           {item["newPrice"] }
                </Box>

                <Box
                  sx={{
                    color: '#BF0000',
                    display: 'inline',
                    fontWeight: 'bold',
                    p: 0.5,
                    fontSize: 14,
                  }}> Neuf </Box>
            </Box>);
}


function DisplayUsedPrice({item}: DisplayProps)
{
    return (<Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                <Box sx={{ color: 'text.primary', 
                           display: 'inline',
                           fontSize: 14}}
                >Occasion dès </Box>
               <Box sx={{ color: 'text.primary', 
                          display: 'inline',
                          fontSize: 20,
                          fontWeight: 'bold',
                          p: 0.5}}
                >{item["usedPrice"]} </Box>
            </Box>);
}



function DisplayElement(item : Item) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          boxShadow: 2,
          borderRadius: 2,
          p: 2,
          m: 2,
          width: 343,
          minWidth: 343,
        }}>
          <Box
          component="img"
          sx={{
            display: 'inline',
            height: 120,
            width: 120,
          }}
          src={item["image"]}
         />
         <Box sx={{ display:'inline'}}>
            <DisplayBrand item={item} />
            <DisplayTitle item={item} />
            <DisplayNewPrice item={item} />
            <DisplayUsedPrice item={item} />
        </Box>
    </Box>

    </ThemeProvider>
  );
}



function CheckItem(item : Item) {
    if (item["brand"] != null && item["href"] != null 
        && item["title"] != null && item["newPrice"] != null && 
        item["usedPrice"] != null && item["image"] != null){
       return DisplayElement(item)
    }
    return;
}

function DisplayItems() {
    const [items, setItems] = useState([])
    const fetchItems = async () => {
        setItems(loadData);
    }

    useEffect(() => {
        fetchItems()
    }, [])


    return (<Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '100%',
          borderRadius: 2,
          p: 2,
        }}
      >
      {
          items.map((item)=> CheckItem(item))
      }
      </Box>
    );
}



export default function App() {
  return (
     <div>
        <DisplayItems />
     </div>
  );
}
