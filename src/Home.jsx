import { Fragment, useState } from "react";import { BsFilterCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

import { TreeSelect } from "antd";
import "./app.scss";
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
    <main className="flex flex-col justify-center items-center ">
      <InputModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedMetric={selectedMetric}
        automotiveData={automotiveData}
        setAutomotiveData={setAutomotiveData}
        setFilteredData={setFilteredData}
      />
      <div className="flex justify-end w-[98%] gap-2 my-2">
        <button
          className="font-medium bg-blue-400 p-2 rounded-md text-white"
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
        <button className="font-medium p-2 bg-red-500 rounded-md text-white">
          Delete
        </button>
      </div>
      <table className="table-auto w-full">
        <thead className="bg-slate-100 ">
          <tr className=" ">
            <th className="text-sm p-3">Actions</th>
            <th className="text-sm p-3 ">
              <div className="flex items-center gap-2 ">
                <div className="">
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({
                        ...prev,
                        Metric_ID: !prev.Metric_ID,
                      }))
                    }
                    className="cursor-pointer"
                  />
                </div>
                <p>Metric ID</p>
              </div>
            </th>
            <th className="text-sm p-3 flex items-center gap-2">
              <div className=" ">
                <BsFilterCircle
                  size={18}
                  onClick={() =>
                    setFilterVisible((prev) => ({
                      ...prev,
                      Metric_Name: !prev.Metric_Name,
                    }))
                  }
                  className="cursor-pointer"
                />
              </div>
              <p>Metric Name</p>
            </th>
            <th className="text-sm p-3">
              <div className="flex items-center gap-2">
                <BsFilterCircle
                  size={18}
                  onClick={() =>
                    setFilterVisible((prev) => ({ ...prev, Geo: !prev.Geo }))
                  }
                  className="cursor-pointer"
                />
                Geo
              </div>
            </th>
            <th className="text-sm p-3">
              <div className="flex items-center gap-2">
                <BsFilterCircle
                  size={18}
                  onClick={() =>
                    setFilterVisible((prev) => ({ ...prev, LOB: !prev.LOB }))
                  }
                  className="cursor-pointer"
                />
                LOB
              </div>
            </th>
            <th className="text-sm p-3">
              <div className="flex items-center gap-2">
                <BsFilterCircle
                  size={18}
                  onClick={() =>
                    setFilterVisible((prev) => ({ ...prev, RTM: !prev.RTM }))
                  }
                  className="cursor-pointer"
                />
                RTM
              </div>
            </th>
            <th className="text-sm p-3">
              <div className="flex items-center gap-2">
                <div>
                  <BsFilterCircle
                    size={18}
                    onClick={() =>
                      setFilterVisible((prev) => ({
                        ...prev,
                        Domestric: !prev.Domestric,
                      }))
                    }
                    className="cursor-pointer"
                  />
                </div>
                <p>Same day Domestic</p>
              </div>
            </th>
            <th className="text-sm p-3">Metric Type</th>
            <th className="text-sm p-3">Benchmark value</th>
            <th className="text-sm p-3">Metric Weightage</th>
            <th className="text-sm p-3">Metric Ceiling</th>
            <th className="text-sm p-3">Metric Floor</th>
            <th className="text-sm p-3">Metric Sign</th>
            <th className="text-sm p-3">Benchmark Ceiling</th>
            <th className="text-sm p-3">Benchmark Logic type</th>
            <th className="text-sm p-3">Ranking Metric</th>
          </tr>
          <tr>
            <td></td>
            {filterVisible.Metric_ID ? (
              <td className={"w-[10%]"}>
                <TreeSelect
                  className="w-full"
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
              <td className="w-[15%]">
                <TreeSelect
                  className="w-full"
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
            ) : (
              <td></td>
            )}
            {filterVisible.Geo ? (
              <td className="w-[10%]">
                <TreeSelect
                  className="w-full"
                  treeCheckable
                  treeData={getUniqueGeoData(automotiveData)}
                  placeholder="Geo"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.Geo))
                    .filter((geo) => geo)}
                  onChange={filterByGeo}
                />
              </td>
            ) : (
              <td></td>
            )}
            {filterVisible.LOB ? (
              <td className="w-[10%]">
                <TreeSelect
                  className="w-full"
                  treeCheckable
                  treeData={getUniqueLOBData(automotiveData)}
                  placeholder="LOB"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.LOB))
                    .filter((lob) => lob)}
                  onChange={filterByLob}
                />
              </td>
            ) : (
              <td></td>
            )}
            {filterVisible.RTM ? (
              <td className="w-[10%]">
                <TreeSelect
                  className="w-full"
                  treeCheckable
                  treeData={getUniqueRtmData(automotiveData)}
                  placeholder="RTM"
                  value={filteredData
                    .flatMap((item) => item.Details.map((detail) => detail.RTM))
                    .filter((rtm) => rtm)}
                  onChange={filterByRtm}
                />
              </td>
            ) : (
              <td></td>
            )}
            {filterVisible.Domestric ? (
              <td className="w-[10%]">
                <TreeSelect
                  className="w-full"
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
            ) : (
              <td></td>
            )}
            <td colSpan={3}></td>
          </tr>
        </thead>

        <tbody className="text-[#93969CFF]">
          {filteredData.map((item, i) => (
            <Fragment key={i}>
              <tr className="bg-gray-200 border-b border-slate-400 ">
                <td className="flex justify-center">
                  <button
                    className="flex justify-center"
                    onClick={() => openModal(item.Metric_ID, item.Metric_Name)}
                  >
                    <IoIosAddCircleOutline size={24} color="#93969CFF" />
                  </button>
                </td>
                <td className="">
                  <div className="flex items-center gap-2 ">
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
                <td className="">
                  <div className="flex">
                    <input
                      className="border mx-auto bg-white border-[#93969CFF] rounded w-1/2 px-2"
                      placeholder="%"
                      onChange={(e) =>
                        filterByBenchMarkValue(item.Metric_ID, e.target.value)
                      }
                    />
                  </div>
                </td>
                <td className="">
                  <div className="flex">
                    <input
                      className="border mx-auto bg-white border-[#93969CFF] rounded w-1/2 px-2"
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
                <tr key={i} className="border-b border-slate-400">
                  <td colSpan={2}></td>
                  <td className="">
                    {item.Metric_Name + " - " + insideItem.LOB}
                  </td>
                  <td className="text-center">{insideItem.Geo}</td>
                  <td className="text-center">{insideItem.LOB}</td>
                  <td className="text-center">{insideItem.RTM}</td>
                  <td className="text-center">{insideItem.Domestric}</td>
                  <td className="text-center">{insideItem.Metric_type}</td>
                  <td className="text-center">{insideItem.Benchmark_value}%</td>
                  <td className="text-center">
                    {insideItem.Metric_Weightage}%
                  </td>
                  <td className="text-center">
                    {insideItem.Benchmark_Ceiling}
                  </td>
                  <td className="text-center">{insideItem.Metric_Floor}</td>
                  <td className="text-center">{insideItem.Metric_Sign}</td>
                  <td className="text-center">
                    {insideItem.Benchmark_Ceiling}
                  </td>
                  <td className="text-center">
                    {insideItem.Benchmark_Logic_type}
                  </td>
                  <td className="text-center">{insideItem.Ranking_Metric}</td>
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
