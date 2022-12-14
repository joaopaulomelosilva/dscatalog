import ProductCard from 'components/ProductCard';
import { Product } from 'types/product';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';

import './styles.css';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import axios from 'axios';
import { AxiosParams } from 'types/vendor/axios';
import { BASE_URL } from 'Util/requests';
import CardLoader from './CardLoader';

const Catalog = () => {

  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    const params : AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12
      },
    }
    setIsLoading(true);
    axios(params).then(response => {
      setPage(response.data);
    }).finally(() => { setIsLoading(false)});
  }, [])



  return (
    <div className="container my-4 catalog-container">
      <div className='row catalog-title-container'>
        <h1>Catálogo de Produtos</h1>
      </div>
      <div className="row">
        {isLoading ? <CardLoader></CardLoader>: (page?.content.map(product => { 
          return(
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to='/products/1'>
                <ProductCard product={product} />
              </Link>
            </div>
          );
        }))}
      </div>

      <div className='row'>
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default Catalog;
