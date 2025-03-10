import React from 'react';

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

  return { month: months[month + 1] || '', day, year };
}

const Content = ({ posts, years }) => {
  return (
    <ul className="flex flex-col mt-10 border-t border-orange border-opacity-70">
      {years.map((year) => {
        const postsToShow = posts[year]

        return (
          <article key={`articles-${year}`}>
            <h2 className='text-3xl text-orange mt-10'>{year}</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {postsToShow.map((post) => {
                const description = post.data.description ?? '';
                const { month, day, year } = getDateLabels(post?.data?.pubDate)
                const stack = post.data.tags?.split(',') ?? [];

                return (
                  <a href={`/blog/${post.slug}/`} key={`${post.timestamp}-${post.slug}`} className='py-6 px-1'>
                    <li className='border border-orange-50 max-w-[944px] h-full'>
                      <article className="flex flex-col items-start justify-between h-full">
                        <div className='py-4 px-3 w-full'>
                          <div className="relative gap-x-2 text-xs w-full">
                            <p className="text-gray-400 text-[10px]">{`${month} ${day}, ${year}`}</p>
                            {stack && (
                              <ul className="flex gap-2 flex-wrap absolute max-w-[75%] -top-1 -right-1">
                                {stack.map((tec) => (
                                  <li key={`${post.timestamp}-${tec}`} className="relative z-10 rounded-md text-[8px] orange-background p-1 font-medium black-text">
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
                          <p className='text-xs text-orange opacity-80 h-4 flex gap-2 items-center mt-2'>
                            {post.data.readingTime ? <span className='mr-4'>{`~${post.data.readingTime} min read`}</span> : null}
                            {post.data.languages?.includes('en') && <span className='text-gray-200'>EN</span>}
                            {post.data.languages?.includes('es') && <span className='text-gray-200'>ES</span>}
                          </p>
                        </div>
                        <div className="relative mt-8 flex items-center md:items-start">
                          <div className="text-sm leading-6">
                            {post.data.image &&
                              <img className="object-contain order-first" width={944} src={post.data.image} alt="" />
                            }
                          </div>
                        </div>
                      </article>
                    </li>
                  </a>
                )
              })}
            </section>
          </article>
        )
      })}
    </ul>
  )
}

export default Content;
