import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import ProductListItem from '../Products/ProductListItem'
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';
import ItemsList from '../Shared/ItemsList';
import SelectOrder from '../Shared/SelectOrder';

const ProductList = () => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [sortedBy, setsortedBy] = useState('');
    const [products, setProducts] = useState([]);
    let totalProducts = 5;
    const [pageState, setPageState] = useState(1);
    let page = 1;
    const itemsPerPage = 3;
    const productsSearchCriteria = [
        {
            text: "menor precio",
            value: "priceMin",
        },
        {
            text: "mayor precio",
            value: "priceMax",
        },
        {
            text: "mas cercano",
            value: "closest",
        }
    ];
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        fetch('http://localhost:3004/user')
            .then(res => res.json())
            .then(
                (result) => {
                    setUser(result)
                },
                (error) => {
                }
            );

        fetch('http://localhost:3004/products?_page=1&_limit=' + itemsPerPage)
            .then(res => res.json())
            .then(
                (result) => {
                    setProducts(result);
                    setStatus("fetched")
                },
                (error) => {
                    setStatus("error")
                    setError(error);
                }
            );

    }, [])

    function handleSearch(event) {
        const query = event.target.value;
        if (query.length >= 3) {
            fetch('http://localhost:3004/products?q=' + query + '&_page=1&_limit=2')
                .then(res => res.json())
                .then(
                    (result) => {
                        setProducts(result)
                        setStatus("fetched")
                        totalProducts = 2;//hardcoded por ahora
                        setPageState(1)
                    },
                    (error) => {
                    }
                );
        } else if (query.length === 0) {
            fetch('http://localhost:3004/products?_page=1&_limit=' + itemsPerPage)
                .then(res => res.json())
                .then(
                    (result) => {
                        setProducts(result);
                        setStatus("fetched")
                        totalProducts = 5;//hardcoded por ahora 
                    },
                    (error) => {
                        setStatus("error")
                        setError(error);
                    }
                );
        }
    };

    function handleSortClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        if (e.target.value === 'priceMax') {
            setProductsSortedBy('price', 'desc');
        } else if (e.target.value === 'priceMin') {
            setProductsSortedBy('price', 'asc');
        } else if (e.target.value === 'closest') {
            setProductsSortedBy('price', 'asc');
        }
    }

    function setProductsSortedBy(filter, order) {
        const sortedBy = '&_sort=' + filter + '&_order=' + order
        setsortedBy(sortedBy);
        fetch('http://localhost:3004/products?_page=1&_limit=' + itemsPerPage + sortedBy)
            .then(res => res.json())
            .then(
                (result) => {
                    setProducts(result);
                    setPageState(1);
                    setStatus("fetched")
                },
                (error) => {
                    setStatus("error")
                    setError(error);
                }
            )
    }

    function loadNextPage() {
        fetch('http://localhost:3004/products?_page=' + page + '&_limit=' + itemsPerPage + sortedBy)
            .then(res => res.json())
            .then(
                (result) => {
                    setProducts([...result]);
                    setStatus("fetched")
                },
                (error) => {
                    setStatus("error")
                    setError(error);
                }
            )
    }

    function handlePageClick(event, value) {
        page = value;
        setPageState(value);
        loadNextPage()
    };


    return (

        <>
            <div>
                <div>Buscar:<input onChange={handleSearch}></input>
                </div>
                {status === 'error' && <div>{ }</div>}
                {status === 'fetching' && <div>loading</div>}
                {status === 'fetched' && (
                    <>
                        <SelectOrder searchCriteria={productsSearchCriteria} handleClick={handleSortClick} />
                        <ItemsList ItemComponent={<ProductListItem />} items={products} route={'product'} />
                        <Pagination count={Math.round(totalProducts / itemsPerPage)} page={pageState} onChange={handlePageClick} />
                    </>)
                }
            </div>
            <div>
                <Link to={{ pathname: '/publicar/' }}>
                    <Button variant="contained" color="primary">Agregar producto</Button>
                </Link>
            </div>
        </>
    )
};



export default ProductList;
