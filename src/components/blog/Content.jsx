import React, { useState } from 'react';

const getDateLabels = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()

  const monthsEs = {
    1: "ENE",
    2: "FEB",
    3: "MAR",
    4: "ABR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DIC",
  }

  const months = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  }

  return {month: months[month + 1] || '', day, year};
}

const Content = ({ posts }) => {
  const [postsToShow, setPostsToShow] = useState(posts.sort((a,b) => b.timestamp - a.timestamp));

  return (
    <ul className="flex flex-col">
      {postsToShow.map((post) => {
        const description = post.data.description ?? '';
        const { month, day, year } = getDateLabels(post?.data?.pubDate)
        const stack = post.data.tags?.split(',') ?? [];

        return (
          <a href={`/blog/${post.slug}/`} key={`${post.timestamp}-${post.slug}`} className='border-b border-opacity-40 border-b-orange py-6 px-1'>
            <li              
              style={{ gridTemplateColumns: "15% 55% 30%" }}
              className="overflow-hidden w-full gap-2 flex flex-col md:grid md:grid-cols-custom md:items-center"
            >
              <div className="w-full text-center font-semibold flex items-center justify-center gap-2 text-2xl md:block md:w-20">
                <p className='md:text-lg'>{month}</p>
                <p className='md:text-2xl md:text-orange'>{day}</p>
                <p className='md:text-sm font-normal'>{year}</p>
              </div>
              <div className="flex flex-col">                
                <div className="dark:text-white font-bold">
                  <p className='text-orange text-xl'>{post.data.title}</p>
                  <p title={description.toString()} className="overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-400 font-normal text-sm">
                    {post.data.description}
                  </p>
                </div>
                <p className='text-xs text-orange opacity-80 h-4'>{post.data.readingTime ? `${post.data.readingTime} min read` : ''}</p>
              </div>
              {post.data.image &&
                <img className="object-contain order-first md:order-2" width={720} height={360} src={post.data.image} alt="" />
              }
            </li>
            {stack && (
              <ul className="mt-5 ml-2 flex gap-2 flex-wrap">
                {stack.map((tec) => (
                  <li key={`${post.timestamp}-${tec}`} className="px-1 py-[2px] text-center text-[10px] uppercase rounded-md orange-background black-text">
                    {tec}
                  </li>
                ))}
              </ul>
            )}
          </a>
        )
      })}
    </ul>
  )
}

export default Content;
