import * as React from "react";
import { styles } from "./EffortOutputManualStyles";
import { MdArrowBack } from "react-icons/md";
import { CiClock1, CiCalendar } from "react-icons/ci";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GrUserWorker } from "react-icons/gr";
import AlertButton from "../../ClearLand/EffortOutput/AlertButton";
import AlertEffort from "../../ClearLand/EffortOutput/AlertEffort";
import { getEffortOutputHtml } from "./EffortOutputTemplate";
export default function EffortOutputManual({
  onBackToSidebar,
  weedEffort,
  plantEffort,
  stoneEffort,
  effort,
  workDays,
  laborCount,
  workHours,
  displayValues2,
  area,
  perimeter,
  AreaUnitSelectedValue,
  PerimeterUnitSelectedValue,
}) {
  const handleSave = () => {
    const htmlContent = getEffortOutputHtml(
      weedEffort,
      plantEffort,
      stoneEffort,
      effort,
      workDays,
      displayValues2,
      area,
      perimeter,
      AreaUnitSelectedValue,
      PerimeterUnitSelectedValue
    );
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div style={styles.content}>
      <div style={styles.header}>
        <MdArrowBack
          onClick={onBackToSidebar}
          style={styles.backButton}
          fontSize={20}
        />
        <p style={styles.titleText1}>Effort Output</p>
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
              <p style={styles.propertyValue}>{effort} hrs</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <CiCalendar color="gray" size={25} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>{workHours} hrs Per Day</p>
              <p style={styles.propertyValue}> {workDays} Days</p>
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
                {parseFloat(perimeter).toFixed(2)} {PerimeterUnitSelectedValue}
              </p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={28} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>
                {parseFloat(area).toFixed(2)} {AreaUnitSelectedValue}
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
              Labors &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
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
              Macinery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            </p>
          </div>
          <div style={styles.innersquareright1}>
            {displayValues2.length === 0 ? (
              <div>No Machines</div>
            ) : (
              displayValues2.map((machine, index) => (
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
      </div>
    </div>
  );
}
