import { Fragment, useState } from "react";import { BsFilterCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

import { TreeSelect } from "antd";
import "./home.scss";
import InputModal from "./components/InputModal";

const data = [
  {
    Metric_ID: "M1001",
    Metric_Name: "Automotive Brand 1",
    Details: [
      {
        Geo: "USA",
        LOB: "Hatchback",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "20",
        Metric_Weightage: "5",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
      {
        Geo: "USA",
        LOB: "Sedan",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "25",
        Metric_Weightage: "5",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
      {
        Geo: "USA",
        LOB: "SUV",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "30",
        Metric_Weightage: "5",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
    ],
  },
  {
    Metric_ID: "M1002",
    Metric_Name: "Automotive Brand 2",
    Details: [
      {
        Geo: "USA",
        LOB: "Hatchback",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "20",
        Metric_Weightage: "5",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
      {
        Geo: "USA",
        LOB: "Sedan",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "25",
        Metric_Weightage: "5",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
      {
        Geo: "USA",
        LOB: "SUV",
        RTM: "Drop-in",
        Domestric: "Yes",
        Metric_type: "%",
        Benchmark_value: "30",
        Metric_Weightage: "10",
        Metric_Ceiling: "10",
        Metric_Floor: "5",
        Metric_Sign: "15",
        Benchmark_Ceiling: "10",
        Benchmark_Logic_type: "slope",
        Ranking_Metric: "1",
      },
    ],
  },
];

function Home() {
  const [automotiveData, setAutomotiveData] = useState(data);
  const [filteredData, setFilteredData] = useState(automotiveData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filterVisible, setFilterVisible] = useState({
    Domestric: false,
    RTM: false,
    LOB: false,
    Geo: false,
    Metric_ID: false,
    Metric_Name: false,
  });

  const [selectedMetric, setSelectedMetric] = useState({
    Metric_ID: "",
    Metric_Name: "",
  });

  const openModal = (Metric_ID, Metric_Name) => {
    setSelectedMetric({
      Metric_ID: Metric_ID,
      Metric_Name: Metric_Name,
    });
    setIsDialogOpen(true);
  };

  const filterByDomestric = (selectedDomestic) => {
    setFilteredData(
      automotiveData.map((item) => ({
        ...item,
        Details: item.Details.filter((detail) =>
          selectedDomestic.includes(detail.Domestric)
        ),
      }))
    );
  };
  const filterByRtm = (selectedRtm) => {
    setFilteredData(
      automotiveData.map((item) => ({
        ...item,
        Details: item.Details.filter((detail) =>
          selectedRtm.includes(detail.RTM)
        ),
      }))
    );
  };
  const filterByLob = (selectedLob) => {
    setFilteredData(
      automotiveData.map((item) => ({
        ...item,
        Details: item.Details.filter((detail) =>
          selectedLob.includes(detail.LOB)
        ),
      }))
    );
  };
  const filterByGeo = (selectedGeo) => {
    setFilteredData(
      automotiveData.map((item) => ({
        ...item,
        Details: item.Details.filter((detail) =>
          selectedGeo.includes(detail.Geo)
        ),
      }))
    );
  };

  const getUniqueDomestricData = (data) => {
    return [
      ...new Set(
        data
          .flatMap(
            (item) => item.Details.map((detail) => detail.Domestric) // Extract all Geo values
          )
          .map((domestric) => domestric) // Map to geo to ensure it's unique
      ),
    ].map((domestric) => ({
      value: domestric,
      label: domestric,
    }));
  };
  const getUniqueRtmData = (data) => {
    return [
      ...new Set(
        data
          .flatMap(
            (item) => item.Details.map((detail) => detail.RTM) // Extract all Geo values
          )
          .map((rtm) => rtm) // Map to geo to ensure it's unique
      ),
    ].map((rtm) => ({
      value: rtm,
      label: rtm,
    }));
  };
  const getUniqueLOBData = (data) => {
    return [
      ...new Set(
        data
          .flatMap(
            (item) => item.Details.map((detail) => detail.LOB) // Extract all Geo values
          )
          .map((lob) => lob) // Map to geo to ensure it's unique
      ),
    ].map((lob) => ({
      value: lob,
      label: lob,
    }));
  };
  const getUniqueGeoData = (data) => {
    return [
      ...new Set(
        data
          .flatMap(
            (item) => item.Details.map((detail) => detail.Geo) // Extract all Geo values
          )
          .map((geo) => geo) // Map to geo to ensure it's unique
      ),
    ].map((geo) => ({
      value: geo,
      label: geo,
    }));
  };

  const filterByMetricName = (value) => {
    setFilteredData(
      automotiveData.filter((item) => value.includes(item.Metric_Name))
    );
  };

  const filterByMetricID = (value) => {
    setFilteredData(
      automotiveData.filter((item) => value.includes(item.Metric_ID))
    );
  };

  const filterByWeightageValue = (Metric_ID, value) => {
    if (value === "") {
      setFilteredData(automotiveData);
      return;
    }

    setFilteredData(
      automotiveData.map((item) =>
        item.Metric_ID === Metric_ID
          ? {
              ...item,
              Details: item.Details.filter(
                (detail) => Number(detail.Metric_Weightage) === Number(value)
              ),
            }
          : item
      )
    );
  };
  const filterByBenchMarkValue = (Metric_ID, value) => {
    if (value === "") {
      setFilteredData(automotiveData);
      return;
    }

    setFilteredData(
      automotiveData.map((item) =>
        item.Metric_ID === Metric_ID
          ? {
              ...item,
              Details: item.Details.filter(
                (detail) => Number(detail.Benchmark_value) === Number(value)
              ),
            }
          : item
      )
    );
  };

  const toggleDetailsHandler = (Metric_ID) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.Metric_ID === Metric_ID
          ? {
              ...item,
              Details: item.Details
                ? null
                : data.find((d) => d.Metric_ID === Metric_ID)?.Details,
            }
          : item
      )
    );
  };

  const toggleAllDetailsHandler = () => {
    const areAllDetailsVisible = filteredData.every(
      (item) => item.Details && item.Details.length > 0
    );

    if (areAllDetailsVisible) {
      // Hide all details by setting them to null
      setFilteredData(
        automotiveData.map((item) => ({ ...item, Details: null }))
      );
    } else {
      // Show all details by restoring them from the original data
      setFilteredData(automotiveData);
    }
  };

  return (
    <main className="main-container">
      <InputModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedMetric={selectedMetric}
        automotiveData={automotiveData}
        setAutomotiveData={setAutomotiveData}
        setFilteredData={setFilteredData}
      />
      <div className="actions-container">
        <button
          className="expand-collapse-button"
          onClick={toggleAllDetailsHandler}
        >
          {filteredData.every(
            (item) => item.Details && item.Details.length > 0
          ) ? (
            <>Collapse All</>
          ) : (
            <>Expand All</>
          )}
        </button>
        <button className="delete-button">Delete</button>
      </div>
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th className="action-column">Actions</th>
            <th className="metric-id-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({
                        ...prev,
                        Metric_ID: !prev.Metric_ID,
                      }))
                    }
                    className="filter-icon"
                  />
                </div>
                <p>Metric ID</p>
              </div>
            </th>
            <th className="metric-name-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({
                        ...prev,
                        Metric_Name: !prev.Metric_Name,
                      }))
                    }
                    className="filter-icon"
                  />
                </div>
                <p>Metric Name</p>
              </div>
            </th>
            <th className="geo-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({ ...prev, Geo: !prev.Geo }))
                    }
                    className="filter-icon"
                  />
                </div>
                <p>Geo</p>
              </div>
            </th>
            <th className="lob-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({ ...prev, LOB: !prev.LOB }))
                    }
                    className="filter-icon"
                  />
                </div>
                LOB
              </div>
            </th>
            <th className="rtm-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({ ...prev, RTM: !prev.RTM }))
                    }
                    className="filter-icon"
                  />
                </div>
                RTM
              </div>
            </th>
            <th className="domestic-column">
              <div className="flex-container">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({
                        ...prev,
                        Domestric: !prev.Domestric,
                      }))
                    }
                    className="filter-icon"
                  />
                </div>
                <p>Same day Domestic</p>
              </div>
            </th>
            <th>Metric Type</th>
            <th>Benchmark value</th>
            <th>Metric Weightage</th>
            <th>Metric Ceiling</th>
            <th>Metric Floor</th>
            <th>Metric Sign</th>
            <th>Benchmark Ceiling</th>
            <th>Benchmark Logic type</th>
            <th>Ranking Metric</th>
          </tr>
          <tr>
            <td></td>
            {filterVisible.Metric_ID ? (
              <td className="metric-id-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={automotiveData.map((item) => ({
                    value: item.Metric_ID,
                    label: item.Metric_ID,
                  }))}
                  placeholder="Metric ID"
                  value={filteredData.map((item) => item.Metric_ID)}
                  onChange={filterByMetricID}
                />
              </td>
            ) : (
              <td></td>
            )}
            {filterVisible.Metric_Name ? (
              <td className="metric-name-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={automotiveData.map((item) => ({
                    value: item.Metric_Name,
                    label: item.Metric_Name,
                  }))}
                  placeholder="Metric Name"
                  value={filteredData.map((item) => item.Metric_Name)}
                  onChange={filterByMetricName}
                />
              </td>
            ): (
              <td></td>
            )}
            {filterVisible.Geo ? (
              <td className="geo-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={getUniqueGeoData(automotiveData)}
                  placeholder="Geo"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.Geo))
                    .filter((geo) => geo)}
                  onChange={filterByGeo}
                />
              </td>
            ): (
              <td></td>
            )}
            {filterVisible.LOB ? (
              <td className="lob-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={getUniqueLOBData(automotiveData)}
                  placeholder="LOB"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.LOB))
                    .filter((lob) => lob)}
                  onChange={filterByLob}
                />
              </td>
            ): (
              <td></td>
            )}
            {filterVisible.RTM ? (
              <td className="rtm-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={getUniqueRtmData(automotiveData)}
                  placeholder="RTM"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.RTM))
                    .filter((rtm) => rtm)}
                  onChange={filterByRtm}
                />
              </td>
            ): (
              <td></td>
            )}
            {filterVisible.Domestric ? (
              <td className="domestic-filter-column">
                <TreeSelect
                  className="tree-select"
                  treeCheckable
                  treeData={getUniqueDomestricData(automotiveData)}
                  placeholder="Same day Domestic"
                  value={filteredData
                    .flatMap((item) =>
                      item.Details.map((detail) => detail.Domestric)
                    )
                    .filter((domestic) => domestic)}
                  onChange={filterByDomestric}
                />
              </td>
            ): (
              <td></td>
            )}
            <td colSpan={15}></td>
          </tr>
        </thead>

        <tbody className="table-body">
          {filteredData.map((item, i) => (
            <Fragment key={i}>
              <tr className="item-row">
                <td className="actions-column">
                  <button
                    className="actions-button"
                    onClick={() => openModal(item.Metric_ID, item.Metric_Name)}
                  >
                    <IoIosAddCircleOutline size={24} color="#93969CFF" />
                  </button>
                </td>
                <td className="metric-id-column">
                  <div className="flex-container">
                    <button
                      onClick={() => toggleDetailsHandler(item.Metric_ID)}
                    >
                      {!item.Details && (
                        <BiSolidRightArrow size={15} color="#93969CFF" />
                      )}
                      {item.Details && (
                        <BiSolidDownArrow size={15} color="#93969CFF" />
                      )}
                    </button>
                    <p>{item.Metric_ID}</p>
                  </div>
                </td>
                <td colSpan={6}>
                  <p>{item.Metric_Name}</p>
                </td>
                <td className="benchmark-value-column">
                  <div className="flex">
                    <input
                      className="benchmark-input"
                      placeholder="%"
                      onChange={(e) =>
                        filterByBenchMarkValue(item.Metric_ID, e.target.value)
                      }
                    />
                  </div>
                </td>
                <td className="metric-weightage-column">
                  <div className="flex">
                    <input
                      className="weightage-input"
                      placeholder="%"
                      onChange={(e) =>
                        filterByWeightageValue(item.Metric_ID, e.target.value)
                      }
                    />
                  </div>
                </td>
                <td colSpan={6}></td>
              </tr>
              {item.Details?.map((insideItem, i) => (
                <tr key={i} className="details-row">
                  <td colSpan={2}></td>
                  <td className="detail-name-column">
                    {item.Metric_Name + " - " + insideItem.LOB}
                  </td>
                  <td className="detail-geo-column text-center">
                    {insideItem.Geo}
                  </td>
                  <td className="detail-lob-column text-center">
                    {insideItem.LOB}
                  </td>
                  <td className="detail-rtm-column text-center">
                    {insideItem.RTM}
                  </td>
                  <td className="detail-domestic-column text-center">
                    {insideItem.Domestric}
                  </td>
                  <td className="detail-metric-type-column text-center">
                    {insideItem.Metric_type}
                  </td>
                  <td className="detail-benchmark-value-column text-center">
                    {insideItem.Benchmark_value}%
                  </td>
                  <td className="detail-metric-weightage-column text-center">
                    {insideItem.Metric_Weightage}%
                  </td>
                  <td className="detail-benchmark-ceiling-column text-center">
                    {insideItem.Benchmark_Ceiling}
                  </td>
                  <td className="detail-metric-floor-column text-center">
                    {insideItem.Metric_Floor}
                  </td>
                  <td className="detail-metric-sign-column text-center">
                    {insideItem.Metric_Sign}
                  </td>
                  <td className="detail-benchmark-ceiling-column text-center">
                    {insideItem.Benchmark_Ceiling}
                  </td>
                  <td className="detail-benchmark-logic-type-column text-center">
                    {insideItem.Benchmark_Logic_type}
                  </td>
                  <td className="detail-ranking-metric-column text-center">
                    {insideItem.Ranking_Metric}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
