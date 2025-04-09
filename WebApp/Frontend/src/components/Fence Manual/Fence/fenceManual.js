import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdArrowBack, MdFence } from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import Swal from "sweetalert2";
import { styles } from "./fenceManualStyles";
import Select from "react-select";
import FenceDetailsManual from "../FenceDetails/fenceDetailsManual";
import AxiosInstance from "../../../AxiosInstance";
import { message } from "antd";

export default function FenceManual({
  onBackToSidebar,
  area,
  Perimeter,
  AreaUnitselectedValue,
  PerimeterUnitselectedValue,
}) {
  const [FenceTypeselectedValue, setFenceTypeselectedValue] = useState(null);
  const [FenceTypeselectedValue1, setFenceTypeselectedValue1] = useState(null);
  const [PostSpaceUnitselectedValue, setPostSpaceUnitselectedValue] =
    useState("");
  const [PostSpaceUnitselectedValue1, setPostSpaceUnitselectedValue1] =
    useState("");
  const [inputValuePostspace, setInputValuePostspace] = useState("");
  const [inputValueFenceLength, setInputValueFenceLength] = useState("");
  const [inputValueFenceAmount, setInputValueFenceAmount] = useState("");
  const [fenceLengthsArray, setFenceLengthsArray] = useState([]);
  const [fenceAmountsArray, setFenceAmountsArray] = useState([]);
  const [displayValues, setDisplayValues] = useState([]);
  const inputValueFenceAmountRef = useRef(null);
  const [NumberOfSticks, setNumberOfSticks] = useState(0);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [fenceType, setfenceType] = useState([]);
  const [textFence, setTextFence] = useState(null);

  useEffect(() => {
    fetchFenceType();
  }, []);

  const fetchFenceType = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/FenceTypes"
      );
      setfenceType(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      message.error("Failed to fetch plants. Please try again.");
    }
  };

  const handleFenceLengthChange = (event) => {
    setInputValueFenceLength(event.target.value);
  };

  const handleFenceAmountChange = (event) => {
    setInputValueFenceAmount(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValuePostspace(event.target.value);
  };

  const handleFenceTypeChange = (selectedOption) => {
    setFenceTypeselectedValue1(selectedOption);
    setFenceTypeselectedValue(selectedOption.value);
  };

  const handlePostSpaceUnitChange = (selectedOption) => {
    setPostSpaceUnitselectedValue1(selectedOption);
    setPostSpaceUnitselectedValue(selectedOption.value);
  };

  const handleAdd = () => {
    if (!inputValueFenceLength.trim() || !inputValueFenceAmount.trim()) {
      message.error("Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(inputValueFenceLength)) {
      message.error("Error: Please enter a valid Length");
      return;
    }

    const regex2 = /^\d+$/; // allow only decimal numbers
    if (!regex2.test(inputValueFenceAmount)) {
      message.error("Error: Please enter a valid Count");
      return;
    }

    const length = parseFloat(inputValueFenceLength);
    const amount = parseInt(inputValueFenceAmount);
    setFenceLengthsArray([...fenceLengthsArray, length]);
    setFenceAmountsArray([...fenceAmountsArray, amount]);
    const combinedValue = `${length}m x ${amount}`;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setInputValueFenceLength("");
    setInputValueFenceAmount("");
    inputValueFenceAmountRef.current.focus();
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);

    const newFenceLengthsArray = [...fenceLengthsArray];
    newFenceLengthsArray.splice(index, 1);
    setFenceLengthsArray(newFenceLengthsArray);

    const newFenceAmountsArray = [...fenceAmountsArray];
    newFenceAmountsArray.splice(index, 1);
    setFenceAmountsArray(newFenceAmountsArray);
  };

  const handleFenceDetails = async (e) => {
    e.preventDefault();

    // Validate the data
    if (
      !PostSpaceUnitselectedValue ||
      !textFence ||
      !inputValuePostspace
    ) {
      message.error("Error: Please fill all input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow decimal and float numbers
    if (!regex.test(inputValuePostspace)) {
      message.error("Error: Please enter a valid Post Space");
      return;
    }

    AxiosInstance.post("/api/fence/fenceFromManualcal", {
      FenceTypeselectedValue : textFence ? textFence.value : null,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray,
      fenceLengthsArray,
      Perimeter,
    })
      .then((response) => {
        setNumberOfSticks(response.data.numberOfSticks);
        setCurrentPage("FenceDetailsManual"); // Update this line
        setAnimatePage(true);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        message.error("Error", "Failed to create fence. Please try again.");
        alert("Error", "Failed to create fence. Please try again.");
      });
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  return (
    <div>
      {!currentPage && (
        <div style={styles.content}>
          <div style={styles.header}>
            <MdArrowBack
              onClick={onBackToSidebar}
              style={styles.backButton}
              fontSize={20}
            />
            <p style={styles.titleText1}>Fence</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Land Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}>
                  {parseFloat(Perimeter).toFixed(2)}
                    {PerimeterUnitselectedValue}
                  </p>
                </div>
              </div>
              <div style={styles.property}>
                <PiSquareDuotone color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>
                  {parseFloat(area).toFixed(2)} {AreaUnitselectedValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.box2}>
            <div style={styles.box2Property}>
              <MdFence name="gate" size={35} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Fence Type</p>
              </div>
            </div>
            <div style={styles.box2Property}>
              <div style={styles.Box2DropdownContainer}>
              <Select
                  placeholder="Type"
                  value={textFence}
                  onChange={(selectedOption) => setTextFence(selectedOption)}
                  options={fenceType.map((Fence) => ({
                    value: Fence.Name,
                    label: Fence.Name,
                  }))}
                
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "12px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <FaBars name="format-line-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Post Space</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="00"
                  value={inputValuePostspace}
                  onChange={handleInputChange}
                />
                <Select
                  placeholder="m"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={PostSpaceUnitselectedValue1}
                  onChange={handlePostSpaceUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "78px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.box4}>
            <div style={styles.box4innertop}>
              <GiGate name="boom-gate" size={26} color="gray" />
              <p style={styles.Box4TopText}>Gates</p>
            </div>
            <div style={styles.box4InnerCenter}>
              <div style={styles.line}>
                <p style={styles.linetext}>Length :</p>
                <input
                  type="text"
                  style={styles.linetextinput}
                  placeholder="Length of Gate"
                  value={inputValueFenceLength}
                  onChange={handleFenceLengthChange}
                />
              </div>
              <div style={styles.line}>
                <p style={styles.linetext}>Count :</p>
                <input
                  type="text"
                  style={styles.linetextinput}
                  placeholder="Number of Gate"
                  value={inputValueFenceAmount}
                  onChange={handleFenceAmountChange}
                  ref={inputValueFenceAmountRef}
                  onSubmitEditing={handleAdd}
                />
              </div>
            </div>
            <div style={styles.Box4InnerBottom}>
              <button style={styles.Box4Button} onClick={handleAdd}>
                <p style={styles.Box4ButtonText}>Add</p>
              </button>
            </div>

            <div style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <IoIosCloseCircleOutline
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleFenceDetails}>
              <p style={styles.Box4ButtonText}>Calculate</p>
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "FenceDetailsManual" && (
          <FenceDetailsManual
            onBackToSidebar={handleBackClick}
            inputValuePostspace={inputValuePostspace}
            displayValues={displayValues}
            PostSpaceUnitselectedValue={PostSpaceUnitselectedValue}
            FenceTypeselectedValue={textFence ? textFence.value : null}            NumberOfSticks={NumberOfSticks}
            area={area}
            Perimeter={Perimeter}
            AreaUnitselectedValue={AreaUnitselectedValue}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}
          />
        )}
      </div>
    </div>
  );
}
