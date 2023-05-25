import React, { useState, useEffect, useContext } from 'react'
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { auth } from './firebase.jsx'
import { UserContext } from './UserProvider'

ChartJS.register(ArcElement);

const Home = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [employeeData, setEmployeeData] = useState([]);
    const [employeesInfo, setEmployeesInfo] = useState({
        male: '',
        female: '',
        fullTime: '',
        partTime: '',
        dailyWage: ''
    })
    const navigate = useNavigate()
    const user = useContext(UserContext);
    // console.log(auth.currentUser);

    setTimeout(() => {
        console.log(user);
    }, 3000)

    const genderData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [employeesInfo.male, employeesInfo.female],
                backgroundColor: ['#999999', '#999999'],
                borderColor: "white",
                borderWidth: 1
            }
        ],
    }
    const employmentTypeData = {
        labels: ['Fulltime', 'Partime', 'Dailywage'],
        datasets: [
            {
                data: [employeesInfo.full_time, employeesInfo.part_time, employeesInfo.daily_wage],
                backgroundColor: ['#999999', '#999999', '#999999'],
                borderColor: "white",
                borderWidth: 1
            }
        ],
    }
    const options = {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
    const redirectToLogin = () => {
        navigate('/login')
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user)
                setIsLogin(true);
            else
                setIsLogin(false);
        })
    })
    useEffect(() => {
        fetch(`https://employee-rest-api.onrender.com/`).then((response) => {
            // console.log(response.json())
            return response.json();
        }).then((res) => {
            let result = res;
            console.log(result);
            setEmployeeData(result.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        let male = 0, female = 0, rest = 0;
        let daily_wage = 0, part_time = 0, full_time = 0;
        employeeData.forEach((employee, id) => {
            if (employee.gender === "Male")
                male++;
            else if (employee.gender === "Female")
                female++;
            else rest++;
        })
        employeeData.forEach((employee, id) => {
            if (employee.employement_type === "daily wage")
                daily_wage++;
            else if (employee.employement_type === "part time")
                part_time++;
            else full_time++;
        })
        setEmployeesInfo({ male, female, full_time, part_time, daily_wage })
    }, [employeeData])

    return (
        <>
            <div className="home_container">
                {
                    !isLogin ?
                        (
                            <div className='d-flex flex-column'>
                                <h1 className="text-dark">Please Login to view the details</h1>
                                <button className="btn btn-primary loginBtn mt-3" onClick={redirectToLogin}>Login</button>
                            </div>
                        )
                        :
                        <div className="homeBox">
                            <p className="m-4">KEY PERFORMANCE INDICATORS</p>
                            <div className="info">
                                <div className="text-center">
                                    <p>GENDER</p>
                                    <Pie data={genderData} options={options} className="piechart"></Pie>
                                    <span>
                                        <p>TOTAL USERS = {employeeData.length}</p>
                                        <p>MALE = {employeesInfo.male}</p>
                                        <p>FEMALE = {employeesInfo.male}</p>
                                    </span>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <p>EMPLOYMENT TYPE</p>
                                    <Pie data={employmentTypeData} options={options} className="piechart"></Pie>
                                    <span>
                                        <p>TOTAL USERS = {employeeData.length}</p>
                                        <p>FULL TIME = {employeesInfo.full_time}</p>
                                        <p>PART TIME = {employeesInfo.part_time}</p>
                                        <p>DAILY WAGE = {employeesInfo.daily_wage}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default Home