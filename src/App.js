import { useEffect, useState } from 'react'
import Table from 'rc-table';
import './App.css'

function App() {

  const [Data, setData] = useState([])

  const OnChangeHandler = (e) => {
    let SearchString = e.target.value
    let SearchQuery = SearchString?.toLowerCase().trim()
    let Filtered = []

    const APICall = async () => {

      const res = await fetch('http://universities.hipolabs.com/search')
      const data = await res.json()

      data.map((res) => {
        if (res.country.toLowerCase().includes(SearchQuery)) {
          Filtered.push(res)
        }
      })
      setTimeout(() => {
        setData(Filtered)
      }, 500);

    }

    if (SearchQuery.length > 0) {
      APICall()
    } else {
      setData([])
    }

  }

  useEffect(() => {

  }, [Data])

  const columns = [
    {

      className: 'tblCol',
      title: 'Domain',
      dataIndex: 'domains',
      key: 'domains',
      width: 100,
    },
    {

      className: 'tblCol',
      title: 'Code',
      dataIndex: 'alpha_two_code',
      key: 'alpha_two_code',
      width: 100,
    },
    {

      className: 'tblCol',
      title: 'Web Pages',
      dataIndex: 'web_pages',
      key: 'web_pages',
      width: 200,
    },
    {

      className: 'tblCol',
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 200,
    },
    {

      className: 'tblCol',
      title: 'State/Province',
      dataIndex: 'state-province',
      key: 'state-province',
      width: 200,
    },
    {

      className: 'tblCol',
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
  ];


  return (
    < div >
      <div className='center'>
        <label className='mx-2'>
          Search
        </label>
        <input type="text" onChange={OnChangeHandler} />
      </div>
      {Data.length > 0 ?
        <Table columns={columns} data={Data} /> :
        <div className='center my-5'>
          No Records
        </div>
      } 
    </div>
  );
}

export default App;
