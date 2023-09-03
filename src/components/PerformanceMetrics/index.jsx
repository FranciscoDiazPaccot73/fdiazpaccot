import React, { useState } from 'react';
import './styles.css';

const PerformanceMetrics = ({ label, info, id }) => {
  const [isActive, setIsActive] = useState(false)

  const lighthouseImageProps = {
    width: 32,
    height: 32,
    src: "lighthouse.webp",
    alt: "Lighthouse reports",
    format: "webp",
  };

  const logoClasses = `absolute right-0 bottom-0 transition-all cursor-pointer z-[9] md:right-2 ${!isActive ? 'grayscale md:hover:grayscale-0' : ''}`
  const infoClasses = `absolute transition-all h-full w-full flex gap-4 items-center justify-center bg-main-bg ${isActive ? "bottom-0" : '-bottom-full'}`
  const reportsClasses = `text-gray-100 absolute flex gap-3 bottom-2 left-4 transition-all text-xs font-normal underline md:text-sm ${isActive ? 'opacity-1 duration-500' : 'opacity-0'}`

  return (
    <>
      <div
        title={label}
        className={logoClasses}
        onClick={() => setIsActive(prevState => !prevState)}
      >
        <img {...lighthouseImageProps} />
      </div>
      <div className={infoClasses} />
      <div className={reportsClasses}>
        <a href={`docs/${id}-desktop.html`} alt='Google Lighthouse desktop report' title='Google Lighthouse desktop report' target="_blank">Desktop report</a>
        <a href={`docs/${id}-mobile.html`} alt='Google Lighthouse mobile report' title='Google Lighthouse mobile report' target="_blank">Mobile report</a>
      </div>
    </>
  )
}

export default PerformanceMetrics;
