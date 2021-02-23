import React, { useState } from 'react';
import QuestionsList from '../Shared/QuestionsList';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

export default function QuestionsModal({ open, handleClose }) {

    const classes = useStyles();
    
    let qnt = 5;
    return (
        <>
            {
                qnt >= 5 && (
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div style={getModalStyle()} className={classes.paper}>
                                <h2>Preguntas</h2>
                                <QuestionsList searchBy={'product_id'} id={1}></QuestionsList>
                            </div>
                        </Modal>
                    </div>

                )
            }
        </>
    )
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));