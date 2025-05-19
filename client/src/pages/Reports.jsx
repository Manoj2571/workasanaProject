import SideMenuBar from "../components/navigationBar/SideMenuBar"
import {Chart as ChartJS} from "chart.js/auto"
import {Bar, Pie, Line} from "react-chartjs-2"
import useFetch from "../hooks/useFetch"
import { useSearchParams } from "react-router-dom"

const Reports = () => {
    const [searchParams] = useSearchParams()

    const {data: pendingReportData, loading: pendingReportLoading, error: pendingReportError} = useFetch("http://localhost:8000/report/pending", searchParams)
    const {data: closedTasksData, loading: closedTasksLoading, error: closedTasksError} = useFetch("http://localhost:8000/report/closed-tasks", searchParams)
    const {data: lastWeekReport, loading: lastWeekReportLoading, error: lastWeekReportError} = useFetch("http://localhost:8000/report/last-week", searchParams)
    
    return (
        <div className='d-flex'>
          <SideMenuBar />
          <div className='flex-grow-1 px-4 mt-5'>
            <h2 className="mt-2">Reports</h2>
            <div className="row my-4">
          
          {!closedTasksError && closedTasksData && <div className="col-md-4 mb-3" >
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Tasks Closed by Owners</h4>
                        <div>
                        <Pie data= {{
      labels: closedTasksData.byOwners.map((owner) => owner._id.name),
      datasets: [{
        label: 'Tasks Closed',
        data: closedTasksData.byOwners.map((owner) => owner.count),
        backgroundColor: [  
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    }} options= {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            }
        }
      }}/>
      </div>
    </div>
      </div>
          </div>}
          {!closedTasksLoading && closedTasksData && <div className="col-md-4 mb-3" >
                <div className="card" >
                    <div className="card-body">
                        <h4 className="card-title">Closed Tasks By Project</h4>
                        <div>
                        <Pie data= {{
      labels: closedTasksData.byProject.map((project) => project._id.name),
      datasets: [{
        label: 'Tasks Closed',
        data: closedTasksData.byProject.map((project) => project.count),
        backgroundColor: [  
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    }} options= {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            }
        }
      }}/>
      </div>
    </div>
      </div>
          </div>}
          {!closedTasksLoading && closedTasksData && <div className="col-md-4 mb-3" >
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Tasks Closed by Team</h4>
                        <div>
                        <Pie data= {{
      labels: closedTasksData.byTeam.map((team) => team._id.name),
      datasets: [{
        label: 'Tasks Closed',
        data: closedTasksData.byTeam.map((team) => team.count),
        backgroundColor: [  
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',  
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
          
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    }} options= {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            }
        }
      }}/>
      </div>
    </div>
      </div>
          </div>}
          {lastWeekReport && !lastWeekReportError && <div className="col-md-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Total Work Done Last Week</h4>
                        <Bar data= {{
      labels: lastWeekReport.map((date) => date._id),
      datasets: [{
        label: 'Tasks Completed',
        data: lastWeekReport.map((date) => date.count),
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ]
      }]
    }} options= {{
        scales: {
          y: {
            min: 0,
            ticks: {
                stepSize: 1 
            }
          }
        }
      }}/>
    </div>
      </div>
          </div>}
          {!pendingReportLoading && pendingReportData && <div className="col-md-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Total Days of Work Pending</h4>
                        <Bar data= {{
      labels: pendingReportData.map((task) => task.name),
      datasets: [{
        label: 'Days Remaining',
        data: pendingReportData.map((task) => task.timeToComplete),
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ]
      }]
    }} options= {{
        scales: {
          y: {
            min: 0,        
      ticks: {
        stepSize: 1 
      }
          }
        }
      }}/>
    </div>
      </div>
          </div>}
          </div>
          </div>
        </div>
    )
}


export default Reports