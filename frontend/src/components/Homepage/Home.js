import Header from './Header/Header.js'
import Main from './Main';

import { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {

  const products = [];
  const [item, setItem] = useState({ title: '', image: '', price: 0 });
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const [user, setLoginUser] = useState({})

  // console.log(cartItems)
  // let sendItem = {
  //   cart: cartItems, 
  //   _id: user._id
  // }
  // axios.post('http://localhost:9002/saveCart', cartItems);

  // const saveCart = async(cartItems)=>{
  //   try {
  //       const {data} = await axios.post('http://localhost:9002/saveCart', cartItems);
  //       return data
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  var s = {
    height : "1cm",
    width : "3cm"
  }

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setLoginUser(user)
  }

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    // console.log(cartItems)
    // axios.post('http://localhost:9002/saveCart', cartItems);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x

        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {

    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newProducts = items.filter((product) => {
        return Object.values(product.title)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newProducts);
    } else {
      setSearchResults(items);
    }
  };

  const url = "http://localhost:9002/items";

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log('fetch data', result)
      setItems(result)
    }
    fetchData()
  }, [])

  const getItems = async () => {
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="text-gray-400 bg-gray-900 body-font">
      <Header
        item={item}
        setItem={setItem}
        items={items}
        setItems={setItems}
        user={user}
        updateUser={updateUser}
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
      ></Header>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <Main
            item={item}
            setItem={setItem}
            items={items}
            setItems={setItems}
            user={user}
            updateUser={updateUser}
            products={searchTerm.length <= 0 ? items : searchResults}
            onAdd={onAdd}
            term={searchTerm}
            searchKeyword={searchHandler}
          ></Main>
          <br></br>
          <br></br>
          <hr></hr>
          
          <footer className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
              <img style = {s} className="imgLogo" src='http://localhost:9002/getIMG'/>
              </a>
              <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2021 foodStaX —
                <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">foodStax Developers</a>
              </p>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                <a className="text-gray-400">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-400">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-400">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-400">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>
          </footer>

        </div>
      </section>
    </div>
  );
}

export default Home;







