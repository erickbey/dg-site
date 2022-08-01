import { React, useState } from 'react';
import './AddDisc.css';
import { useMutation } from '@apollo/client';
import { ADD_DISC_MUTATION } from '../../../src/queries/DiscQueries'


function AddDisc() {
  const [name, setName] = useState("")
  const [manufacture, setManufacture] = useState("")
  const [category, setCategory] = useState("")
  const [plasticType, setPlasticType] = useState("")
  const [speed, setSpeed] = useState("")
  const [glide, setGlide] = useState("")
  const [turn, setTurn] = useState("")
  const [fade, setFade] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [image, setImage] = useState("")

  const [addDisc, { loading, error, data }] = useMutation(ADD_DISC_MUTATION, {onCompleted: () => console.log(data)})

  const handleSubmit = (e) => {
    e.preventDefault();
    addDisc({
        variables: {
            name,
            manufacture,
            category,
            plasticType,
            speed: Number(speed),
            glide: Number(glide),
            turn: Number(turn),
            fade: Number(fade),
            price: Number(price),
            quantity: Number(quantity),
            image
        }
    });
}

  return (

      <div className='input-centering-container'>
          <div className='input-container'>
              <h1>Add A Disc</h1>
              <form onSubmit={handleSubmit}>
                <select type="text" className='disc-info-input' defaultValue={'DEFAULT'} title="manufacture" onChange={(e) => setManufacture(e.target.value)}>
                  <option value='DEFAULT' disabled>Choose a Manufacture</option>
                  <option value='Innova'>Innova</option>
                  <option value='Discraft'>Discraft</option>
                  <option value='MVP'>MVP</option>
                  <option value='Dynamic Discs'>Dynamic Discs</option>
                  <option value='Latitude 64'>Latitude 64</option>
                  <option value='Disc Mania'>Disc Mania</option>
                  <option value='Prodigy'>Prodigy</option>
                  <option value='Westside'>Westside</option>
                  <option value='Thought Space Athletics'>Thought Space Athletics</option>
                  <option value='Clash'>Clash</option>
                  <option value='DGA'>DGA</option>
                </select><br/>
                <input type="text" className='disc-info-input' title="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                <select type="text" className='disc-info-input' defaultValue={'DEFAULT'} title="category" onChange={(e) => setCategory(e.target.value)}>
                  <option value='DEFAULT' disabled>Choose a Category</option>
                  <option value='Putt-Approach'>Putt & Approach</option>
                  <option value='Mid-Range'>Mid-Range</option>
                  <option value='Fairway'>Fairway Driver</option>
                  <option value='Distance'>Distance</option>
                </select><br/>
                <input type="text" className='disc-info-input' title="plastic" placeholder="Plastic Type" value={plasticType} onChange={(e) => setPlasticType(e.target.value)}/><br/>
                <label htmlFor="speed">Speed</label>
                  <input className='flight-numbers-input' type="number" name="speed" min="0" max="16" value={speed} onChange={(e) => setSpeed(e.target.value)}/><br/>
                <label htmlFor="speed">Glide</label>
                  <input className='flight-numbers-input' type="number" name="glide" min="0" max="7" value={glide} onChange={(e) => setGlide(e.target.value)}/><br/>
                <label htmlFor="speed">Turn</label>
                  <input className='flight-numbers-input' type="number" name="turn" min="-4" max="4" value={turn} onChange={(e) => setTurn(e.target.value)}/><br/>
                <label htmlFor="speed">Fade</label>
                  <input className='flight-numbers-input' type="number" name="fade" min="0" max="5" value={fade} onChange={(e) => setFade(e.target.value)}/><br/>
                <label htmlFor="speed">Price</label>
                  <input className='flight-numbers-input' type="number" name="price" min="0" max="10000" value={price} onChange={(e) => setPrice(e.target.value)}/><br/>
                <label htmlFor="speed">Quantity</label>
                  <input className='flight-numbers-input' type="number" name="quantity" min="0" max="1000" value={quantity} onChange={(e) => setQuantity(e.target.value)}/><br/>
                {/* <label className='photo-label' htmlFor='photo'>Add a photo of the disc</label>
                  <input type='file' accept='image/*' id='photo' name='photo' /> */}
                  <input type="text" className='disc-info-input' title="image" placeholder="image" value={image} onChange={(e) => setImage(e.target.value)}/><br/>
                <button type="submit" className='add-button' >Add Disc</button>
              </form>
          </div>
      </div>

  )
}



export default AddDisc