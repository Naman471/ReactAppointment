import './App.css';
import {FiGithub} from "react-icons/fi"
import Search from "./components/Search"
import AddAppointment from "./components/AddAppointment"
import Clients from "./components/Clients"
import {useState,useCallback,useEffect} from 'react'

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query,setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const fetchData = useCallback(() => {
    fetch('../data.json')
    .then(response => response.json())
    .then(data => {
    setAppointmentList(data)
    });
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="font-bold text-3xl">
         <FiGithub className="inline-block text-red-500"/> Your Appointments <FiGithub className="inline-block text-red-500"/> </h1>
    <AddAppointment 
      onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
      lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
    />

    <Search query={query}
    onQueryChange={(myQuery) => setQuery(myQuery)}
    orderBy={orderBy}
    setOrderByChange= {(myOrder) => setOrderBy(myOrder)}
    sortBy={sortBy}
    setSortByChange= {(mySort) => setSortBy(mySort)} />

    <ul className="divide-y divide-gray-200">
        {filteredAppointments
          .map(appointment => (
            <Clients key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                appointmentId =>
                  setAppointmentList(appointmentList.filter(appointment =>
                    appointment.id !== appointmentId))
              }
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;