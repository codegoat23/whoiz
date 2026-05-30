import React from 'react'
import { FaBoltLightning } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { LuTvMinimal } from "react-icons/lu";
function FeatureButton() {
  return (
    <div className="flex items-center gap-20 text-[12px] flex-row max-w-3xl">
        <div className="flex items-center flex-row gap-2">
            <div >
                <FaBoltLightning className="text-[#9F2E2E] w-5 h-5"/>
            </div>
            <span>No coding required</span>
        </div>
        <div className="flex items-center flex-row gap-2">
             <div>
                <BiSolidCustomize className="text-[#9F2E2E] w-5 h-5"/>
            </div>
            <span>Easy  to  customise</span>
        </div>
        <div className="flex items-center flex-row gap-2">
            <div>
                <MdUpdate className="text-[#9F2E2E] w-5 h-5"/>
            </div>
            <span>Update   it   anytime</span>
        </div>
        <div className="flex items-center flex-row gap-2">
            <div>
                <LuTvMinimal className="text-[#9F2E2E] w-5 h-5"/>
            </div>
            <span>Minimal  Designs</span>
        </div>

    </div>
  )
}

export default FeatureButton