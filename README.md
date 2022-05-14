# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)



## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library


### What I learned

#### Filtering Data
- In order to filter through data you want to make a copy of that data to not change the original data. I did this by making two React states the first one pointed to the original data file and the second pointed to the first state. 
```js
const [jobs, setJobs] = React.useState(data) 
const [filteredJobs, setFilteredJobs] = React.useState(jobs)
```
#### Map Method
- .map() method was used to the filteredJobs state in order to spereate the array of job listings and pass it to the Jobs component as props 

```js
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
```
#### Adding Filters 
- To add a filter the user needs to press the buttons on the job descriptions. To do this I made a function called addFilter that uses the filter() method to check if the name of the new filter matches one of the values of the data if it does it passes the job post of the filteredJobs state.

```js
  if(filters.length == 0){
    const newPost = jobs.filter(jobs =>{
      if(name === "Junior" || name === "Midweight" || name === "Senior"  ){
        return(
          jobs.level.toLowerCase() === name.toLowerCase()
        )
              
      }
```
#### Remvoing Filters
- To remove a filter from the filter state the user needs to press the x button next to the filters they want to remove. I do this I made a function called remove that makes a copy of the filters state to be able to use the splice() method to remove the unwanted filter. Then I created a for loop that goes through all the jobs and if the filters matched a with a vaule from the jobs data then 1 would be added to count. When all the jobs have been looked through count value would be checked to see if equaled the length of filters. If it did than that job post would be added to filtered Jobs State than pushed onto the screen. 

```js
 let newFilters = filters
    let index = newFilters.indexOf(name)
    if(index > -1){
      newFilters.splice(index, 1)
    }
    
  var jobsArr = []
  setFilters(newFilters)
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
```
### Continued development

- I will be practicing more of filtering through data.
- I will continue developing my React skills.  




### Useful resources

- Stack overflow: this website helped me when I was stuck on an issue. 



## Author

- Paola Silva
- Frontend Mentor - [@paolas771](https://www.frontendmentor.io/profile/paolas771)



