import React, { useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import { SiZalando } from "react-icons/si";
import { BsBoundingBox } from "react-icons/bs";
import Select from "react-select";
import { styles } from "./calculatorStyles.js";
import CalculatorSelect from "./calculatorSelect"; // Import CalculatorSelect component
import { message } from "antd";
const convertAreaToSqMeters = (area, unit) => {
    const conversionRates = {
        "Acres": 4046.86,  // 1 Acre = 4046.86 sq meters
        "Perch": 25.29,  // 1 Perch = 25.29 sq meters
        "m²": 1            // 1 sq meter = 1 sq meter
    };

    return area * (conversionRates[unit] || 1);
};

export default function Calculator({ onBackToSidebar }) {
    // State hooks for managing input values and selected units
    const [perimeter, setPerimeter] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnitselectedValue, setAreaUnitselectedValue] = useState(null);
    const [AreaUnitselectedValue1, setAreaUnitselectedValue1] = useState(null);
    const [PerimeterUnitselectedValue, setPerimeterUniteSelectedValue] = useState(null);
    const [PerimeterUnitselectedValue1, setPerimeterUniteSelectedValue1] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [animatePage, setAnimatePage] = useState(false);

    // Handler to ensure only numeric input for area
    const handleAreaChange = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setArea(value);
    };

    // Handler to ensure only numeric input for perimeter
    const handlePerimeterChange = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setPerimeter(value);
    };

    // Handlers for select dropdowns
    const handleAreaUnitChange = (selectedOption) => {
        setAreaUnitselectedValue1(selectedOption);
        setAreaUnitselectedValue(selectedOption.value);
    };

    const handlePerimeterUnitChange = (selectedOption) => {
        setPerimeterUniteSelectedValue1(selectedOption);
        setPerimeterUniteSelectedValue(selectedOption.value);
    };

    // Handler for calculate button click
    const handleCalculate = async (e) => {
        e.preventDefault();

        try {
            // Check for missing inputs
            if (!area.trim() || !perimeter.trim() || !AreaUnitselectedValue || !PerimeterUnitselectedValue) {
                message.error("Please fill in all fields");
                return;
            }

            // Check for non-numeric values in area and perimeter
            const areaNumeric = parseFloat(area);
            const perimeterNumeric = parseFloat(perimeter);
           
            const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
            if (!regex.test(area)) {
                message.error("Please enter a valid numeric value for area");
                return;
            }

            if (!regex.test(perimeter)) {
                message.error("Please enter a valid numeric value for perimeter");
                return;
            }

            // Convert area to square meters
            const areaInSqMeters = convertAreaToSqMeters(areaNumeric, AreaUnitselectedValue);

            // Navigate to calculatorSelect page
            setCurrentPage("calculatorSelect");
            setAnimatePage(true);

            const requestData = { area: areaInSqMeters, perimeter: perimeterNumeric };
            console.log("Request Data:", requestData);

            // Here you can send the request to the backend if needed
        } catch (error) {
            console.error("Error:", error.message);
            alert("Error: " + error.message);
        }
    };

    // Handler for back button click to navigate back to the main page
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
                        <p style={styles.titleText1}>Manual Calculator</p>
                    </div>

                    <div style={styles.box3}>
                        <div style={styles.box3Property}>
                            <div>
                                <SiZalando name="format-line-spacing" size={25} color="gray" />
                            </div>
                            <div style={styles.box3PropertyDetails}>
                                <p style={styles.Box3PropertyLabel}>Area</p>
                            </div>
                        </div>
                        <div style={styles.box3Property}>
                            <div style={styles.box3inputContainer}>
                                <input
                                    type="text"
                                    style={styles.box3input}
                                    placeholder="25"
                                    value={area}
                                    onChange={handleAreaChange} // Validate numeric input for area
                                    inputMode="numeric" // Mobile device numeric keypad
                                    pattern="[0-9]*" // HTML5 pattern for numeric values
                                />
                                <Select
                                    placeholder="Acres"
                                    options={[
                                        { value: "m²", label: "m²" },
                                        { value: "Acres", label: "Acres" },
                                        { value: "Perch", label: "Perch" },
                                    ]}
                                    value={AreaUnitselectedValue1}
                                    onChange={handleAreaUnitChange}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            textAlign: "center",
                                            fontSize: "14px",
                                            width: "120px",
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                        <div style={styles.smallText}>
                        <p>*Note that this value is approximately correct</p>
                        </div>
                    </div>

                    <div style={styles.box3}>
                        <div style={styles.box3Property}>
                            <div>
                                <BsBoundingBox name="format-line-spacing" size={25} color="gray" />
                            </div>
                            <div style={styles.box3PropertyDetails}>
                                <p style={styles.Box3PropertyLabel}>Perimeter</p>
                            </div>
                        </div>
                        <div style={styles.box3Property}>
                            <div style={styles.box3inputContainer}>
                                <input
                                    type="text"
                                    style={styles.box3input}
                                    placeholder="25"
                                    value={perimeter}
                                    onChange={handlePerimeterChange} // Validate numeric input for perimeter
                                    inputMode="numeric" // Mobile device numeric keypad
                                    pattern="[0-9]*" // HTML5 pattern for numeric values
                                />
                                <Select
                                    placeholder="m"
                                    options={[
                                        { value: "m", label: "m" },
                                        { value: "km", label: "km" },
                                    ]}
                                    value={PerimeterUnitselectedValue1}
                                    onChange={handlePerimeterUnitChange}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            textAlign: "center",
                                            fontSize: "14px",
                                            width: "120px",
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                        <div style={styles.smallText}>
                            <p>*Note that this value is approximately correct</p>
                        </div>
                    </div>

                    <div style={styles.bottom}>
                        <button style={styles.Button1} onClick={handleCalculate}>
                            <p style={styles.Box4ButtonText}>Calculate </p>
                        </button>
                    </div>
                </div>
            )}

            <div
                style={{
                    transform: animatePage ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "whitesmoke",
                    overflow: "auto",
                }}
            >
                {currentPage === "calculatorSelect" && (
                    <CalculatorSelect
                        onBackToSidebar={handleBackClick}
                        area={area}
                        perimeter={perimeter}
                        PerimeterUnitselectedValue={PerimeterUnitselectedValue}
                        AreaUnitselectedValue={AreaUnitselectedValue}
                    />
                )}
            </div>
        </div>
    );
}
