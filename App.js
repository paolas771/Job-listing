import React from "react"
import NavBar from "./components/NavBar"
import data from "./data"
import Jobs from "./components/Jobs"
import { type } from "@testing-library/user-event/dist/type"

export default function App() {

 
  const [jobs, setJobs] = React.useState(data)

  //seperate state used to not change original data
  const [filteredJobs, setFilteredJobs] = React.useState(jobs)

  const [filters, setFilters] = React.useState([]) 

  function addFilter(name){
    //checks if filter name is not in filter state and adds it to state if not in there
    if(!(filters.filter(filt => filt === name).length > 0)){
        setFilters(prevFilters => {
          return[
            ...prevFilters,
            name
          ]
        })
        //if there are no filters go through the original jobs data
        if(filters.length == 0){
          const newPost = jobs.filter(jobs =>{
            if(name === "Junior" || name === "Midweight" || name === "Senior"  ){
                return(
                  jobs.level.toLowerCase() === name.toLowerCase()
                )
              
            }else {
              return(
                jobs.role.toLowerCase() === name.toLowerCase()
          
              )
            }
            
          })
          setFilteredJobs(prevPost => newPost)
          //if filters state has filters in it go through the filteredjobs state
        }else{
          const newPost = filteredJobs.filter(jobs =>{
            if(name === "Junior" || name === "Midweight" || name === "Senior"  ){
                return(
                  jobs.level.toLowerCase() === name.toLowerCase()
                )
              
            }else {
              return(
                jobs.role.toLowerCase() === name.toLowerCase()
          
              )
            }
          })
          setFilteredJobs(prevPost => newPost)
        }
        
    } 
  }
  //Since languages and tools are in arrays they need a different function to filter 
  function addFilterArr(id){
    if(!(filters.filter(filt => filt === id).length > 0)){
      setFilters(prevFilters => {
        return[
          ...prevFilters,
          id
        ]
      })
      if(filters.length == 0){
        const newPost = jobs.filter(jobs =>{
          for(var i = 0; i < 3; i++){
            if(jobs.languages[i] === id){
              return(
                jobs.languages[i] === id
              )
            }else if(jobs.tools[i] === id){
              return(
                jobs.tools[i] === id
              )
            }
          }
        })
        setFilteredJobs(prevPost => newPost)
      }else{
        const newPost = filteredJobs.filter(jobs =>{
          for(var i = 0; i < 3; i++){
            if(jobs.languages[i] === id){
              return(
                jobs.languages[i] === id
              )
            }else if(jobs.tools[i] == id){
              return(
                jobs.tools[i] === id
              )
            }
          }
        })
        setFilteredJobs(prevPost => newPost)
      }
    } 
  }
  function clearFilters(){
    setFilteredJobs(jobs)
    setFilters([])
  }
  
  function remove(name){
    //removes filter from filters state by making a copy of filters
    let newFilters = filters
    let index = newFilters.indexOf(name)
    if(index > -1){
      newFilters.splice(index, 1)
    }
    
    var jobsArr = []
    setFilters(newFilters)

    /*for loop that goes through all of jobs post and searches through them using the new filters.
      If filter name equals jobs level, role, tools, or language it will add 1 count. When the filter for loop
      is done it will check if count is equal to the number of filters length then the job post will be added to jobArr then
      jobArr will be added to the setFilteredJobs state
    */
    for(var i = 0; i < jobs.length; i++){
      if(filters.length == 0){
        jobsArr.push(jobs[i])
      }else{
        var count = 0
        for(var k = 0; k < filters.length; k++){
            for(var j = 0; j < jobs[i].languages.length; j++){
              if(jobs[i].languages[j] == filters[k]){
                count++
              }
            }
            for(var j = 0; j < jobs[i].tools.length; j++){
              if(jobs[i].tools[j] == filters[k]){
                count++
              }
            }
            if(jobs[i].role == filters[k] || 
              jobs[i].level == filters[k] ){
                count++
            }
        }
        if(count == filters.length){
          jobsArr.push(jobs[i])
        }  
      }
    }
    setFilteredJobs(jobsArr)
  }

  const jobListings = filteredJobs.map(listings => {
    return(
      <Jobs 
        key={listings.id}
        listings={listings}
        addFilter={addFilter}
        addFilterArr={addFilterArr}
        filters={filters}
      />
    )
  })
  const filtersMap = filters.map(filt => {
    return(
        <button className="filterButton" onClick={() => remove(filt)}>
          {filt}
          <img src="./images/icon-remove.svg" className="remove" alt="remove filter button"/>
        </button>
    )
  })

  return (
    <main>
      < NavBar />
      <div className="filterBox" >
        <div className="divFilter">
          {filtersMap}
        </div>
        {filters.length != 0 && <button className="clearButton" onClick={clearFilters}>Clear</button>}
      </div>
      <div className="jobListing">{jobListings}</div>
    </main>
  )
}