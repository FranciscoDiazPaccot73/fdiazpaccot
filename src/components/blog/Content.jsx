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
    <ul className="flex flex-col mt-10 border-t border-orange border-opacity-70">
      {postsToShow.map((post) => {
        const description = post.data.description ?? '';
        const { month, day, year } = getDateLabels(post?.data?.pubDate)
        const stack = post.data.tags?.split(',') ?? [];

        return (
          <a href={`/blog/${post.slug}/`} key={`${post.timestamp}-${post.slug}`} className='border-b border-opacity-40 border-b-orange py-6 px-1'>
            <li className='py-6 px-1'>
              <article className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <p className="text-gray-400">{`${month} ${day}, ${year}`}</p>
                  {stack && (
                    <ul className="ml-2 flex gap-2 flex-wrap">
                      {stack.map((tec) => (
                        <li key={`${post.timestamp}-${tec}`} className="relative z-10 rounded-md text-[10px] orange-background px-1 py-[2px] font-medium black-text">
                          {tec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="font-bold relative">
                  <h3 className='text-orange text-xl'>{post.data.title}</h3>
                  <p title={description.toString()} className="mt-5 font-normal line-clamp-3 text-sm leading-6 text-gray-200">
                    {post.data.description}
                  </p>
                </div>
                <p className='text-xs text-orange opacity-80 h-4 flex justify-between items-center mt-2'>
                  {post.data.readingTime ? `~${post.data.readingTime} min read` : ''}
                  <img alt='Spanish' src='/spain.svg' width={18} height={18} className='ml-4' />
                </p>
                <div className="relative mt-8 flex items-center md:items-start">
                  <div className="text-sm leading-6">
                    {post.data.image &&
                      <img className="max-h-20 object-contain order-first" width={720} height={360} src={post.data.image} alt="" />
                    }
                  </div>
                </div>
              </article>
            </li>
          </a>
        )
      })}
    </ul>
  )
}

export default Content;
