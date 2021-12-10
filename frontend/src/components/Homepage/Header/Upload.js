import './BasketStyle.css'
import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
function Upload(props) {

  const {item, setItem, items, setItems } = props;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);

    setItems(items=> [...items, result]);
  }


    const url = "http://localhost:9002/items";

    const createItem = async(item)=>{
      try {
          const {data} = await axios.post(url, item);
          return data
      } catch (error) {
          console.log(error)
      }
      }

  return (
    <div className="blockCart col-1">
      <form action="" onSubmit={onSubmitHandler}>
        <input type="text" placeholder="Name of Product" className="input-field"

          onChange={e => setItem({ ...item, title: e.target.value })}
          
        />
        <input type="text" placeholder="Price of Product" className="input-field"

          onChange={e => setItem({ ...item, price: e.target.value })}
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItem({ ...item, image: base64 })}
        />
        <div className="right-align">
        <div className="buttonRow">
        <button className="checkoutButton">Upload</button>
        </div>
        </div>
      </form>
      
    </div>
  );
}

export default Upload;
