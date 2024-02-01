/*global chrome*/
import { useState, useEffect } from "react";
// import { getParentWindowInfo } from "../../chrome/chromeUtils";
import { isMobile, getBrowser, getBrowserSize, getActiveTabURL, getBrowserUrl, getCurrentTabUrl } from "../../chrome/detectServices"


export default function ControlPanel({handleOutput}) {

    const [isStartEnabled, setIsStartEnabled] = useState(true);
      const [url, setUrl] = useState('');

      useEffect(() => {
        // const queryInfo = {active: true, lastFocusedWindow: true};

        //   chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        //       const url = tabs[0].url;
        //       setUrl(url);
        //   });
        }, []);

    const startGeneration = async (event) => {
        event.preventDefault();
        const activeTab = await getActiveTabURL();
        setIsStartEnabled((prevIsStartEnabled) => !prevIsStartEnabled);
        handleOutput(prevState => {
          return {
            ...prevState,
            url: activeTab.url,
            device: isMobile(),
            browser:getBrowser(),
            screensize: getBrowserSize()
          };
        });
    };
    
    const finishGeneration = (event) => {
        event.preventDefault();
        console.log("finish");
        setIsStartEnabled((prevIsStartEnabled) => !prevIsStartEnabled);
    };

    const resetGeneration = (event) => {
        event.preventDefault();
        console.log("reset");
        setIsStartEnabled(true);
        handleOutput({});
        
    };

    const copyGeneration = (event) => {
        event.preventDefault();
        console.log("copy");
    };

  return (
    <div className="ui four column grid">
      <div className="ui column">
        <button
          className="ui fluid button green icon"
          onClick={startGeneration}
          disabled={!isStartEnabled}
        >
          <i className="play icon"></i>
        </button>
      </div>
      <div className="ui column">
        <button
          className="ui fluid button red column icon"
          onClick={finishGeneration}
          disabled={isStartEnabled}
        >
          <i className="stop icon"></i>
        </button>
      </div>
      <div className="ui column">
        <button
          className="ui fluid button blue column icon"
          onClick={resetGeneration}
        >
          <i className="undo icon"></i>
        </button>
      </div>
      <div className="ui column">
        <button
          className="ui fluid button orange column icon"
          onClick={copyGeneration}
        >
          <i className="copy outline icon"></i>
        </button>
      </div>
    </div>
  );
}
