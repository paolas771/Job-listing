import React from "react"

export default function Jobs(props){

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    //everytime the window is resized the windowWidth will update to see if it needs a horizontal line or not
    React.useEffect(() => {
        window.addEventListener("resize", function() {
            setWindowWidth(window.innerWidth)
        })
    }, [])


    const languages = props.listings.languages
    const lang = languages.map((langButton, index) => {
        return (
            <button className="languages" onClick={() => props.addFilterArr(langButton)}>{langButton}</button>
        )
        
    })

    const tools = props.listings.tools
    const toolsMap = tools.map((toolButton, index) => {
        return(
            <button className="tools" onClick={() => props.addFilterArr(toolButton)}>{toolButton}</button>
        )
    })
    
    
    return(
        <div>
            <div className="jobPost">
                <section className="jobInfo">
                    <img className="logo" src={props.listings.logo} alt="logo"/>
                    <section className="companyDetails">
                        <section className="company">
                            <h1 className="companyName">{props.listings.company}</h1>
                            {props.listings.new && <p className="new">NEW!</p>}
                            {props.listings.featured && <p className="feature">FEATURED</p>}
                        </section>
                        <h2 className="position">{props.listings.position}</h2>
                        <p className="details">{props.listings.postedAt} &#8226;    {props.listings.contract} &#8226;  {props.listings.location}</p>
                    </section>
                    {windowWidth <= 1028 && <hr></hr>}
                    <div className="buttonDiv">
                        <button className="role" onClick={() => props.addFilter(props.listings.role)}>{props.listings.role}</button>
                        <button className="level " onClick={() => props.addFilter(props.listings.level)}>{props.listings.level}</button>
                        {lang}
                        {toolsMap}
                    </div>
                </section>
            </div>
        </div>
    )
}