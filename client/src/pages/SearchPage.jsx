import React, { useEffect, useState } from 'react';
import CartLoading from '../components/CartLoading';
import SummeryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosTostError from '../utils/AxiosTosterror';
import CartProduct from '../components/CartProduct';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCart = new Array(10).fill(null);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get('q');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.SearchProduct,
        data: { search: searchText },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchData();
    }
  }, [searchText]);

  return (
    <section className='bg-white h-full'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Result: {data.length}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto p-4">
        {
          loading ? (
            loadingArrayCart.map((_, index) => (
              <CartLoading key={"loadingsearchpage" + index} />
            ))
          ) : (
            data.map((p, index) => (
              <CartProduct data={p} key={p?._id + "searchProduct" + index} />
            ))
          )
        }
      </div>
    </section>
  );
};

export default SearchPage;
