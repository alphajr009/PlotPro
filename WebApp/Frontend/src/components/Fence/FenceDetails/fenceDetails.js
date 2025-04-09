import React from "react";
import { useState, useEffect } from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { TbArrowBarBoth, TbBarrierBlock, TbFence } from "react-icons/tb";
import { MdArrowBack  } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./fenceDetailsStyles";
import { RiEditBoxLine } from "react-icons/ri"; 
import AxiosInstance from "../../../AxiosInstance";
import { Modal,Button } from "antd";
import Fence from "../Fence/fence";
import TemplateDetails from "../../SavedTemplates/TemplateDetails";
import { getFenceDetailsHtml } from "./FenceDetailsTemplate";
import { BeatLoader } from 'react-spinners';


const { confirm } = Modal;

export default function FenceDetails({
  onBackToSidebar,
  onEditTemplateClick,
  template,
  onback,
  id,
}) {
  const [loading, setLoading] = useState(true);
  const [numberOfSticks, setnumberOfSticks] = useState(null);
  const [fenceType , setfenceType] = useState(null);
  const [postSpace, setpostSpac] = useState(null);
  const [PostSpaceUnit, setPostSpaceUnit] = useState(null);
  const [Area, setArea] = useState(null);
  const [Perimeter, setPerimeter] = useState(null);
  const [data1 , setdata1] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [fencedata, setfencedata] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/fence/numberOfSticks/${id}`);
        const data = response.data;
        setfencedata(data);
        console.log(data);
  
        setnumberOfSticks(data.numberOfSticks);
        setfenceType(data.fenceType);
        setpostSpac(data.postSpace);
        setPostSpaceUnit(data.postSpaceUnit);
        setArea(data.Area);
        setPerimeter(data.Perimeter);
        setdata1(data.gateDetails);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };
  
    fetchData();
  
    // Cleanup function if needed
    return () => {};
  }, [id]);


  const FenceDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/fence/deleteFence/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      // Log the detailed error response
      console.error('Error deleting fence:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  const handleEditIconPressd = () => {
    Modal.confirm({
      title: 'Do you want to delete Fence data',
      content: 'Choose an action:',
      okText: 'Update',
      cancelText: 'Close',
      okType: 'primary',
      onOk: handleEditfencedata,
      onCancel: () => {},
      maskClosable: true,
      closable: true,
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button 
            onClick={() => {
              Modal.destroyAll(); // This closes all open modals
              handledeletefence();
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

  const handledeletefence = () => {
    try {
      FenceDelete(id)
        .then(() => {
          // Navigate to the desired screen
          setfencedata(null);
          setCurrentPage('Fence');
          setAnimatePage(true);
        })
        .catch((error) => {
          // Show detailed error message
          const errorMessage = error.response ? error.response.data.message : error.message;
          Modal.error({
            title: 'Failed to delete fence',
            content: errorMessage,
          });
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditfencedata = () => {
    setCurrentPage('Fence');
    setAnimatePage(true);
  };

 
  const handleback = () => {
    setCurrentPage("TemplateDetails");
    setAnimatePage(true);
  };

  const handleSave = () => {
    const htmlContent = getFenceDetailsHtml(fenceType, numberOfSticks, postSpace, PostSpaceUnit, data1,Perimeter,Area);
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
  };
  
  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
          <BeatLoader color="#007BFF" loading={loading} size={12} />
        </div>
      ) : (
        !currentPage && (
          <div style={styles.content}>
            <div style={styles.header}>
              <MdArrowBack
                onClick={onback}
                style={styles.backButton}
                fontSize={20}
              />
              <p style={styles.titleText1}>Fence Details</p>
              <RiEditBoxLine
                onClick={handleEditIconPressd}
                style={styles.editbutton}
                fontSize={19}
              />
            </div>
  
            {/* first box */}
            <div style={styles.Box1}>
              <p style={styles.titleText}>Total Posts / Sticks</p>
              <div style={styles.propertyBox}>
                <div style={styles.property}>
                  <div style={{ transform: "rotate(90deg)" }}>
                    <HiMiniBars4 color="gray" size={30} />
                  </div>
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Total Amount</p>
                    <p style={styles.propertyValue}>{numberOfSticks} Sticks</p>
                  </div>
                </div>
                <div className="property" style={styles.property}>
                  <TbArrowBarBoth color="gray" size={30} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>post Gap</p>
                    <p style={styles.propertyValue}>
                      {postSpace} {PostSpaceUnit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Second box */}
            <div style={styles.Box2}>
              <div style={styles.propertyBox}>
                <div style={styles.property}>
                  <BsBoundingBox color="gray" size={28} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Perimeter</p>
                    <p style={styles.propertyValue}>{parseFloat(Perimeter).toFixed(2)} km</p>
                  </div>
                </div>
                <div className="property" style={styles.property}>
                  <PiSquareDuotone color="gray" size={40} />
                  <div style={styles.propertyDetails}>
                    <p style={styles.propertyLabel}>Area</p>
                    <p style={styles.propertyValue}>{parseFloat(Area).toFixed(2)} perch</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Third box */}
            <div style={styles.box3}>
              <p style={styles.innertopText}>Result based on</p>
  
              <div style={styles.innercenter}>
                <div style={styles.innersquareleft}>
                  <TbFence name="gate" size={35} color="gray" />
                  <p style={styles.propertyLabel1}>Fence Type &nbsp;&nbsp;:</p>
                </div>
                <div style={styles.innersquareright}>
                  <p style={styles.propertyLabel}>{fenceType}</p>
                </div>
              </div>
  
              <div style={styles.innercenter}>
                <div style={styles.innersquareleft}>
                  <TbBarrierBlock name="boom-gate" size={35} color="gray" />
                  <p style={styles.propertyLabel1}>
                    Gates &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    :
                  </p>
                </div>
                <div style={styles.innersquareright1}>
                  {data1.length === 0 ? (
                    <div>No Gate</div>
                  ) : (
                    data1.map((value, index) => (
                      <div key={index}>{value}</div>
                    ))
                  )}
                </div>
              </div>
            </div>
  
            <div style={styles.bottom}>
               
              <Button type="primary" style={styles.Button1} onClick={handleSave}>
                <p style={{fontSize: 13}}>Save Data</p>
              </Button>
              <Button style={styles.Button2} onClick={handleback}>
              <p style={{fontSize: 13}}>Back to Template</p>
              </Button>
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
        {currentPage === "Fence" && (
          <Fence
            onBackToSidebar={onBackToSidebar}
            id={id}
            area={Area}
            Perimeter={Perimeter}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
            fencedata={fencedata}
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
