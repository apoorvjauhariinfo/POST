import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { CloseButton } from "react-bootstrap";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import Typography from "@mui/material/Typography";
import AlertDialog from "../UI/AlertDialog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #2e718a",
  boxShadow: 29,
  pt: 2,
  px: 4,
  pb: 3,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
};

const hospitalid = localStorage.getItem("hospitalid");

const sourceTypeItems = [
  // List of departments
  { id: "EMERGENCY_MEDICINE", name: "EMERGENCY MEDICINE" },
  { id: "ORTHOPEDICS", name: "ORTHOPEDICS" },
  { id: "NEUROLOGY", name: "NEUROLOGY" },
  { id: "DENTAL", name: "DENTAL" },
  { id: "CARDIOLOGY", name: "CARDIOLOGY" },
  { id: "EAR_NOSE_AND_THROAT", name: "EAR NOSE AND THROAT" },
  { id: "PATHOLOGY", name: "PATHOLOGY" },
  { id: "GASTROENTEROLOGY", name: "GASTROENTEROLOGY" },
  { id: "RESPIRATORY_MEDICINE", name: "RESPIRATORY MEDICINE" },
  { id: "MICROBIOLOGY", name: "MICROBIOLOGY" },
  { id: "RADIOLOGY", name: "RADIOLOGY" },
  { id: "OB_GYN", name: "OB/GYN" },
  { id: "ONCOLOGY", name: "ONCOLOGY" },
  { id: "NEPHROLOGY", name: "NEPHROLOGY" },
  { id: "PULMONOLOGY", name: "PULMONOLOGY" },
  { id: "DERMATOLOGY", name: "DERMATOLOGY" },
  { id: "ENDOCRINOLOGY", name: "ENDOCRINOLOGY" },
  { id: "OPHTHALMOLOGY", name: "OPHTHALMOLOGY" },
  { id: "OTOLARYNGOLOGY", name: "OTOLARYNGOLOGY (ENT)" },
  { id: "UROLOGY", name: "UROLOGY" },
  { id: "PSYCHIATRY", name: "PSYCHIATRY" },
  { id: "ANESTHESIOLOGY", name: "ANESTHESIOLOGY" },
  { id: "GENERAL_SURGERY", name: "GENERAL SURGERY" },
  {
    id: "PLASTIC_AND_RECONSTRUCTIVE_SURGERY",
    name: "PLASTIC AND RECONSTRUCTIVE SURGERY",
  },
  {
    id: "PHYSICAL_MEDICINE_AND_REHABILITATION",
    name: "PHYSICAL MEDICINE AND REHABILITATION",
  },
  { id: "ICU", name: "INTENSIVE CARE UNIT (ICU)" },
  { id: "NEONATOLOGY", name: "NEONATOLOGY" },
  // { id: "CUSTOM", name: "CUSTOM" },
];

function Department({ openSidebarToggle, OpenSidebar }) {
  console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [department, setDepartment] = useState([]);
  const [departmentid, setDepartmentId] = useState([]);
  const firstInputRef = useRef();
  const [alertDialog, setAlertDialog] = useState(false);

  const getdep = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}departments`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          setDepartmentId(data.document[a]._id);
          let len = JSON.parse(data.document[a].department).length;
          const deplist = new Array(len);
          for (let i = 0; i < len; i++) {
            deplist[i] = JSON.parse(data.document[a].department)[i];
          }
          setDepartment(deplist);
          const existingDepartments = new Set(deplist);
          setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = { ...prevSelectedItems };
            for (const item of sourceTypeItems) {
              updatedSelectedItems[item.name] = existingDepartments.has(
                item.name,
              );
            }
            return updatedSelectedItems;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdep();
  }, []);
  console.log("Departments are " + department);
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
    // Get all selected items in a concatenated string manner
    let dep = JSON.stringify(
      Object.keys(selectedItems).reduce((items, key) => {
        if (selectedItems[key]) {
          return [...items, key];
        }
        return items;
      }, []),
    );

    try {
      setLoading(true);
      const loadUsers = async () => {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}updateexistingdepartment/` +
            departmentid.toString(),
          {
            _id: departmentid.toString(),
            hospitalid: localStorage.getItem("hospitalid"),
            department: dep,
          },
        );
        let userData = (await response).data;
        console.log(userData);
        window.location.reload();
      };
      loadUsers();
    } catch (error) {
      setAlertDialog(true);
      // alert("Error Registering/Department Already Exist");
      console.error("Error creating Product:", error);
      setLoading(false);
    }
    console.log("Submitting to database:", inputText);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <LoaderOverlay loading={loading} />
      <AlertDialog
        text="Error Registering/Department Already Exist"
        onClose={() => setAlertDialog(false)}
        open={alertDialog}
      />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: "#2e718a" }}
                      >
                        Add Departments
                      </Button>
                    </div>
                  </div>
                  <div className="row" align="items-center">
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={toggleModalOpenState}
                      className="source-type-modal"
                      aria-labelledby="source-type-dialog-label"
                      onAfterOpen={() => {
                        setTimeout(() => firstInputRef.current?.focus(), 0);
                      }}
                    >
                      <Box sx={style}>
                        <div className="d-flex justify-content-end">
                          <CloseButton
                            onClick={toggleModalOpenState}
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                            }}
                          />
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Edit Your Departments
                        </Typography>
                        <ul
                          className="source-type-modal__list"
                          role="group"
                          aria-labelledby="source-type-dialog-label"
                          style={{ listStyle: "none", padding: 0 }}
                        >
                          {sourceTypeItems.map((item, index) => (
                            <li
                              key={item.id}
                              className="source-type-modal__list-item"
                              style={{ marginBottom: "10px" }}
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedItems[item.name] || false}
                                  onChange={handleOnChange}
                                  name={item.name}
                                  ref={index === 0 ? firstInputRef : null}
                                  style={{ marginRight: "10px" }}
                                />
                                {item.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="source-type-modal__controls d-flex justify-content-end">
                          <Button
                            value="apply"
                            className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                            onClick={() => {
                              console.log("applying source types");
                              toggleModalOpenState();
                              handleSubmit();
                            }}
                            style={{
                              backgroundColor: "#2e718a",
                              borderColor: "#2e718a",
                              color: "#fff",
                              marginTop: "10px",
                            }}
                          >
                            Proceed
                          </Button>
                        </div>
                      </Box>
                    
                    </Modal>
                    
                  </div>
                  <div className="row mt-4" style={{ textAlign: "center" }}>
                    <h4>Selected Departments:</h4>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "10px 0",
                      }}
                    >
                      {Object.keys(selectedItems).map((key) =>
                        selectedItems[key] ? (
                          <div
                            key={key}
                            style={{
                              backgroundColor: "#2e718a",
                              color: "#fff",
                              borderRadius: "15px",
                              padding: "5px 10px",
                              margin: "5px",
                              display: "inline-block",
                            }}
                          >
                            {key}
                          </div>
                        ) : null,
                      )}
                    </div>
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
