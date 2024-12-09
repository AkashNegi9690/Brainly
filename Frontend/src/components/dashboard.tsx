import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import { Button } from "./Button";
import { Card } from "./card";

interface dashboardProps {
    isSmallScreen:boolean,
    createContent:()=>void,
    contents:any,
    fetchData:()=>void,
    changeMode:()=>void,
    darkmode:boolean,
}
export function DashboardComponent({isSmallScreen,createContent,contents,fetchData,changeMode,darkmode}:dashboardProps){
    return <>
    <div className={`w-full p-10 ${isSmallScreen ? "ml-0" : "ml-80 "}`}>
        <div className='flex flex-col   sm:flex-row justify-center  lg:justify-between lg:items-center gap-4'>
          <div className='flex items-center justify-start gap-4 flex-wrap'>
            <div className='font-semibold text-3xl'>All Notes</div>
            <button className='border-2 border-gray-700 dark:border-white shadow- rounded-full px-2 py-1 hover:bg-gray-100 dark:hover:text-black' onClick={changeMode}>{darkmode ? <p>Light Mode</p> : <p>Dark Mode</p>}</button>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <Button variant='secondary' size='md' text='Share Brain' startIcon={<ShareIcon size='md' />} />
            <Button startIcon={<PlusIcon size='md' />} variant='primary' size='md' text='Add Content' onClick={createContent} />
          </div>
        </div>
        <div className='mt-14 flex justify-center  gap-5 flex-wrap'>
          {contents.map(({ type, link, title, _id }) =>
            <Card key={_id}
              title={title}
              type={type}
              url={link}
              contentId={_id}
              fetchData={fetchData} />
          )}
        </div>
      </div>
      </>
}