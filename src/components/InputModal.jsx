import { Checkbox, Modal, Steps, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Select } from "antd";
import { GEOData } from "../constant";
import PropTypes from "prop-types";

export default function InputModal({
  isDialogOpen,
  setIsDialogOpen,
  selectedMetric,
  automotiveData,
  setAutomotiveData,
  setFilteredData,
}) {
  InputModal.propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    setIsDialogOpen: PropTypes.func.isRequired,
    selectedMetric: PropTypes.shape({
      Metric_ID: PropTypes.string.isRequired,
      Metric_Name: PropTypes.string.isRequired,
    }).isRequired,
    automotiveData: PropTypes.any.isRequired,
    setAutomotiveData: PropTypes.func.isRequired,
    setFilteredData: PropTypes.func.isRequired,
  };
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [current, setCurrent] = useState(0);
  const [filteredGeoData, setFilteredGeoData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    regions: false,
    countries: false,
    marketTeams: false,
    markets: false,
    stores: false,
  });
  const [InputData, setInputData] = useState({
    metric_type: "",
    benchmark_value: "",
    metric_weightage: "",
    metric_ceiling: "",
    metric_floor: "",
    metric_sign: "",
    benchmark_ceiling: "",
  });

  const [selectableData, setSelectableData] = useState({
    lob: [],
    rtm: undefined,
    same_day_domestic: undefined,
    benchmark_logic_type: undefined,
    ranking_metric: undefined,
  });
  const [error, setError] = useState({
    geo: false,
    lob: false,
    rtm: false,
    same_day_domestic: false,
    ranking_metric: false,
  });
  const [finalData, setFinalData] = useState([]);
  const [previewData, setPreviewData] = useState({
    newData: [],
    existingData: [],
  });

  const cancelButtonHandler = () => {
    setPreviewData({ newData: [], existingData: [] });
    setFilteredGeoData([]);
    setSelectedData({
      regions: false,
      countries: false,
      marketTeams: false,
      markets: false,
      stores: false,
    });
    setInputData({
      metric_type: "",
      benchmark_value: "",
      metric_weightage: "",
      metric_ceiling: "",
      metric_floor: "",
      metric_sign: "",
      benchmark_ceiling: "",
    });
    setSelectableData({
      lob: [],
      rtm: undefined,
      same_day_domestic: undefined,
      benchmark_logic_type: undefined,
      ranking_metric: undefined,
    });
    setIsDialogOpen(false);
    setCancelDialogOpen(false);
    setCurrent(0);
  };

  const createButtonHandler = () => {
    setAutomotiveData((prev) => {
      let updatedData = [...prev];

      // Find index of existing Metric_ID
      const metricIndex = updatedData.findIndex(
        (item) => item.Metric_ID === selectedMetric.Metric_ID
      );

      if (metricIndex !== -1) {
        let existingDetails = [...updatedData[metricIndex].Details];

        previewData.existingData.forEach((existingEntry) => {
          const existingIndex = existingDetails.findIndex(
            (detail) =>
              detail.Geo === existingEntry.Country &&
              detail.LOB === existingEntry.LOB
          );

          if (existingIndex !== -1) {
            existingEntry.Geo = existingEntry.Country;
            existingDetails[existingIndex] = existingEntry; // Replace existing entry
          }
        });

        existingDetails = [...existingDetails, ...previewData.newData];

        updatedData[metricIndex] = {
          ...updatedData[metricIndex],
          Details: existingDetails,
        };
      } else {
        if (previewData.newData.length > 0) {
          const newEntry = {
            Metric_ID: selectedMetric.Metric_ID,
            Metric_Name: selectedMetric.Metric_Name,
            Details: previewData.newData,
          };
          updatedData.push(newEntry);
        }
      }

      setFilteredData(updatedData);
      console.log(updatedData);

      return updatedData;
    });

    setPreviewData({ newData: [], existingData: [] });
    setFilteredGeoData([]);
    setSelectedData({
      regions: false,
      countries: false,
      marketTeams: false,
      markets: false,
      stores: false,
    });
    setInputData({
      metric_type: "",
      benchmark_value: "",
      metric_weightage: "",
      metric_ceiling: "",
      metric_floor: "",
      metric_sign: "",
      benchmark_ceiling: "",
    });
    setSelectableData({
      lob: [],
      rtm: undefined,
      same_day_domestic: undefined,
      benchmark_logic_type: undefined,
      ranking_metric: undefined,
    });
    setIsDialogOpen(false);
    setCurrent(0);
  };

  const compareAndSetPreviewData = () => {
    const newData = [];
    const existingData = [];

    finalData.forEach((entry) => {
      // Check if entry exists in automotiveData based on country & LOB
      const exists = automotiveData.some((auto) =>
        auto.Details.some(
          (detail) => detail.Geo === entry.Geo && detail.LOB === entry.LOB
        )
      );

      if (exists) {
        existingData.push(entry);
      } else {
        newData.push(entry);
      }
    });

    setPreviewData({ newData, existingData });
  };

  useEffect(() => {
    if (finalData.length > 0) {
      compareAndSetPreviewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalData]);

  const nextButtonHandler = () => {
    setError({
      geo: false,
      lob: false,
      rtm: false,
      same_day_domestic: false,
      ranking_metric: false,
    });

    if (filteredGeoData.length === 0) {
      setError((prev) => ({ ...prev, geo: true }));
      return;
    }
    if (selectableData.lob.length === 0) {
      setError((prev) => ({ ...prev, lob: true }));
      return;
    }
    if (selectableData.rtm === undefined) {
      setError((prev) => ({ ...prev, rtm: true }));
      return;
    }
    if (selectableData.same_day_domestic === undefined) {
      setError((prev) => ({ ...prev, same_day_domestic: true }));
      return;
    }
    if (selectableData.ranking_metric === undefined) {
      setError((prev) => ({ ...prev, ranking_metric: true }));
      return;
    }

    const finalData = [];

    // 🔹 Define additional fields once to avoid repetition
    const additionalFields = {
      RTM: selectableData.rtm || "",
      Domestric: selectableData.same_day_domestic || "",
      Ranking_Metric: selectableData.ranking_metric || "",
      Benchmark_Logic_type: selectableData.benchmark_logic_type || "",
      Metric_type: InputData.metric_type || "",
      Benchmark_value: InputData.benchmark_value || "",
      Metric_Weightage: InputData.metric_weightage || "",
      Metric_Ceiling: InputData.metric_ceiling || "",
      Metric_Floor: InputData.metric_floor || "",
      Metric_Sign: InputData.metric_sign || "",
      Benchmark_Ceiling: InputData.benchmark_ceiling || "",
    };

    // 🔹 Identify the most recent `true` level in `selectedData`
    const activeLevel = Object.keys(selectedData)
      .reverse()
      .find((key) => selectedData[key]); // Gets the last `true` key

    filteredGeoData.forEach((region) => {
      if (activeLevel === "regions") {
        selectableData.lob.forEach((lob) => {
          finalData.push({
            Geo: region.region || "Result",
            LOB: lob,
            ...additionalFields,
          });
        });
        return;
      }

      region.country?.forEach((country) => {
        if (activeLevel === "countries") {
          selectableData.lob.forEach((lob) => {
            finalData.push({
              Geo: country.Country_Name || "Result",
              LOB: lob,
              ...additionalFields,
            });
          });
          return;
        }

        country.Market_Team?.forEach((team) => {
          if (activeLevel === "marketTeams") {
            selectableData.lob.forEach((lob) => {
              finalData.push({
                Geo: team.Market_Team_Name || "Result",
                LOB: lob,
                ...additionalFields,
              });
            });
            return;
          }

          team.Market?.forEach((market) => {
            if (activeLevel === "markets") {
              selectableData.lob.forEach((lob) => {
                finalData.push({
                  Geo: market.Market_Name || "Result",
                  LOB: lob,
                  ...additionalFields,
                });
              });
              return;
            }

            market.Store?.forEach((store) => {
              if (activeLevel === "stores") {
                selectableData.lob.forEach((lob) => {
                  finalData.push({
                    Geo: store.Store_Name || "Result",
                    LOB: lob,
                    ...additionalFields,
                  });
                });
                return;
              }

              finalData.push({ Geo: "Result", ...additionalFields });
            });
          });
        });
      });
    });

    setFinalData(finalData);
    setCurrent(1);
  };

  const addDataOfSelectedStore = (
    event,
    region,
    countryName,
    teamName,
    marketName,
    storeName
  ) => {
    const { checked } = event.target;

    // Modify the filteredGeoData
    const updatedGeoData = filteredGeoData.map((item) => {
      if (item.region !== region) return item;

      return {
        ...item,
        country: item.country.map((country) => {
          if (country.Country_Name !== countryName) return country;

          return {
            ...country,
            Market_Team: country.Market_Team.map((team) => {
              if (team.Market_Team_Name !== teamName) return team;

              return {
                ...team,
                Market: team.Market.map((market) => {
                  if (market.Market_Name !== marketName) return market;

                  const updatedStores = checked
                    ? [...(market.Store || []), { Store_Name: storeName }]
                    : market.Store?.filter((s) => s.Store_Name !== storeName) ||
                      [];

                  return {
                    ...market,
                    Store: updatedStores,
                  };
                }),
              };
            }),
          };
        }),
      };
    });

    const updatedStores = updatedGeoData.some((region) =>
      region.country.some((country) =>
        country.Market_Team?.some((team) =>
          team.Market?.some(
            (market) => Array.isArray(market.Store) && market.Store.length > 0
          )
        )
      )
    );

    // Now set filteredGeoData and selectedData
    setFilteredGeoData(updatedGeoData); // Update filteredGeoData state
    setSelectedData((prev) => ({
      ...prev,
      regions: updatedGeoData.length > 0,
      countries: updatedGeoData.some((region) => region.country?.length > 0),
      marketTeams: updatedGeoData.some((region) =>
        region.country?.some((country) => country.Market_Team?.length > 0)
      ),
      markets: updatedGeoData.some((region) =>
        region.country.some((country) =>
          country.Market_Team?.some((team) => team.Market?.length > 0)
        )
      ),
      stores: updatedStores, // Update stores if there's store data
    }));
  };

  const addDataOfSelectedMarket = (
    event,
    region,
    countryName,
    teamName,
    marketName
  ) => {
    const { checked } = event.target;

    setFilteredGeoData((prev) => {
      const updatedGeoData = prev.map((item) => {
        if (item.region !== region) return item;

        return {
          ...item,
          country: item.country.map((country) => {
            if (country.Country_Name !== countryName) return country;

            return {
              ...country,
              Market_Team: country.Market_Team.map((team) => {
                if (team.Market_Team_Name !== teamName) return team;

                const updatedMarkets = checked
                  ? [...(team.Market || []), { Market_Name: marketName }]
                  : team.Market?.filter((m) => m.Market_Name !== marketName) ||
                    [];

                return {
                  ...team,
                  Market: updatedMarkets,
                };
              }),
            };
          }),
        };
      });

      // Update selectedData after modifying filteredGeoData
      setSelectedData((prev) => {
        const updatedRegions = updatedGeoData.length > 0;
        const updatedCountries = updatedGeoData?.some(
          (region) => region.country?.length > 0
        );
        const updatedMarketTeams = updatedGeoData.some((region) =>
          region.country.some(
            (country) => country.Market_Team && country.Market_Team.length > 0
          )
        );
        const updatedMarkets = updatedGeoData.some((region) =>
          region.country?.some((country) =>
            country.Market_Team?.some((team) => team.Market?.length > 0)
          )
        );

        return {
          ...prev, // Keep previous state
          regions: updatedRegions,
          countries: updatedCountries,
          marketTeams: updatedMarketTeams,
          markets: updatedMarkets, // Set this based on available markets
          stores: prev.stores, // Keep previous stores state
        };
      });

      return updatedGeoData;
    });
  };

  const addDataOfSelectedMarketTeam = (
    event,
    region,
    countryName,
    teamName
  ) => {
    const { checked } = event.target;

    setFilteredGeoData((prev) => {
      const regionIndex = prev.findIndex((item) => item.region === region);

      if (regionIndex !== -1) {
        const updatedGeoData = [...prev];
        const countryIndex = updatedGeoData[regionIndex].country.findIndex(
          (c) => c.Country_Name === countryName
        );

        if (countryIndex !== -1) {
          // Initialize Market_Team array if it doesn't exist
          if (!updatedGeoData[regionIndex].country[countryIndex].Market_Team) {
            updatedGeoData[regionIndex].country[countryIndex].Market_Team = [];
          }

          if (checked) {
            // Add market team if not already present
            if (
              !updatedGeoData[regionIndex].country[
                countryIndex
              ].Market_Team.some((team) => team.Market_Team_Name === teamName)
            ) {
              updatedGeoData[regionIndex].country[
                countryIndex
              ].Market_Team.push({
                Market_Team_Name: teamName,
              });
            }
          } else {
            // Remove market team if unchecked
            updatedGeoData[regionIndex].country[countryIndex].Market_Team =
              updatedGeoData[regionIndex].country[
                countryIndex
              ].Market_Team.filter(
                (team) => team.Market_Team_Name !== teamName
              );

            // If no Market_Teams left, remove the property
            if (
              updatedGeoData[regionIndex].country[countryIndex].Market_Team
                .length === 0
            ) {
              delete updatedGeoData[regionIndex].country[countryIndex]
                .Market_Team;
            }
          }

          setSelectedData((prev) => {
            const updatedMarkets = updatedGeoData?.some((region) =>
              region.country.some((country) =>
                country.Market_Team?.some((team) => team.Market?.length > 0)
              )
            );

            return {
              ...prev, // Spread the previous state to retain other data
              regions: updatedGeoData.length > 0,
              countries: updatedGeoData?.some(
                (region) => region.country?.length > 0
              ),
              marketTeams: updatedGeoData?.some((region) =>
                region.country.some(
                  (country) =>
                    country.Market_Team && country.Market_Team.length > 0
                )
              ),
              markets: updatedMarkets, // Keep prev markets if no new market data
              stores: false, // Keep prev stores
            };
          });

          return updatedGeoData;
        }
      }
      return prev;
    });
  };

  const addDataOfSelectedCountry = (event, region) => {
    const { id, checked } = event.target;

    // Update filteredGeoData for countries
    setFilteredGeoData((prev) => {
      const regionIndex = prev.findIndex((item) => item.region === region);

      if (regionIndex !== -1) {
        const updatedGeoData = [...prev];

        // Ensure that the country field is always an array
        if (!Array.isArray(updatedGeoData[regionIndex].country)) {
          updatedGeoData[regionIndex].country = [];
        }

        if (checked) {
          // Check if the country is already in the list to avoid duplicates
          const isCountryAlreadyAdded = updatedGeoData[
            regionIndex
          ].country.some((country) => country.Country_Name === id);

          if (!isCountryAlreadyAdded) {
            // Add the country to the selected region if not already added
            updatedGeoData[regionIndex].country = [
              ...updatedGeoData[regionIndex].country,
              { Country_Name: id },
            ];
          }
        } else {
          // Remove the country from the selected region
          updatedGeoData[regionIndex].country = updatedGeoData[
            regionIndex
          ].country.filter((country) => country.Country_Name !== id);
        }

        setSelectedData((prev) => ({
          ...prev, // Keep previous values
          regions: updatedGeoData.length > 0,
          countries: updatedGeoData.some(
            (region) => region.country?.length > 0
          ),
          marketTeams: updatedGeoData.some((region) =>
            region.country?.some(
              (country) => country.Market_Team && country.Market_Team.length > 0
            )
          ),
        }));

        return updatedGeoData;
      } else {
        return prev;
      }
    });
  };

  const addDataToSelectedRegion = (event) => {
    const { id, checked } = event.target;

    setFilteredGeoData((prev) => {
      let updatedGeoData;
      if (id === "ww") {
        updatedGeoData = checked
          ? GEOData.map((item) => ({ region: item.region, country: [] }))
          : [];
      } else {
        updatedGeoData = checked
          ? [...prev, { region: id, country: [] }]
          : prev.filter((item) => item.region !== id);
      }

      // Update selectedData based on the presence of regions
      setSelectedData((prev) => ({
        ...prev, // Preserve previous state
        regions: updatedGeoData.length > 0,
        countries: updatedGeoData.some((region) => region.country?.length > 0),
        marketTeams: prev.marketTeams, // Keep existing value
        markets: prev.markets, // Keep existing value
        stores: prev.stores, // Keep existing value
      }));

      return updatedGeoData;
    });
  };

  const isAllSelected = GEOData.every((item) =>
    filteredGeoData.some((selected) => selected.region === item.region)
  );
  const getSelectedCountryCount = () => {
    return filteredGeoData.reduce((count, region) => {
      const selectedCountries = region.country.filter((country) =>
        filteredGeoData.some(
          (selected) =>
            selected.region === region.region &&
            selected.country.some(
              (c) => c.Country_Name === country.Country_Name
            )
        )
      );
      return count + selectedCountries.length;
    }, 0);
  };

  const getSelectedMarketTeamCount = () => {
    return filteredGeoData.reduce((count, region) => {
      return (
        count +
        (region.country?.reduce((teamsCount, country) => {
          return (
            teamsCount + (country.Market_Team?.length || 0) // ✅ Directly count Market_Team
          );
        }, 0) || 0)
      );
    }, 0);
  };

  const getSelectedMarketCount = () => {
    return filteredGeoData.reduce((count, region) => {
      return (
        count +
        (region.country?.reduce((marketsCount, country) => {
          return (
            marketsCount +
            (country.Market_Team?.reduce((marketCount, team) => {
              return marketCount + (team.Market?.length || 0); // ✅ Direct count
            }, 0) || 0)
          );
        }, 0) || 0)
      );
    }, 0);
  };

  const getSelectedStoreCount = () => {
    return filteredGeoData.reduce((count, region) => {
      const selectedStores = region.country.reduce((storesCount, country) => {
        const selectedStoresInCountry = country.Market_Team?.reduce(
          (storeCount, team) => {
            const selectedStoresInTeam = team.Market?.reduce(
              (storeCount, market) => {
                const selectedStoresInMarket = market.Store?.filter((store) =>
                  filteredGeoData.some(
                    (selected) =>
                      selected.region === region.region &&
                      selected.country.some(
                        (c) =>
                          c.Country_Name === country.Country_Name &&
                          c.Market_Team.some(
                            (t) =>
                              t.Market_Team_Name === team.Market_Team_Name &&
                              t.Market.some(
                                (m) =>
                                  m.Market_Name === market.Market_Name &&
                                  m.Store.some(
                                    (s) => s.Store_Name === store.Store_Name
                                  )
                              )
                          )
                      )
                  )
                );
                return storeCount + (selectedStoresInMarket?.length || 0);
              },
              0
            );
            return storeCount + (selectedStoresInTeam || 0);
          },
          0
        );
        return storesCount + (selectedStoresInCountry || 0);
      }, 0);
      return count + selectedStores;
    }, 0);
  };

  return (
    <div>
      <Modal
        open={cancelDialogOpen}
        onCancel={() => setCancelDialogOpen(false)}
        onOk={() => cancelButtonHandler()}
        okText="Yes"
        cancelText="No"
        centered
      >
        <p className="font-medium p-2">
          Are you sure you want to clear all the selected data?
        </p>
      </Modal>
      <Modal
        centered={true}
        open={isDialogOpen}
        width={1300}
        height={600}
        onCancel={() => setIsDialogOpen(false)}
        footer={() => (
          <div className="flex gap-2 justify-end">
            <button
              className="border px-4 py-1 rounded-md"
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancel
            </button>
            {current === 0 && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={nextButtonHandler}
              >
                Next
              </button>
            )}
            {current === 1 && (
              <button
                className="border px-4 py-1 rounded-md"
                onClick={() => setCurrent(0)}
              >
                Back
              </button>
            )}
            {current === 1 && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={createButtonHandler}
              >
                Create
              </button>
            )}
          </div>
        )}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-medium text-center">
            {selectedMetric?.Metric_Name}
          </h4>
          <div className="flex justify-center">
            <Steps
              className="w-[30%]"
              size="small"
              items={[
                { key: "configure", title: "Configure" },
                { key: "preview", title: "Preview" },
              ]}
              current={current}
              labelPlacement="vertical"
            />
          </div>
          {current === 0 && (
            <>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-medium">Geo</p>
                  <IoSearch size={20} />
                </div>
                <div className="flex justify-center ">
                  <div className="flex w-[98%] gap-3">
                    <div className=" w-[50%]">
                      <p>Region ({filteredGeoData.length})</p>
                      <div className="border rounded-lg h-[15rem]">
                        <div className="border-b p-2 flex gap-2">
                          <Checkbox
                            id="ww"
                            checked={isAllSelected}
                            onChange={addDataToSelectedRegion}
                          />
                          <label htmlFor="ww">ww</label>
                        </div>
                        {GEOData.map((item, i) => (
                          <div key={i} className="p-2 flex gap-2">
                            <Checkbox
                              id={item.region}
                              onChange={addDataToSelectedRegion}
                              checked={filteredGeoData.some(
                                (selected) => selected.region === item.region
                              )}
                            />
                            <label htmlFor={item.region}>{item.region}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className=" w-[50%]">
                      <p>Country ({getSelectedCountryCount()})</p>
                      <div className="border rounded-lg h-[15rem] overflow-y-auto">
                        {filteredGeoData.map((item) => {
                          const regionData = GEOData.find(
                            (geo) => geo?.region === item?.region
                          );
                          return regionData?.country?.map((country) => {
                            const isCountrySelected = item.country?.some(
                              (selectedCountry) =>
                                selectedCountry.Country_Name ===
                                country.Country_Name
                            );

                            return (
                              <div
                                key={country.Country_Name}
                                className="p-2 flex gap-2"
                              >
                                <Checkbox
                                  id={country.Country_Name}
                                  onChange={(event) =>
                                    addDataOfSelectedCountry(event, item.region)
                                  }
                                  checked={isCountrySelected}
                                />
                                <label htmlFor={country.Country_Name}>
                                  {country.Country_Name}
                                </label>
                              </div>
                            );
                          });
                        })}
                        {!selectedData.regions && (
                          <div className="h-full w-full flex justify-center items-center p-2">
                            <p className="text-center font-medium text-slate-400">
                              Select a Region to see the list of countries
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" w-[60%]">
                      <p>Market Team ({getSelectedMarketTeamCount()})</p>
                      <div className="border rounded-lg h-[15rem] overflow-y-auto">
                        {filteredGeoData.map((item) => (
                          <div key={item.region}>
                            {item.country && item.country.length > 0 ? (
                              item.country.map((country) => {
                                const regionData = GEOData.find(
                                  (geo) => geo.region === item.region
                                );
                                const selectedCountry =
                                  regionData?.country.find(
                                    (c) =>
                                      c.Country_Name === country.Country_Name
                                  );

                                return selectedCountry?.Market_Team.map(
                                  (team, index) => (
                                    <div key={index} className="p-2 flex gap-2">
                                      <Checkbox
                                        id={team.Market_Team_Name}
                                        onChange={(e) =>
                                          addDataOfSelectedMarketTeam(
                                            e,
                                            item.region,
                                            country.Country_Name,
                                            team.Market_Team_Name
                                          )
                                        }
                                        checked={
                                          country.Market_Team?.some(
                                            (selectedTeam) =>
                                              selectedTeam.Market_Team_Name ===
                                              team.Market_Team_Name
                                          ) || false
                                        }
                                      />
                                      <label htmlFor={team.Market_Team_Name}>
                                        {team.Market_Team_Name}
                                      </label>
                                    </div>
                                  )
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                        {!selectedData.countries && (
                          <div className="h-full w-full flex justify-center items-center p-2">
                            <p className="text-center font-medium text-slate-400">
                              Select a Country to see the list of Market Team
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" w-[50%]">
                      <p>Market ({getSelectedMarketCount()})</p>
                      <div className="border rounded-lg h-[15rem] overflow-y-auto p-2">
                        {filteredGeoData.map((item) => {
                          const regionData = GEOData.find(
                            (geo) => geo.region === item.region
                          );

                          return regionData?.country?.map((country) => {
                            const selectedCountry = item.country?.find(
                              (c) => c.Country_Name === country.Country_Name
                            );

                            return selectedCountry?.Market_Team?.map((team) => {
                              const marketTeamData = country.Market_Team.find(
                                (t) =>
                                  t.Market_Team_Name === team.Market_Team_Name
                              );

                              return marketTeamData?.Market?.map((market) => (
                                <div
                                  key={market.Market_Name}
                                  className="mb-2 flex gap-2"
                                >
                                  <Checkbox
                                    id={market.Market_Name}
                                    onChange={(e) =>
                                      addDataOfSelectedMarket(
                                        e,
                                        item.region,
                                        country.Country_Name,
                                        team.Market_Team_Name,
                                        market.Market_Name
                                      )
                                    }
                                    checked={selectedCountry?.Market_Team?.some(
                                      (t) =>
                                        t.Market_Team_Name ===
                                          team.Market_Team_Name &&
                                        t.Market?.some(
                                          (m) =>
                                            m.Market_Name === market.Market_Name
                                        )
                                    )}
                                  />
                                  <label htmlFor={market.Market_Name}>
                                    {market.Market_Name}
                                  </label>
                                </div>
                              ));
                            });
                          });
                        })}
                        {!selectedData.marketTeams && (
                          <div className="h-full w-full flex justify-center items-center p-2">
                            <p className="text-center font-medium text-slate-400">
                              Select a Market team to see the list of Markets
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" w-[50%]">
                      <p>Store ({getSelectedStoreCount()})</p>
                      <div className="border rounded-lg h-[15rem] overflow-y-auto p-2">
                        {filteredGeoData.map((item) =>
                          item.country?.map((country) =>
                            country.Market_Team?.map((team) =>
                              team.Market?.map((selectedMarket) => {
                                const marketData = GEOData.find(
                                  (geo) => geo.region === item.region
                                )
                                  ?.country.find(
                                    (c) =>
                                      c.Country_Name === country.Country_Name
                                  )
                                  ?.Market_Team.find(
                                    (t) =>
                                      t.Market_Team_Name ===
                                      team.Market_Team_Name
                                  )
                                  ?.Market.find(
                                    (m) =>
                                      m.Market_Name ===
                                      selectedMarket.Market_Name
                                  );

                                return (
                                  marketData &&
                                  marketData.Store.map((store) => (
                                    <div
                                      key={store.Store_Name}
                                      className="mb-2 flex gap-2"
                                    >
                                      <Checkbox
                                        id={store.Store_Name}
                                        onChange={(e) =>
                                          addDataOfSelectedStore(
                                            e,
                                            item.region,
                                            country.Country_Name,
                                            team.Market_Team_Name,
                                            selectedMarket.Market_Name,
                                            store.Store_Name
                                          )
                                        }
                                        checked={selectedMarket?.Store?.some(
                                          (s) =>
                                            s.Store_Name === store.Store_Name
                                        )}
                                      />
                                      <label htmlFor={store.Store_Name}>
                                        {store.Store_Name}
                                      </label>
                                    </div>
                                  ))
                                );
                              })
                            )
                          )
                        )}
                        {!selectedData.markets && (
                          <div className="h-full w-full flex justify-center items-center p-2">
                            <p className="text-center font-medium text-slate-400">
                              Select a Market to see the list of Stores
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-[50%]">
                      <p>
                        Selected (
                        {selectedData.stores
                          ? getSelectedStoreCount()
                          : selectedData.markets
                          ? getSelectedMarketCount()
                          : selectedData.marketTeams
                          ? getSelectedMarketTeamCount()
                          : selectedData.countries
                          ? getSelectedCountryCount()
                          : selectedData.regions
                          ? filteredGeoData.length
                          : 0}
                        )
                      </p>
                      <div className="border rounded-lg h-[15rem]  bg-blue-100 overflow-y-auto p-2">
                        {filteredGeoData.length === 0 ? (
                          <></>
                        ) : (
                          filteredGeoData.map((regionData) => (
                            <div key={regionData.region} className="mb-2">
                              {/* Region */}
                              {selectedData.regions &&
                                !selectedData.countries && (
                                  <p className="">{regionData.region}</p>
                                )}

                              {regionData.country?.map((country) => (
                                <div key={country.Country_Name}>
                                  {/* Country */}
                                  {selectedData.countries &&
                                    !selectedData.marketTeams && (
                                      <p>{country.Country_Name}</p>
                                    )}

                                  {country.Market_Team?.map((marketTeam) => (
                                    <div key={marketTeam.Market_Team_Name}>
                                      {/* Market Team */}
                                      {selectedData.marketTeams &&
                                        !selectedData.markets && (
                                          <p>{marketTeam.Market_Team_Name}</p>
                                        )}

                                      {marketTeam.Market?.map((market) => (
                                        <div key={market.Market_Name}>
                                          {/* Market */}
                                          {selectedData.markets &&
                                            !selectedData.stores && (
                                              <p>{market.Market_Name}</p>
                                            )}

                                          {market.Store?.map((store) => (
                                            <div key={store.Store_Name}>
                                              {selectedData.stores && (
                                                <p>{store.Store_Name}</p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {error.geo && (
                <p className="text-sm text-red-600">
                  Please select the data you want to add from Geo
                </p>
              )}
              <div className="grid grid-cols-4 grid-rows-3 w-full justify-items-center gap-x-10">
                <div className="flex flex-col w-full">
                  <label>LOB</label>
                  <TreeSelect
                    status={error.lob ? "error" : ""}
                    treeCheckable
                    treeData={[
                      { value: "Hatchback", label: "Hatchback" },
                      { value: "Sedan", label: "Sedan" },
                      { value: "SUV", label: "SUV" },
                    ]}
                    placeholder={error.lob ? "Please Select LOB" : "LOB"}
                    onChange={(value) =>
                      setSelectableData((prev) => ({ ...prev, lob: value }))
                    }
                    value={selectableData.lob}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Metric Type</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        metric_type: e.target.value,
                      })
                    }
                    value={InputData.metric_type}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Benchmark Value</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        benchmark_value: e.target.value,
                      })
                    }
                    value={InputData.benchmark_value}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Metric Weightage</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        metric_weightage: e.target.value,
                      })
                    }
                    value={InputData.metric_weightage}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>RTM</label>
                  <Select
                    status={error.rtm ? "error" : ""}
                    options={[
                      { value: "Drop-in", label: "Drop-in" },
                      { value: "Pickup", label: "Pickup" },
                      { value: "Truck", label: "Truck" },
                    ]}
                    placeholder={error.rtm ? "Please Select RTM" : "RTM"}
                    onChange={(value) =>
                      setSelectableData((prev) => ({ ...prev, rtm: value }))
                    }
                    value={selectableData.rtm}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Metric Ceiling</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        metric_ceiling: e.target.value,
                      })
                    }
                    value={InputData.metric_ceiling}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Metric floor</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        metric_floor: e.target.value,
                      })
                    }
                    value={InputData.metric_floor}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Metric Sign</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        metric_sign: e.target.value,
                      })
                    }
                    value={InputData.metric_sign}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Same day Domestic</label>
                  <Select
                    status={error.same_day_domestic ? "error" : ""}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    placeholder={
                      error.same_day_domestic
                        ? "Please Select Domestic"
                        : "Domestic"
                    }
                    onChange={(value) =>
                      setSelectableData((prev) => ({
                        ...prev,
                        same_day_domestic: value,
                      }))
                    }
                    value={selectableData.same_day_domestic}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Benchmark Ceiling</label>
                  <input
                    placeholder="%"
                    className="rounded w-full border p-1 px-2 border-slate-200"
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        benchmark_ceiling: e.target.value,
                      })
                    }
                    value={InputData.benchmark_ceiling}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Benchmark Logic Type</label>
                  <Select
                    options={[
                      { value: "Slope", label: "Slope" },
                      { value: "Percentage", label: "Percentage" },
                      { value: "Fixed", label: "Fixed" },
                    ]}
                    placeholder="Benchmark Logic Type"
                    onChange={(value) =>
                      setSelectableData((prev) => ({
                        ...prev,
                        benchmark_logic_type: value,
                      }))
                    }
                    value={selectableData.benchmark_logic_type}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label>Ranking Metric</label>
                  <Select
                    status={error.ranking_metric ? "error" : ""}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    placeholder={
                      error.ranking_metric
                        ? "Please Select Ranking Metric"
                        : "Ranking Metric"
                    }
                    onChange={(value) =>
                      setSelectableData((prev) => ({
                        ...prev,
                        ranking_metric: value,
                      }))
                    }
                    value={selectableData.ranking_metric}
                  />
                </div>
              </div>
            </>
          )}
          {current === 1 && (
            <>
              <div className="flex flex-col gap-5">
                <h4>Ready to create ({previewData.newData.length})</h4>
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 ">
                      <td className="p-2 ">Metric Name</td>
                      <td className="text-center">Geo</td>
                      <td className="text-center">LOB</td>
                      <td className="text-center">RTM</td>
                      <td className="text-center">Same day Domestic</td>
                      <td className="text-center">Metric Weightage</td>
                      <td>Metric Type</td>
                      <td>Benchmark Value</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-100 border-b border-slate-300 ">
                      <td colSpan={15} className="p-5"></td>
                    </tr>
                    {previewData.newData.map((data, index) => (
                      <tr key={index} className="border-b border-slate-300 ">
                        <td className="p-2">{`${
                          selectedMetric?.Metric_Name + " - " + data.LOB
                        }`}</td>
                        <td className="text-center">{data.Geo || "-"}</td>
                        <td className="text-center">{data.LOB || "-"}</td>
                        <td className="text-center">{data.RTM || "-"}</td>
                        <td className="text-center">{data.Domestric || "-"}</td>
                        <td className="text-center">
                          {data.Metric_Weightage || "-"}
                        </td>
                        <td className="text-center">
                          {data.Metric_type || "-"}
                        </td>
                        <td className="text-center">
                          {data.Benchmark_value || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4>Already exists ({previewData.existingData.length})</h4>
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 ">
                      <td className="p-2 ">Metric Name</td>
                      <td className="text-center">Geo</td>
                      <td className="text-center">LOB</td>
                      <td className="text-center">RTM</td>
                      <td className="text-center">Same day Domestic</td>
                      <td className="text-center">Metric Weightage</td>
                      <td>Metric Type</td>
                      <td>Benchmark Value</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-100 border-b border-slate-300 ">
                      <td colSpan={15} className="p-5"></td>
                    </tr>
                    {previewData.existingData.map((data, index) => (
                      <tr key={index} className="border-b border-slate-300 ">
                        <td className="p-2">{`${
                          selectedMetric?.Metric_Name + " - " + data.LOB
                        }`}</td>
                        <td className="text-center">{data.Geo || "-"}</td>
                        <td className="text-center">{data.LOB || "-"}</td>
                        <td className="text-center">{data.RTM || "-"}</td>
                        <td className="text-center">{data.Domestric || "-"}</td>
                        <td className="text-center">
                          {data.Metric_Weightage || "-"}
                        </td>
                        <td className="text-center">
                          {data.Metric_type || "-"}
                        </td>
                        <td className="text-center">
                          {data.Benchmark_value || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
