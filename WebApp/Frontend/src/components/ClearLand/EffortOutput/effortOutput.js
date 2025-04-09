import * as React from "react";
import { useState, useEffect } from "react";
import { styles } from "../EffortOutput/effortOutputStyles";
import { MdArrowBack } from "react-icons/md";
import { CiClock1, CiCalendar } from "react-icons/ci";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GrUserWorker } from "react-icons/gr";
import { RiEditBoxLine } from "react-icons/ri";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import ClearLand from "../ClearLand/clearLand";
import TemplateDetails from "../../SavedTemplates/TemplateDetails";
import AxiosInstance from "../../../AxiosInstance";
import { getClearLandDetailsHtml } from "./EffortOutputTemplate";
import AlertButton from "./AlertButton";
import AlertEffort from "./AlertEffort";
import { BeatLoader } from "react-spinners";
const { confirm } = Modal;
export default function EffortOutput({
  onBackToSidebar,
  onEditTemplateClick,
  template,
  onback,
  id,
}) {
  const [workHours, setworkHours] = useState(null);
  const [laborCount, setlaborCount] = useState(null);
  const [data1, setdata1] = useState([]);
  const [Area, setArea] = useState(null);
  const [Perimeter, setPerimeter] = useState(null);
  const [effortOutput, setEffortOutput] = useState(null);
  const [workDays, setWorkDays] = useState(null);
  const [weedEffort, setWeedEffort] = useState(null);
  const [plantEffort, setPlantEffort] = useState(null);
  const [stoneEffort, setStoneEffort] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ClearLandData, setClearLandData] = useState(null);
  const [weedType, setWeedType] = useState(null);
  const [plantDetails, setPlantDetails] = useState(null);
  const [stoneDetails, setStoneDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/clearLand/effortOutput/${id}`
        );
        const data = response.data;
        setClearLandData(data);
        console.log(data);

        setworkHours(data.workHours);
        setlaborCount(data.laborCount);
        setdata1(data.machineDetails);
        setArea(data.Area);
        setPerimeter(data.Perimeter);
        setEffortOutput(data.effortOutput);
        setWeedEffort(data.weedEffort);
        setPlantEffort(data.plantEffort);
        setStoneEffort(data.stoneEffort);
        setWorkDays(data.workDays);
        setWeedType(data.weedsType);
        setPlantDetails(data.plantDetails);
        setStoneDetails(data.stoneDetails);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, [id]);

  const ClearLandDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/clearLand/deleteClearLand/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(
        "Error deleting clear land:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const handleIconPress = (e) => {
    Modal.confirm({
      title: "Do you want to update Clear land data",
      content: "Choose an action:",
      okText: "Update",
      cancelText: "Close",
      okType: "primary",
      onOk: handleEditClearland,
      onCancel: () => {},
      maskClosable: true,
      closable: true,
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            onClick={() => {
              Modal.destroyAll(); // This closes all open modals
              handledeleteClearland();
            }}
            danger
          >
            Delete
          </Button>
          <OkBtn />
        </>
      ),
    });
  };
  const handledeleteClearland = () => {
    try {
      ClearLandDelete(id)
        .then(() => {
          // Navigate to the desired screen
          setCurrentPage("ClearLand");
          setAnimatePage(true);
          setClearLandData(null);
        })
        .catch((error) => {
          // Show detailed error message
          const errorMessage = error.response
            ? error.response.data.message
            : error.message;
          Modal.error({
            title: "Failed to delete clear land",
            content: errorMessage,
          });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClearland = () => {
    setCurrentPage("ClearLand");
    setAnimatePage(true);
  };
  const handleback = () => {
    setCurrentPage("TemplateDetails");
    setAnimatePage(true);
  };

  const handleSave = () => {
    const htmlContent = getClearLandDetailsHtml(
      Perimeter,
      Area,
      data1,
      effortOutput,
      workDays,
      weedEffort,
      plantEffort,
      stoneEffort
    );
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
          }}
        >
          <BeatLoader color="#007BFF" loading={loading} size={12} />
        </div>
      ) : (
        !currentPage && (
          <div style={styles.content}>
            <div style={styles.header}>
              <MdArrowBack
                onClick={handleback}
                style={styles.backButton}
                fontSize={20}
              />
              <p style={styles.titleText1}>Effort Output</p>
              <RiEditBoxLine
                onClick={handleIconPress}
                style={styles.editbutton}
                fontSize={19}
              />
            </div>

            {/* first box */}
            <div style={styles.Box1}>
              <div style={styles.box1Top}>
                <p style={styles.titleText}>Total Effort Count</p>
                <AlertButton></AlertButton>
              </div>
              <div style={styles.propertyBox}>
                <div style={styles.property}>
                  <div>
                    <CiClock1 color="gray" size={25} />
                  </div>
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Total Hours</p>
                    <p style={styles.propertyValue}>{effortOutput} hrs</p>
                  </div>
                </div>
                <div className="property" style={styles.property}>
                  <CiCalendar color="gray" size={25} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>{workHours} hrs Per Day</p>
                    <p style={styles.propertyValue}>{workDays} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second box */}
            <div style={styles.Box2}>
              <div style={styles.propertyBox}>
                <div style={styles.property}>
                  <BsBoundingBox color="gray" size={25} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Perimeter</p>
                    <p style={styles.propertyValue}>
                      {parseFloat(Perimeter).toFixed(2)} km
                    </p>
                  </div>
                </div>
                <div style={styles.property}>
                  <PiSquareDuotone color="gray" size={28} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Area</p>
                    <p style={styles.propertyValue}>
                      {parseFloat(Area).toFixed(2)} perch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.box}>
              <div style={styles.boxTop}>
                <p style={styles.boxHeader}>Effort Values</p>
                <AlertEffort></AlertEffort>
              </div>
              <div style={styles.boxInner}>
                <p style={styles.boxInnerText}>
                  Weed Effort &nbsp;&nbsp; :&nbsp;&nbsp;{" "}
                  {(weedEffort ?? 0).toFixed(2)} hrs
                </p>
                <p style={styles.boxInnerText}>
                  Tree Effort &nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;{" "}
                  {(plantEffort ?? 0).toFixed(2)} hrs
                </p>
                <p>
                  Stone Effort &nbsp;&nbsp; :&nbsp;&nbsp;{" "}
                  {(stoneEffort ?? 0).toFixed(2)} hrs
                </p>
              </div>
            </div>

            {/* third box */}
            <div style={styles.box3}>
              <p style={styles.innertopText}>Result based on</p>

              <div style={styles.innercenter}>
                <div style={styles.innersquareleft}>
                  <GrUserWorker size={20} color="gray" />
                  <p style={styles.propertyLabel1}>
                    Labors
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </p>
                </div>
                <div style={styles.innersquareright}>
                  <p style={styles.propertyLabel}>{laborCount}</p>
                </div>
              </div>

              <div style={styles.innercenter}>
                <div style={styles.innersquareleft}>
                  <HiTruck name="boom-gate" size={24} color="gray" />
                  <p style={styles.propertyLabel1}>
                    Macinery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </p>
                </div>
                <div style={styles.innersquareright1}>
                  {data1.length === 0 ? (
                    <div>No Machines</div>
                  ) : (
                    data1.map((machine, index) => (
                      <div key={index}>{machine}</div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div style={styles.bottom}>
              <button style={styles.Button1} onClick={handleSave}>
                <p style={styles.Box4ButtonText}>Save Data</p>
              </button>
              <button style={styles.Button2} onClick={handleback}>
                <p style={styles.Box4ButtonText}>Back to Template</p>
              </button>
            </div>
          </div>
        )
      )}
      <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "ClearLand" && (
          <ClearLand
            onBackToSidebar={onBackToSidebar}
            id={id}
            area={Area}
            Perimeter={Perimeter}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
            ClearLandData={ClearLandData}
          />
        )}

        {currentPage === "TemplateDetails" && (
          <TemplateDetails
            onBackToSidebar={onBackToSidebar}
            id={id}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
      </div>
    </div>
  );
}
