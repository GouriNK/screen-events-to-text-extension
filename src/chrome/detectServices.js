/*global chrome*/
export function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (regex.test(navigator.userAgent)) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}

export function getBrowser() {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) !== -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Edg") !== -1) {
    return "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    !!document.documentMode === true
  ) {
    return "IE";
  } else {
    return "unknown";
  }
}


export function getBrowserSize() {
  return `${window.innerWidth} x ${window.innerHeight}`;
  // chrome.windows.getCurrent(window => {
  //   return `${window.width} x ${window.height}`;
  // });
  // return "here";

  // return new Promise(resolve => {
  //   chrome.windows.getCurrent(window => {
  //     resolve(`${window.width} x ${window.height}`);
  //   });
  // });
}

export function getBrowserUrl() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      return url
      // use `url` here inside the callback because it's asynchronous!
  });
  // chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  //   const tab = tabs[0];
  //   if (tab) {
  //     return (tab.url);
  //   }
  // });
  //return window.location.href;
  // return new Promise(resolve => {
  //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  //     resolve(tabs[0].url);
  //   });
  // });
}

  // const [url, setUrl] = useState('');

  // useEffect(() => {
  //   const queryInfo = {active: true, lastFocusedWindow: true};

  //     chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
  //         const url = tabs[0].url;
  //         setUrl(url);
  //     });
  //   }, []);

  export const getCurrentTabUrl = (callback) => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].url);
    });
}

export async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}