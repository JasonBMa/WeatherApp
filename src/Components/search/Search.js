import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geo_api_options } from "../../api";

const Search = ({onSearchChange}) => {

  const [search,setSearch] = useState(null);

  function loadOptions(inputValue){
    return fetch(`${GEO_API_URL}/cities?&minPopulation=10000&namePrefix=${inputValue}`, geo_api_options)
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: city.name + ", " + city.countryCode,
          };
        })
      }
    })
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }
  
  return (
    <div className="flex mt-3 justify-center">
      <div className="w-1/2 shadow">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
    </div>
  )
}

export default Search