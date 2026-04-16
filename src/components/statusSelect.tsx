"use client"
import { useState } from "react";

export default function StatusSelect(){
    const tabs = ["All Items", "Ready Stock", "Pre-Order", "Late Pre-Order"];
    const [active, setActive] = useState(1);

    return(
        <div className="hidden border-b border-gray-200 md:flex items-end h-12 justify-between px-4">
            <div className="flex gap-8">
                {tabs.map((tab, i) => (
                <div key={i} className="flex flex-col items-center">
                    <button onClick={() => setActive(i)} className={`text-sm ${ active === i ? "text-blue-800 font-bold" : "text-gray-700 font-bold"}`}>
                        {tab}
                    </button>

                    {active === i && (<div className="h-0.5 w-25 bg-blue-800 mt-2 rounded-full" />)}
                </div>
                ))}
            </div>
        </div>
    )
}