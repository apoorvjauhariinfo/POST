// Department.js
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Axios from "axios";
import LoaderOverlay from "../Loader/LoaderOverlay.js";

import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 29,
  pt: 2,
  px: 4,
  pb: 3,
};

const sourceTypeItems = [
  {
    id: "EMERGENCY_MEDICINE",
    name: "EMERGENCY MEDICINE",
  },
  {
    id: "ORTHOPEDICS",
    name: "ORTHOPEDICS",
  },
  {
    id: "NEUROLOGY",
    name: "NEUROLOGY",
  },
  
  {
    id: "CARDIOLOGY",
    name: "CARDIOLOGY",
  },
  {
    id: "EAR_NOSE_AND_THROAT",
    name: "EAR NOSE AND THROAT",
  },
  {
    id: "PATHOLOGY",
    name: "PATHOLOGY",
  },
  {
    id: "GASTROENTEROLOGY",
    name: "GASTROENTEROLOGY",
  },
  {
    id: "RESPIRATORY_MEDICINE",
    name: "RESPIRATORY MEDICINE",
  },
  {
    id: "MICROBIOLOGY",
    name: "MICROBIOLOGY",
  },
  {
    id: "RADIOLOGY",
    name: "RADIOLOGY",
  },
  {
    id: "OB_GYN",
    name: "OB/GYN",
  },
  {
    id: "ONCOLOGY",
    name: "ONCOLOGY",
  },
  {
    id: "NEPHROLOGY",
    name: "NEPHROLOGY",
  },
  {
    id: "PULMONOLOGY",
    name: "PULMONOLOGY",
  },
  {
    id: "DERMATOLOGY",
    name: "DERMATOLOGY",
  },
  {
    id: "ENDOCRINOLOGY",
    name: "ENDOCRINOLOGY",
  },
  {
    id: "OPHTHALMOLOGY",
    name: "OPHTHALMOLOGY",
  },
  {
    id: "OTOLARYNGOLOGY",
    name: "OTOLARYNGOLOGY (ENT)",
  },
  {
    id: "UROLOGY",
    name: "UROLOGY",
  },
  {
    id: "PSYCHIATRY",
    name: "PSYCHIATRY",
  },
  {
    id: "ANESTHESIOLOGY",
    name: "ANESTHESIOLOGY",
  },
  {
    id: "GENERAL_SURGERY",
    name: "GENERAL SURGERY",
  },
  {
    id: "PLASTIC_AND_RECONSTRUCTIVE_SURGERY",
    name: "PLASTIC AND RECONSTRUCTIVE SURGERY",
  },
  {
    id: "PHYSICAL_MEDICINE_AND_REHABILITATION",
    name: "PHYSICAL MEDICINE AND REHABILITATION",
  },
  {
    id: "ICU",
    name: "INTENSIVE CARE UNIT (ICU)",
  },
  {
    id: "NEONATOLOGY",
    name: "NEONATOLOGY",
  },
  {
    id: "CUSTOM",
    name: "CUSTOM",
  },
  {
    id: "ONCOLOGY",
    name: "ONCOLOGY"
  },
  {
    id: "NEPHROLOGY",
    name: "NEPHROLOGY"
  },
  {
    id: "PULMONOLOGY",
    name: "PULMONOLOGY"
  },
  {
    id: "DERMATOLOGY",
    name: "DERMATOLOGY"
  },
  {
    id: "ENDOCRINOLOGY",
    name: "ENDOCRINOLOGY"
  },
  {
    id: "OPHTHALMOLOGY",
    name: "OPHTHALMOLOGY"
  },
  {
    id: "OTOLARYNGOLOGY",
    name: "OTOLARYNGOLOGY (ENT)"
  },
  {
    id: "UROLOGY",
    name: "UROLOGY"
  },
  {
    id: "PSYCHIATRY",
    name: "PSYCHIATRY"
  },
  {
    id: "ANESTHESIOLOGY",
    name: "ANESTHESIOLOGY"
  },
  {
    id: "GENERAL_SURGERY",
    name: "GENERAL SURGERY"
  },
  {
    id: "PLASTIC_AND_RECONSTRUCTIVE_SURGERY",
    name: "PLASTIC AND RECONSTRUCTIVE SURGERY"
  },
  {
    id: "PHYSICAL_MEDICINE_AND_REHABILITATION",
    name: "PHYSICAL MEDICINE AND REHABILITATION"
  },
  {
    id: "ICU",
    name: "INTENSIVE CARE UNIT (ICU)"
  },
  {
    id: "NEONATOLOGY",
    name: "NEONATOLOGY"
  },
 
];
function Department({ openSidebarToggle, OpenSidebar }) {
  console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  const [inputText, setInputText] = useState("");

  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const firstInputRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const toggleModalOpenState = () => {
    setModalIsOpen((state) => !state);
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    setSelectedItems((items) => ({
      ...items,
      [name]: checked,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    //Get All selected Items in a Concat String Manner
    let dep = JSON.stringify(
      Object.keys(selectedItems).reduce((items, key) => {
        if (selectedItems[key]) {
          return [...items, key];
        }
        return items;
        //console.log(items);
      }, [])
    );

    const prod = {
      hospitalid: localStorage.getItem("hospitalid"),
      department: dep,
    };

    try {
      setLoading(true);
      const loadUsers = async () => {
        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}postdepartment`,
          prod
        );
        window.location = "/";
        // alert("Department Registered Successfully")
        console.log(response);
        setLoading(false);
      };
      loadUsers();
    } catch (error) {
      alert("Error Registering/Department Already Exist");

      console.error("Error creating Product:", error);
      setLoading(false);
    }
    // Implement the logic to submit inputText to the database
    // You can use Axios, Fetch, or any other library for API requests
    // For simplicity, let's log the inputText to the console for now
    console.log("Submitting to database:", inputText);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <LoaderOverlay loading={loading} />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                  {/* <div id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
                    <div className="sidebar-list">
                      <div className="sidebar-list-item">
                        <a href="/reports" onClick={() => navigateTo('/reports')}>
                          Department
                        </a>
                        <span className="separator">|</span>
                        <a href="/add-user" onClick={() => navigateTo('/add-user')}>
                          Add User
                        </a>
                        <span className="separator">|</span>
                        <a href="/edit-account" onClick={() => navigateTo('/edit-account')}>
                          Edit Account
                        </a>
                        <span className="separator">|</span>
                        <a href="/change-password" onClick={() => navigateTo('/change-password')}>
                          Change Password
                        </a>
                      </div>
                    </div>
                  </div> */}

                  {/* Submit button */}
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: "#1C647C" }}
                      >
                        Add Departments
                      </Button>
                    </div>
                  </div>
                  <div class="row" align-items-center>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={toggleModalOpenState}
                      className="source-type-modal"
                      aria-labelledby="source-type-dialog-label"
                      onAfterOpen={() => {
                        setTimeout(() => firstInputRef.current?.focus(), 0);
                      }}
                    >
                      <Box sx={{ ...style, width: 700 }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Choose Your Department's
                        </Typography>
                        <ul
                          className="source-type-modal__list"
                          role="group"
                          aria-labelledby="source-type-dialog-label"
                        >
                          {sourceTypeItems.map((item, index) => (
                            <li
                              key={item.id}
                              className="source-type-modal__list-item"
                            >
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
                          {/* <button
                            value="cancel"
                            className="source-type-modal__control-btn source-type-modal__control-btn--cancel"
                            onClick={toggleModalOpenState}
                          >
                            Cancel
                          </button> */}
                          <button
                            value="apply"
                            className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                            onClick={() => {
                              console.log("applying source types");
                              //alert("Department Selected, Process to Dashboard")
                              console.log(
                                JSON.stringify(
                                  Object.keys(selectedItems).reduce(
                                    (items, key) => {
                                      if (selectedItems[key]) {
                                        return [...items, key];
                                      }
                                      return items;
                                      console.log(items);
                                    },
                                    []
                                  )
                                )
                              );
                              toggleModalOpenState();
                              handleSubmit();
                            }}
                          >
                            Proceed
                          </button>
                        </div>
                      </Box>
                    </Modal>
                  </div>

                  {/* White block to write anything */}
                  <div className="row">
                    {/* Your block content goes here */}

                    {/* <Button variant="outlined" onClick={handleSubmit}>
                        Proceed To Dashboard --->
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Department;
