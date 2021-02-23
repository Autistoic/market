import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import { useParams } from "react-router-dom";
import {
    Route,
    Link
} from "react-router-dom";
import QuestionsList from '../Shared/QuestionsList';
import  QuestionsModal from '../Questions/QuestionsModal';
import Button from '@material-ui/core/Button';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const productDetailsResponse = useFetch("http://localhost:3004/products_details?product_id=" + id);
    const productDetails = productDetailsResponse;
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3004/products/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setProduct(result)
                    setStatus('fetched')
                },
                (error) => {
                }
            )
    }, [])

    const saveQuestion = e => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id": 1,
                "text": input,
                "product_id": id
            })
        };
        fetch('http://localhost:3004/questions/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data.id));

    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>{status === 'fetched' && (
            <>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <h3>Imagenes</h3>
                <img width='160' height='160' src={product.imgs[0]} />
                <h3>Preguntas</h3>
                <div>
                    <QuestionsList searchBy={'product_id'} id={id}></QuestionsList>
                    <Button variant="contained" onClick={handleOpen}>
                            Ver mais preguntas
                        </Button>
                        <QuestionsModal open={open} handleClose={handleClose}/>
                </div>
                <h3>Nueva pregunta</h3>
                <textarea value={input} onInput={e => setInput(e.target.value)} />

                <button onClick={saveQuestion}>Enviar pregunta</button>
                <div>
                    <button onClick={saveQuestion}>Comprar</button>
                </div>
            </>)
        }
        </>
    );
};






export default ProductDetail;
