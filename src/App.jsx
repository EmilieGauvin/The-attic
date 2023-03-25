import React, { useState, useEffect } from "react";
import Experience from './Experience/Experience'
import "./App.css";
import LoadingAnim from "./LoadingAnim/LoadingAnim";

export default function App() {

    const experience = new Experience()
    const resources = experience.resources
    const [loaded, setLoaded] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)

    useEffect(() => {
        resources.on('ready', () => {
            setEndAnimation(true) 
            window.setTimeout(() =>
            {
                setLoaded(true)  
            }, 500)
        })
    }, [resources])

    return (
        <div>
            <div className={loaded === false ? 'app background notLoaded' : 'app background loaded'}>
                <div className={endAnimation === false ? 'loadingAnim notLoaded' : 'loadingAnim loaded'}>
                    {<LoadingAnim />}
                </div>
                <div className="link">
                    <p >visit portfolio at <a className='textButton' href='http://emiliegauvin.com/' target="_blank"><i>emiliegauvin.com</i></a></p>
                </div>
            </div>
    </div> 
    );
}

