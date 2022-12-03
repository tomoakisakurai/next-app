export const Header = () => {
  return (
    <>
      <header className='mx-auto max-w-screen-xl py-4 px-4 lg:px-8 lg:py-4'>
        <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
          <a className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-10 w-10 rounded-full bg-indigo-500 p-2 text-white'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl'>勤怠</span>
          </a>
          <nav className='flex flex-wrap items-center justify-center text-base md:mr-auto	md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            <a className='mr-5 hover:text-gray-900'>First Link</a>
            <a className='mr-5 hover:text-gray-900'>Second Link</a>
            <a className='mr-5 hover:text-gray-900'>Third Link</a>
            <a className='mr-5 hover:text-gray-900'>Fourth Link</a>
          </nav>
          {/* <button className='mt-4 inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-base hover:bg-gray-200 focus:outline-none md:mt-0'>
            Button
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='ml-1 h-4 w-4'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </button> */}
        </div>
      </header>
    </>
  );
};
