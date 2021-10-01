import React, { Component } from 'react';
import axios from 'axios';



class Dashboard extends Component {


    // componentDidMount(){
    //     axios.get('http://localhost:4400/api/hackathon/getUpcomingHackathons', {
    //         headers: {authorization: localStorage.getItem('session') || ''}
    //     }).then(response=>{
    //         console.log("Dashboard Resp", response);
    //     }).catch(err=>{
    //         console.log("Dashboard Error", err);
    //     })
    //     // let headers = localStorage.getItem('headers');
    //     // console.log(headers);
    // }
    render() {
        return (
            <div>
        
            </div>
        );
    }
}


// useEffect(() => {
//     axios.get('http://localhost:4200/api/user/currentuser')
//     .then(response=>{
//         console.log("Dashboard resp", response)
//     }).catch(err=>{
//         console.log("Dashboard Err", err);
//     })
// }, []);

export default Dashboard;
