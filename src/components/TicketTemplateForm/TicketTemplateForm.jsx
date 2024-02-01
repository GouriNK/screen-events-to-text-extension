/*global chrome*/
import { useState, useEffect } from "react";
import "./TicketTemplateForm.css";
import {
  getBrowser,
  isMobile,
  getBrowserSize,
} from "../../chrome/detectServices";

export default function TicketTemplateForm() {
  const [inputs, setInputs] = useState({});
  const [outputs, setOutputs] = useState({});
  const [isStartEnabled, setIsStartEnabled] = useState(true);

  const [parentUrl, setParentUrl] = useState('');
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const tab = tabs[0];
      if (tab) {
        setParentUrl(tab.url);
      }
    });

    chrome.windows.getCurrent(window => {
      setParentSize({ width: window.width, height: window.height });
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    const handleClick = (event) => {
      console.log("clicked : ", event.target);
    };
    const handleScroll = (event) => {
      console.log("scrolling : ", event.target);
    };
    if (!isStartEnabled) {
      document.addEventListener("click", handleClick, true);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isStartEnabled]);

  const startGeneration = (event) => {
    event.preventDefault();
    setOutputs({
      url: parentUrl,
      device: isMobile(),
      browser: getBrowser(),
      screensize: `${parentSize.width}x${parentSize.height}`,
      steps: "",
    });
    setIsStartEnabled((prevIsStartEnabled) => !prevIsStartEnabled);
  };

  const finishGeneration = (event) => {
    event.preventDefault();
    console.log("finish");
    setIsStartEnabled((prevIsStartEnabled) => !prevIsStartEnabled);
  };

  const resetGeneration = (event) => {
    event.preventDefault();
    console.log("reset");
    setOutputs({});
    setIsStartEnabled(true);
  };

  const copyGeneration = (event) => {
    event.preventDefault();
    console.log("copy");
  };

  return (
    <form className="ui form ticket-template-form">
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
        <button className="ui fluid button blue column icon" onClick={resetGeneration}>
        <i className="undo icon"></i>
        </button>
      </div>
      <div className="ui column">
        <button className="ui fluid button orange column icon" onClick={copyGeneration}>
          <i className="copy outline icon"></i>
        </button>
      </div>
      </div>
      <div className="field">
        <label>Short Description</label>
        <input type="text" name="description" placeholder="Short Description" value={inputs.description || ""} onChange={handleChange}/>
      </div>
      {/* <div className="field">
        <label>Expected Result</label>
        <input type="text" name="expected-result" placeholder="Expected Result" value={inputs.expected || ""} onChange={handleChange}/>
      </div>
      <div className="field">
        <label>Actual Result</label>
        <input type="text" name="actual-result" placeholder="Actual Result" value={inputs.actual || ""} onChange={handleChange}/>
      </div> */}
      {/* <div className="ui card">
        <div className="content">
          <div className="header">Steps to Reproduce</div>
          <div className="description">
              {outputs.steps || ""}
          </div>
        </div>
      </div> */}
      <div className="ui one column grid">
      <div className="ui column">
        <div className="ui card">
          <div className="content">
            <h4 className="ui header">Relevant URL</h4>
            <div className="description">{outputs.url || ""}</div>
          </div>
        </div>
      </div>
      <div className="ui column">
        <div className="ui card ">
          <div className="content">
          <h4 className="ui header">Test Device</h4>
            <div className="description">{outputs.device || ""}</div>
          </div>
        </div>
      </div>
      <div className="ui column">
        <div className="ui card ">
          <div className="content">
          <h4 className="ui header">Test Browser</h4>
            <div className="description">{outputs.browser || ""}</div>
          </div>
        </div>
      </div>
      <div className="ui column">
        <div className="ui card ">
          <div className="content">
          <h4 className="ui header">Test Screen Size</h4>
            <div className="description">{outputs.screensize || ""}</div>
          </div>
        </div>
      </div>
      </div>
    </form>
  );
}
