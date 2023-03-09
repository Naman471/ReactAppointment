import {BiSearch,BiCaretDown,BiCheck} from "react-icons/bi"
import {useState} from 'react';

const DropDown = ({toggle,orderBy,setOrderByChange,sortBy,setSortByChange}) => {
    if (!toggle) return null;
    
    return (
        <div className="origin-top-right absolute right-0 mt-2 w-56
        rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div onClick={() => setSortByChange("petName")}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">Pet Name { (sortBy === 'petName') && <BiCheck />}</div>
          <div onClick={() => setSortByChange("ownerName")}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">Owner Name  {(sortBy === 'ownerName') && <BiCheck />}</div>
          <div onClick={() => setSortByChange("aptDate")}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">Date {(sortBy === 'aptDate') && <BiCheck />}</div>
          <div onClick={() => setOrderByChange("asc")}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
            role="menuitem">Asc {(orderBy === 'asc') && <BiCheck />}</div>
          <div onClick={() =>setOrderByChange("desc")}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">Desc {(orderBy === 'desc') && <BiCheck />}</div>
            </div>
        </div>
    )
}

const Search = ({query,onQueryChange,orderBy,setOrderByChange,sortBy,setSortByChange}) => {
  let [toggleSort,setToggleSort]  = useState(false);
  return(       
        <div className="py-6 mx-5">
            <div className="mt-1 relative border-2 border-gray-300 rounded-md shadow-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BiSearch />
            <label htmlFor="query" className="sr-only" />
        </div>
            <input type="text" name="query" id="query" value={query}
            onChange = {(event) => {onQueryChange(event.target.value)}}
            className="pl-8 rounded-md focus:ring-indigo-500 px-3 py-3 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" placeholder="Search" />
            <div className="absolute pr-0.5 inset-y-0 right-0 flex items-center">
            <div>
                <button type="button" onClick={ () => setToggleSort(!toggleSort)}
                className="font-medium justify-center px-3 py-2.5 rounded-md py-0 bg-blue-500 border-5 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
                Sort By <BiCaretDown className="ml-3" />
                </button>
                <DropDown toggle={toggleSort}
                orderBy={orderBy}
                setOrderByChange= {myOrder => setOrderByChange(myOrder)}
                sortBy={sortBy}
                setSortByChange={mySort => setSortByChange(mySort)}/>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Search