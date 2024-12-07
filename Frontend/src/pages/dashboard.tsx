import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { PlusIcon } from '../icons/plusicon'
import { ShareIcon } from '../icons/shareicon'
import { Card } from '../components/card'
import { Modal } from '../components/CreateModal'
import axios from 'axios'
import { nanoid } from 'nanoid'
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}
function Dashboard() {
  const [darkmode, setdarkmode] = useState(false)
  const [issideBarOpen, setIsSideBarOpen] = useState(true)
  const [ismodalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState<ContentType>(ContentType.Youtube)
  function changeMode() {
    const htmlElement = document.querySelector("html")
    if (htmlElement) {
      htmlElement.classList.toggle("dark")
      setdarkmode(!darkmode)
    }
  }
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1024px")
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
  function UseContent() {
    const [contents, setContents] = useState([])
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/content", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      if (JSON.stringify(response.data.content) !== JSON.stringify(contents)) {
        setContents(response.data.content);
      }
      
    }
    useEffect(() => {
      fetchData();
     let fetchInterval=setInterval(()=>{fetchData()},10000)
      
      return ()=>{clearInterval(fetchInterval);}
    }, [])
    return contents
  }
  const contents = UseContent()
  useEffect(() => {
    (window as any).twttr?.widgets.load();
  }, [contents]);
  
  return (

    <div className='flex  dark:bg-black dark:text-white min-h-screen transition-all duration-1000 dark:selection:bg-white dark:selection:text-black '>
      {ismodalOpen && <Modal onclick={createContent} type={type} setType={setType} />}
      <Navbar issideBarOpen={issideBarOpen} setIsSideBarOpen={setIsSideBarOpen} isSmallScreen={isSmallScreen} />

      <div className={`w-full p-10 ${isSmallScreen ? "ml-0" : "ml-80 "}`}>
        <div className='flex flex-col   sm:flex-row justify-center  lg:justify-between lg:items-center gap-4'>
          <div className='flex items-center justify-start gap-4 flex-wrap'>
            <div className='font-semibold text-3xl'>All Notes</div>
            <button className='border-2 border-gray-300 rounded-full px-2 py-1 hover:bg-gray-100 dark:hover:text-black' onClick={changeMode}>{darkmode ? <p>Light Mode</p> : <p>Dark Mode</p>}</button>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <Button variant='secondary' size='md' text='Share Brain' startIcon={<ShareIcon size='md' />} />
            <Button startIcon={<PlusIcon size='md' />} variant='primary' size='md' text='Add Content' onClick={createContent} />
          </div>
        </div>
        <div className='mt-14 flex justify-center  gap-5 flex-wrap'>
          {contents.map(({ type, link, title}) =>
            <Card key={nanoid(5)} title={title}
              type={type}
              url={link} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
