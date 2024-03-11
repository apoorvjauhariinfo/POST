import { CSSProperties } from 'react'
import "./ProductEntry.css";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Typography from '@mui/material/Typography';



const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const sourceTypeItems = [
    {
      id: "ORTHOPEDICS",
      name: "ORTHOPEDICS"
    },
    {
      id: "NEUROLOGY",
      name: "NEUROLOGY"
    },
    {
      id: "DENTAL",
      name: "DENTAL"
    },
    {
      id: "CARDIOLOGY",
      name: "CARDIOLOGY"
    },
    {
        id: "EAR NOSE AND THROAT",
        name: "EAR NOSE AND THROAT"
      },
      {
        id: "PATHOLOGY",
        name: "PATHOLOGY"
      },
      {
        id: "GASTROENTEROLOGY",
        name: "GASTROENTEROLOGY"
      },
      {
        id: "RESPIRATORY MEDICINE",
        name: "RESPIRATORY MEDICINE"
      },
      {
        id: "MICROBIOLOGY",
        name: "MICROBIOLOGY"
      },
      {
        id: "RADIOLOGY",
        name: "RADIOLOGY"
      },
      {
        id: "CUSTOM",
        name: "CUSTOM"
      },
  ];


const AddDepartment = () => {
    Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const firstInputRef = useRef();

  const toggleModalOpenState = () => {
    setModalIsOpen(state => !state);
  };

  const handleOnChange = e => {
    const { name, checked } = e.target;

    setSelectedItems(items => ({
      ...items,
      [name]: checked
    }));
  };
   

    
    
   

    return (
        <div>
            <section
                class="p-5 w-100"
                style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
            >
                <div class="row">
                    <div class="col">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-3">

                                <div class="row">
                                    <Stack spacing={2} direction="row">
                                        <Button variant="text">Department |</Button>
                                        <Button variant="text">Add User |</Button>
                                        <Button variant="text">Edit Account |</Button>
                                        <Button variant="text">Change Password </Button>
                                    </Stack>


                                </div>
                                <div class="row" align-items-center>
                                <button onClick={toggleModalOpenState}>Add Department</button>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={toggleModalOpenState}
                                        className="source-type-modal"
                                        aria-labelledby="source-type-dialog-label"
                                        onAfterOpen={() => {
                                            setTimeout(() => firstInputRef.current?.focus(), 0);
                                        }}
                                    ><Box sx={{ ...style, width: 400 }}>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                Choose Your Department's
                                            </Typography>
                                            <ul
                                            className="source-type-modal__list"
                                            role="group"
                                            aria-labelledby="source-type-dialog-label"
                                        >
                                            {sourceTypeItems.map((item, index) => (
                                                <li key={item.id} className="source-type-modal__list-item">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedItems[item.name] || false}
                                                            onChange={handleOnChange}
                                                            name={item.name}
                                                            ref={index === 0 ? firstInputRef : null}
                                                        />
                                                        {item.name}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="source-type-modal__controls">
                                            <button
                                                value="cancel"
                                                className="source-type-modal__control-btn source-type-modal__control-btn--cancel"
                                                onClick={toggleModalOpenState}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                value="apply"
                                                className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                                                onClick={() => {
                                                    console.log("applying source types");
                                                    console.log(
                                                        JSON.stringify(
                                                            Object.keys(selectedItems).reduce((items, key) => {
                                                                if (selectedItems[key]) {
                                                                    return [...items, key];
                                                                }
                                                                return items;
                                                            }, [])
                                                        )
                                                    );
                                                    toggleModalOpenState();
                                                }}
                                            >
                                                Proceed
                                            </button>
                                        </div>
                                  </Box>
                                        
                                    </Modal>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default AddDepartment;