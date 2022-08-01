import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import ProductCard from '../../components/productCard/ProductCard';
import Navigationbar from '../../components/NavigationBar/Navigationbar';
import Footer from '../../components/Footer/Footer';
import { useQuery } from '@apollo/client';
import { GET_ALL_DISCS } from '../../queries/DiscQueries';


function Products() {
  const [discList, setDiscList] = useState([])
  const {loading, error} = useQuery(GET_ALL_DISCS, {
    onCompleted: (data) => setDiscList(data.allDiscs)
  })
    
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error! {error.message}</div>
    }


  return (
    <div className='products-page-container'>
      <Navigationbar />

      <div className='products-centering-container'>
        <div className='products-container'>
        { discList.map((disc, index) => 
            <Link to={`/products/${disc.name}`} state={{disc: disc}} style={{  color: 'inherit', textDecoration: 'inherit'}}><ProductCard id={disc.id} name={disc.name} manufacture={disc.manufacture} price={disc.price} image={disc.image} /></Link>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Products