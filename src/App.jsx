import { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import "./app.scss";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";


const stateForCountries = [
  {
    Country_Name: "India",
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
  },
  {
    Country_Name: "USA",
    states: [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Pennsylvania",
      "Illinois",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
      "New Jersey",
      "Virginia",
      "Washington",
      "Arizona",
      "Massachusetts",
      "Tennessee",
      "Indiana",
      "Missouri",
      "Maryland",
      "Wisconsin",
      "Colorado",
      "Minnesota",
      "South Carolina",
      "Alabama",
      "Louisiana",
      "Kentucky",
    ],
  },
  {
    Country_Name: "Germany",
    states: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
  },
  {
    Country_Name: "France",
    states: [
      "Île-de-France",
      "Provence-Alpes-Côte d'Azur",
      "Rhône-Alpes",
      "Aquitaine",
      "Normandy",
      "Languedoc-Roussillon",
      "Brittany",
      "Loire Valley",
      "Burgundy",
      "Corsica",
      "Pays de la Loire",
      "Alsace",
      "Lorraine",
      "Centre-Val de Loire",
      "Hauts-de-France",
      "Grand Est",
    ],
  },
  {
    Country_Name: "Russia",
    states: [
      "Moscow",
      "Saint Petersburg",
      "Kazan",
      "Novosibirsk",
      "Yekaterinburg",
      "Nizhny Novgorod",
      "Samara",
      "Omsk",
      "Rostov-on-Don",
      "Chelyabinsk",
      "Ufa",
      "Volgograd",
      "Krasnoyarsk",
      "Perm",
      "Voronezh",
    ],
  },
];

const countriesData = [
  {
    Country_ID: "35666",
    Country_Name: "India",
    state_details: [
      {
        State_Name: "Delhi",
        Population: "19M",
        HDI: "0.75",
        Capital: "New Delhi",
      },
      {
        State_Name: "Maharashtra",
        Population: "122M",
        HDI: "0.72",
        Capital: "Mumbai",
      },
      {
        State_Name: "Karnataka",
        Population: "68M",
        HDI: "0.76",
        Capital: "Bangalore",
      },
      {
        State_Name: "Tamil Nadu",
        Population: "76M",
        HDI: "0.74",
        Capital: "Chennai",
      },
      {
        State_Name: "Uttar Pradesh",
        Population: "231M",
        HDI: "0.59",
        Capital: "Lucknow",
      },
    ],
  },
  {
    Country_ID: "35667",
    Country_Name: "USA",
    state_details: [
      {
        State_Name: "New York",
        Population: "20M",
        HDI: "0.92",
        Capital: "Albany",
      },
      {
        State_Name: "California",
        Population: "39M",
        HDI: "0.95",
        Capital: "Sacramento",
      },
      {
        State_Name: "Illinois",
        Population: "12.5M",
        HDI: "0.89",
        Capital: "Springfield",
      },
      {
        State_Name: "Texas",
        Population: "30M",
        HDI: "0.85",
        Capital: "Austin",
      },
      {
        State_Name: "Florida",
        Population: "22M",
        HDI: "0.88",
        Capital: "Tallahassee",
      },
    ],
  },
  {
    Country_ID: "35664",
    Country_Name: "Germany",
    state_details: [
      {
        State_Name: "Berlin",
        Population: "3.7M",
        HDI: "0.94",
        Capital: "Berlin",
      },
      {
        State_Name: "Bavaria",
        Population: "13M",
        HDI: "0.93",
        Capital: "Munich",
      },
      {
        State_Name: "Hesse",
        Population: "6.2M",
        HDI: "0.92",
        Capital: "Wiesbaden",
      },
      {
        State_Name: "North Rhine-Westphalia",
        Population: "18M",
        HDI: "0.92",
        Capital: "Düsseldorf",
      },
      {
        State_Name: "Baden-Württemberg",
        Population: "11M",
        HDI: "0.94",
        Capital: "Stuttgart",
      },
    ],
  },
  {
    Country_ID: "35661",
    Country_Name: "France",
    state_details: [
      {
        State_Name: "Île-de-France",
        Population: "12M",
        HDI: "0.93",
        Capital: "Paris",
      },
      {
        State_Name: "Provence-Alpes-Côte d'Azur",
        Population: "5M",
        HDI: "0.89",
        Capital: "Marseille",
      },
      {
        State_Name: "Auvergne-Rhône-Alpes",
        Population: "8M",
        HDI: "0.91",
        Capital: "Lyon",
      },
      {
        State_Name: "Occitanie",
        Population: "6M",
        HDI: "0.88",
        Capital: "Toulouse",
      },
      {
        State_Name: "Nouvelle-Aquitaine",
        Population: "6M",
        HDI: "0.87",
        Capital: "Bordeaux",
      },
    ],
  },
  {
    Country_ID: "35662",
    Country_Name: "Russia",
    state_details: [
      {
        State_Name: "Moscow",
        Population: "12.6M",
        HDI: "0.93",
        Capital: "Moscow",
      },
      {
        State_Name: "Saint Petersburg",
        Population: "5.4M",
        HDI: "0.91",
        Capital: "Saint Petersburg",
      },
      {
        State_Name: "Novosibirsk",
        Population: "1.6M",
        HDI: "0.87",
        Capital: "Novosibirsk",
      },
      {
        State_Name: "Ekaterinburg",
        Population: "1.5M",
        HDI: "0.89",
        Capital: "Ekaterinburg",
      },
      {
        State_Name: "Kazan",
        Population: "1.2M",
        HDI: "0.88",
        Capital: "Kazan",
      },
    ],
  },
];

function App() {
  const [forFilterState, setForFilterState] =
    useState(countriesData);
  const [countries, setCountries] = useState(countriesData);
  const [expandedCountry, setExpandedCountry] = useState([]);
  const [newSelectedState, setNewSelectedState] = useState("");
  const [newStateCapital, setNewStateCapital] = useState("");
  const [newStatePopulation, setNewStatePopulation] = useState("");
  const [newHDI, setNewStateHDI] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addStateForCountry, setAddStateForCountry] = useState();
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isCountryIdMenuOpen, setIsCountryIdMenuOpen] = useState(false);
  const [isStateNameOpen, setIsStateNameOpen] = useState(false);
  const [isStateCapitalOpen, setIsStateCapitalOpen] = useState(false);
  const [isPopulationOpen, setIsPopulationOpen] = useState(false);
  const [isHdiOpen, setIsHdiOpen] = useState(false);

  const closeAllMenu = () => {
    setIsCountryMenuOpen(false);
    setIsCountryIdMenuOpen(false);
    setIsStateNameOpen(false);
    setIsStateCapitalOpen(false);
    setIsHdiOpen(false);
  };

  const openDialog = (countryName) => {
    setAddStateForCountry(countryName);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setAddStateForCountry("");
    setNewSelectedState("");
    setNewStateCapital("");
    setNewStatePopulation("");
    setNewStateHDI("");
  };

  const collapseAndExpandHandler = () => {
    if (expandedCountry.length > 0) {
      setExpandedCountry([]);
    } else {
      setExpandedCountry(countries.map((country) => country.Country_Name));
    }
  };

  const toggleCountryFilter = (countryName) => {
    setCountries(
      (prev) =>
        prev.some((country) => country.Country_Name === countryName)
          ? prev.filter((country) => country.Country_Name !== countryName) // Remove country
          : [
              ...prev,
              forFilterState.find((c) => c.Country_Name === countryName),
            ] // Add country back
    );
  };

  const toggleCountryById = (countryId) => {
    setCountries(
      (prev) =>
        prev.some((country) => country.Country_ID === countryId)
          ? prev.filter((country) => country.Country_ID !== countryId) // Remove country
          : [...prev, forFilterState.find((c) => c.Country_ID === countryId)] // Add country back
    );
  };

  const toggleByStateName = (stateName, countryName) => {
    setCountries((prev) =>
      prev.map((country) => {
        if (country.Country_Name === countryName) {
          const updatedStates = country.state_details.some(
            (state) => state.State_Name === stateName
          )
            ? country.state_details.filter(
                (state) => state.State_Name !== stateName
              ) // Remove state
            : [
                ...country.state_details,
                forFilterState
                  .find((c) => c.Country_Name === countryName)
                  .state_details.find(
                    (state) => state.State_Name === stateName
                  ),
              ]; // Add state back
          return { ...country, state_details: updatedStates };
        }
        return country;
      })
    );
  };

  const toggleByStateCapital = (stateCapital, countryName) => {
    setCountries((prev) =>
      prev.map((country) => {
        if (country.Country_Name === countryName) {
          const updatedStates = country.state_details.some(
            (state) => state.Capital === stateCapital
          )
            ? country.state_details.filter(
                (state) => state.Capital !== stateCapital
              ) // Remove state
            : [
                ...country.state_details,
                forFilterState
                  .find((c) => c.Country_Name === countryName)
                  .state_details.find(
                    (state) => state.Capital === stateCapital
                  ),
              ]; // Add state back
          return { ...country, state_details: updatedStates };
        }
        return country;
      })
    );
  };

  const toggleByStateHDI = (stateHDI, countryName) => {
    setCountries((prev) =>
      prev.map((country) => {
        if (country.Country_Name === countryName) {
          const updatedStates = country.state_details.some(
            (state) => state.HDI === stateHDI
          )
            ? country.state_details.filter((state) => state.HDI !== stateHDI) // Remove state
            : [
                ...country.state_details,
                forFilterState
                  .find((c) => c.Country_Name === countryName)
                  .state_details.find((state) => state.HDI === stateHDI),
              ]; // Add state back
          return { ...country, state_details: updatedStates };
        }
        return country;
      })
    );
  };

  const toggleByStatePopulation = (
    statePopulation,
    countryName
  ) => {
    setCountries((prev) =>
      prev.map((country) => {
        if (country.Country_Name === countryName) {
          const updatedStates = country.state_details.some(
            (state) => state.Population === statePopulation
          )
            ? country.state_details.filter(
                (state) => state.Population !== statePopulation
              ) // Remove state
            : [
                ...country.state_details,
                forFilterState
                  .find((c) => c.Country_Name === countryName)
                  .state_details.find(
                    (state) => state.Population === statePopulation
                  ),
              ]; // Add state back
          return { ...country, state_details: updatedStates };
        }
        return country;
      })
    );
  };

  const addNewStateHandler = (countryName) => {
    if (
      newSelectedState === "" ||
      newStateCapital === "" ||
      newStatePopulation === "" ||
      newHDI === ""
    ) {
      alert("Please fill are the value to add new State");
      return;
    }

    const newState = {
      State_Name: newSelectedState,
      Population: newStatePopulation,
      HDI: newHDI,
      Capital: newStateCapital,
    };

    setCountries((prev) => {
      const countryIndex = prev.findIndex(
        (country) => country.Country_Name === countryName
      );
      if (countryIndex !== -1) {
        const updatedCountry = {
          ...prev[countryIndex],
          state_details: [...prev[countryIndex].state_details, newState],
        };
        const updatedCountries = [
          ...prev.slice(0, countryIndex),
          updatedCountry,
          ...prev.slice(countryIndex + 1),
        ];
        setForFilterState(updatedCountries);
        closeDialog();
        return updatedCountries;
      }
      closeDialog();
      return prev;
    });
  };

  const handleExpandCountry = (country) => {
    if (expandedCountry.includes(country)) {
      setExpandedCountry(expandedCountry.filter((c) => c !== country));
    } else {
      setExpandedCountry([...expandedCountry, country]);
    }
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredCountries = countriesData.filter(
      (country) =>
        country.Country_Name.toLowerCase().includes(searchValue) ||
        country.state_details.some(
          (state) =>
            state.State_Name.toLowerCase().includes(searchValue) ||
            state.Capital.toLowerCase().includes(searchValue)
        )
    );

    setCountries(filteredCountries);
  };

  return (
    <main className="main">
      <h1 className="title">Countries</h1>
      <div
        className=" absolute w-[200vh] h-[90vh] text-red-200"
        onClick={closeAllMenu}
      ></div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent className="flex flex-col gap-5">
          <DialogTitle>Add New State to {addStateForCountry}</DialogTitle>
          <div className="input-group ">
            <select
              className="selectbox "
              onChange={(e) => setNewSelectedState(e.target.value)}
            >
              <option>Select New State</option>
              {stateForCountries
                .find(
                  (stateCountry) =>
                    stateCountry.Country_Name === addStateForCountry
                )
                ?.states.map((state, stateIndex) => (
                  <option key={stateIndex} value={state}>
                    {state}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="Enter State's capital"
              className="selectbox"
              onChange={(e) => setNewStateCapital(e.target.value)}
              value={newStateCapital}
            />
            <input
              type="text"
              placeholder="Enter State's population"
              className="selectbox"
              onChange={(e) => setNewStatePopulation(e.target.value)}
              value={newStatePopulation}
            />
            <input
              type="number"
              placeholder="Enter State's HDI"
              className="selectbox"
              onChange={(e) => setNewStateHDI(e.target.value)}
              value={newHDI}
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => closeDialog()} className="add-button">
              Cancel
            </button>
            <button
              onClick={() => addNewStateHandler(addStateForCountry)}
              className="dialog-close "
            >
              Add New State
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="input-container z-[10]">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search countries or states"
            className="search-input"
            onChange={searchHandler}
          />
          <button className="dialog-close" onClick={collapseAndExpandHandler}>
            {expandedCountry.length === countries.length
              ? "Collapse_All"
              : "Expand_All"}
          </button>
        </div>
      </div>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="border">Action Type</th>
            <th className="border">
              <div className="table-filter">
                <p>Country Name</p>
                <button
                  onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isCountryMenuOpen ? "" : "hidden"
                    } z-10 bg-white rounded-md shadow-lg`}
                  >
                    {forFilterState.map((country) => (
                      <div className="filter-item " key={country.Country_Name}>
                        <Checkbox
                          id={country.Country_Name}
                          checked={countries.some(
                            (c) => c.Country_Name === country.Country_Name
                          )}
                          onChange={() =>
                            toggleCountryFilter(country.Country_Name)
                          }
                        />
                        <label
                          htmlFor={country.Country_Name}
                          style={{ width: "100%" }}
                        >
                          {country.Country_Name}
                        </label>
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            </th>
            <th className="border">
              <div className="table-filter">
                <p>Country ID</p>
                <button
                  onClick={() => setIsCountryIdMenuOpen(!isCountryIdMenuOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isCountryIdMenuOpen ? "" : "hidden"
                    } z-10 bg-white rounded-md shadow-lg`}
                  >
                    {forFilterState.map((country) => (
                      <div className="filter-item " key={country.Country_ID}>
                        <Checkbox
                          id={country.Country_ID}
                          checked={countries.some(
                            (c) => c.Country_ID === country.Country_ID
                          )}
                          onChange={() => toggleCountryById(country.Country_ID)}
                        />
                        <label
                          htmlFor={country.Country_ID}
                          style={{ width: "100%" }}
                        >
                          {country.Country_ID}
                        </label>
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            </th>
            <th className="border">
              <div className="table-filter">
                <p>State Name</p>
                <button
                  onClick={() => setIsStateNameOpen(!isStateNameOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isStateNameOpen ? "" : "hidden"
                    } z-10 bg-white rounded-md shadow-lg h-[300px] overflow-y-auto`}
                  >
                    {forFilterState.map((country) =>
                      country.state_details.map((state) => (
                        <div className="filter-item" key={state.State_Name}>
                          <Checkbox
                            id={state.State_Name}
                            onChange={() =>
                              toggleByStateName(
                                state.State_Name,
                                country.Country_Name
                              )
                            }
                            checked={countries.some(
                              (c) =>
                                c.Country_Name === country.Country_Name &&
                                c.state_details.some(
                                  (s) => s.State_Name === state.State_Name
                                )
                            )}
                          />
                          <label htmlFor={state.State_Name} className="w-full">
                            {state.State_Name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </button>
              </div>
            </th>
            <th className="border ">
              <div className="table-filter">
                <p>Capital Name</p>
                <button
                  onClick={() => setIsStateCapitalOpen(!isStateCapitalOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isStateCapitalOpen ? "" : "hidden"
                    } z-10 bg-white rounded-md shadow-lg h-[300px] overflow-y-auto`}
                  >
                    {forFilterState.map((country) =>
                      country.state_details.map((state) => (
                        <div className="filter-item" key={state.Capital}>
                          <Checkbox
                            id={state.Capital}
                            onChange={() =>
                              toggleByStateCapital(
                                state.Capital,
                                country.Country_Name
                              )
                            }
                            checked={countries.some(
                              (c) =>
                                c.Country_Name === country.Country_Name &&
                                c.state_details.some(
                                  (s) => s.Capital === state.Capital
                                )
                            )}
                          />
                          <label htmlFor={state.Capital} className="w-full">
                            {state.Capital}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </button>
              </div>
            </th>
            <th className="border ">
              <div className="table-filter">
                <p>Population</p>
                <button
                  onClick={() => setIsPopulationOpen(!isPopulationOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isPopulationOpen ? "" : "hidden"
                    } z-10 bg-white rounded-md shadow-lg h-[300px] overflow-y-auto`}
                  >
                    {forFilterState.map((country) =>
                      country.state_details.map((state) => (
                        <div className="filter-item" key={state.Population}>
                          <Checkbox
                            id={state.Population}
                            onChange={() =>
                              toggleByStatePopulation(
                                state.Population,
                                country.Country_Name
                              )
                            }
                            checked={countries.some(
                              (c) =>
                                c.Country_Name === country.Country_Name &&
                                c.state_details.some(
                                  (s) => s.Population === state.Population
                                )
                            )}
                          />
                          <label htmlFor={state.Population} className="w-full">
                            {state.Population}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </button>
              </div>
            </th>
            <th className="border ">
              <div className="table-filter">
                <p>HDI</p>
                <button
                  onClick={() => setIsHdiOpen(!isHdiOpen)}
                  className="relative"
                >
                  <FaFilter size={15} />

                  <div
                    className={`absolute ${
                      isHdiOpen ? "" : "hidden"
                    } z-10 bg-white -left-5 rounded-md shadow-lg h-[300px] overflow-y-auto`}
                  >
                    {forFilterState.map((country) =>
                      country.state_details.map((state) => (
                        <div className="filter-item" key={state.HDI}>
                          <Checkbox
                            id={state.HDI}
                            onChange={() =>
                              toggleByStateHDI(state.HDI, country.Country_Name)
                            }
                            checked={countries.some(
                              (c) =>
                                c.Country_Name === country.Country_Name &&
                                c.state_details.some((s) => s.HDI === state.HDI)
                            )}
                          />
                          <label htmlFor={state.HDI} className="w-full">
                            {state.HDI}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country, index) => (
            <tr key={index} className="border">
              <td className="border" style={{ display: "flex" }}>
                <button
                  className="add-button z-[10]"
                  onClick={() => openDialog(country.Country_Name)}
                >
                  <IoMdAdd size={20} />
                </button>

                <div className="table-filter">
                  <button
                    className="expand-button-container z-[10]"
                    onClick={() => handleExpandCountry(country.Country_Name)}
                  >
                    {expandedCountry.includes(country.Country_Name) ? (
                      <FaAngleUp size={20} />
                    ) : (
                      <FaAngleDown size={20} />
                    )}
                  </button>
                </div>
              </td>

              <td className={"border "}>{country.Country_Name}</td>
              <td className="border ">{country.Country_ID}</td>
              {expandedCountry.includes(country.Country_Name) ? (
                <>
                  <td className="border">
                    {country.state_details.map((state) => (
                      <div className="main" key={state.State_Name}>
                        <p className="search-input">{state.State_Name}</p>
                      </div>
                    ))}
                  </td>
                  <td className="border">
                    {country.state_details.map((state) => (
                      <div className="main" key={state.Capital}>
                        <p className="search-input">{state.Capital}</p>
                      </div>
                    ))}
                  </td>
                  <td className="border">
                    {country.state_details.map((state) => (
                      <div className="main" key={state.Population}>
                        <div className="search-input">{state.Population}</div>
                      </div>
                    ))}
                  </td>
                  <td className="border">
                    {country.state_details.map((state) => (
                      <div className="main" key={state.HDI}>
                        <p className="search-input">{state.HDI}</p>
                      </div>
                    ))}
                  </td>
                </>
              ) : (
                <>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
