import { useState } from 'react';
import './styles.css';

const PerformanceMetrics = ({ label, info, id }) => {
  const [isActive, setIsActive] = useState(false)

  const lighthouseImageProps = {
    width: 40,
    height: 40,
    src: "lighthouse.webp",
    alt: "Lighthouse reports",
    format: "webp",
  };

  const logoClasses = `absolute right-4 transition-all cursor-pointer z-[9] bottom-1 ${!isActive ? 'grayscale md:-bottom-4 md:hover:grayscale-0 md:hover:bottom-1' : ''}`
  const infoClasses = `absolute transition-all h-full w-full flex gap-4 items-center justify-center bg-main-bg ${isActive ? "bottom-0" : '-bottom-full'}`
  const reportsClasses = `absolute flex gap-3 bottom-2 left-4 transition-all text-xs font-normal underline md:text-sm ${isActive ? 'opacity-1 duration-500' : 'opacity-0'}`

  return (
    <>
      <div
        title={label}
        className={logoClasses}
        onClick={() => setIsActive(prevState => !prevState)}
      >
        <img {...lighthouseImageProps} />
      </div>
      <div className={infoClasses}>
        <div title="Performance" className={`progress-bar ${id}-performance`}>
          <progress id={`${id}-performance`} max="100" value={info.performance} />
        </div>
        <div title="Accessibility" className={`progress-bar ${id}-accessibility`}>
          <progress id={`${id}-accessibility`} max="100" value={info.accessibility} />
        </div>
        <div title="Best Practicies" className={`progress-bar ${id}-best-practicies`}>
          <progress id={`${id}-best-practicies`} max="100" value={info.bestPracticies} />
        </div>
        <div title="Seo" className={`progress-bar ${id}-seo`}>
          <progress id={`${id}-seo`} max="100" value={info.seo} />
        </div>
      </div>
      <div className={reportsClasses}>
        <a href={`docs/${id}-desktop.html`} alt='Google Lighthouse desktop report' title='Google Lighthouse desktop report' target="_blank">Desktop report</a>
        <a href={`docs/${id}-mobile.html`} alt='Google Lighthouse mobile report' title='Google Lighthouse mobile report' target="_blank">Mobile report</a>
      </div>
    </>
  )
}

export default PerformanceMetrics;
