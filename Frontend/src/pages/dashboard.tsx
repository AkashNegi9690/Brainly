import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Modal } from '../components/CreateModal'
import axios from 'axios'
import { DashboardComponent } from '../components/dashboard'


enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  All = "all"
}
function DashboardPage() {
  const [darkmode, setdarkmode] = useState(false)
  const [issideBarOpen, setIsSideBarOpen] = useState(true)
  const [ismodalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState<ContentType>(ContentType.Youtube)
  const [dashboardContentType, setDashboardContentType] = useState<ContentType>()
  function handleDashboardContent(contenttype: any) {
    setDashboardContentType(contenttype);
  }
  useEffect(()=>{
    fetchData();
  },[dashboardContentType])

  const [contents, setContents] = useState([]);
  function changeMode() {
    const htmlElement = document.querySelector("html")
    if (htmlElement) {
      htmlElement.classList.toggle("dark")
      setdarkmode(!darkmode)
    }
  }
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("max-width:1024px")
    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches)
    }
    handleScreenChange(mediaQuery)
    mediaQuery.addEventListener("change", handleScreenChange);

    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, [])
  useEffect(() => {
    if (isSmallScreen) {
      setIsSideBarOpen(false)
    }
    else {
      setIsSideBarOpen(true)
    }
  }, [isSmallScreen])

  function createContent() {
    setIsModalOpen(!ismodalOpen)
  }

  const fetchData = async () => {
    try {
      if (dashboardContentType === "twitter" || dashboardContentType === "youtube") {
        const response = await axios.get("http://localhost:3000/api/v1/content", {
          params: {
            dashboardContentType
          },
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        setContents(response.data.content);
        return;
      }
      else {
        const response = await axios.get("http://localhost:3000/api/v1/content", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        setContents(response.data.content);
      }
    } catch (e) {
      console.log("error fetching data");
    }

  };

  useEffect(() => {
    fetchData();

  }, [])

  useEffect(() => {
    (window as any).twttr?.widgets.load();
  }, [contents]);

  return (

    <div className='flex bg-gray-100  dark:bg-black dark:text-white min-h-screen transition-all duration-1000 dark:selection:bg-white dark:selection:text-black '>
      {ismodalOpen && <Modal onclick={createContent} type={type} setType={setType} fetchData={fetchData} />}
      <Navbar issideBarOpen={issideBarOpen} setIsSideBarOpen={setIsSideBarOpen} isSmallScreen={isSmallScreen} handleDashboardContent={handleDashboardContent} />
      <DashboardComponent isSmallScreen={isSmallScreen} createContent={createContent} contents={contents} fetchData={fetchData} changeMode={changeMode} darkmode={darkmode} />

    </div>
  )
}

export default DashboardPage
