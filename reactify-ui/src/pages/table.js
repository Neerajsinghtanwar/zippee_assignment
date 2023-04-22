import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Navbar from "./navbar";
import {Navigate} from "react-router-dom";
import {axios} from "../store/actions/actions";
import {connect} from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function DataTable(props) {
    const [mails, setMail] = useState(null);

    useEffect(() => {
        loadmails()
    },[])

    const loadmails = () => {
        let endpoint = `/emails`
        axios
            .get(endpoint, data)
            .then((res) => {
                let responseData = res.data;
                console.log('data--------------------->', responseData.mails)
                if(responseData.success===true) {
                    setMail(responseData.mails)
                }
            })
            .catch((error) => console.log({error}));
    }

    const columns = [
 {
  name: "user",
  label: "Name",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "timestamp",
  label: "Date",
  options: {
   filter: true,
   sort: false,   customBodyRender: (value) => {
      return new Date(value).toDateString();
   },
  }
 },
 {
  name: "is_sent",
  label: "Sent",
  options: {
   filter: true,
   sort: false,
   customBodyRender: (value) => {
      return value ? <CheckCircleIcon style={{color: 'green'}}/> : '';
   },
  }
 },
 {
  name: "is_seen",
  label: "Seen",
  options: {
   filter: true,
   sort: false,
   customBodyRender: (value) => {
      return value ? <CheckCircleIcon style={{color: 'green'}}/> : '';
   },
  }
 },
];


    const data = [
     {name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY"},
     {name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT"},
     {name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL"},
     {name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX"},
    ];

    const options = {
     filterType: 'checkbox',
    };
    return(
        <>
            {props.user.login===true?
                <>
                    <Navbar/>
                    <div style={{margin: '5% 5% 5% 5%'}}>
                        {mails?
                            <MUIDataTable
                                title={"Mails List"}
                                data={mails}
                                columns={columns}
                                options={options}
                            />
                        :null}
            </div>
                </>
            :
                <Navigate to='/signin'/>
            }
        </>
    )
}

const mapStateToProps = state =>({
    user:state.userData.userData
})

export default connect(mapStateToProps)(DataTable)