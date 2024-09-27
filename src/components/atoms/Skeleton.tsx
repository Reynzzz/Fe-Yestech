const Skeleton = () => {
  return (
    <>
      <div className="w-full h-screen mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="container h-10 bg-gray-300 rounded-md"></div>
        <div className="container ">
          <div className="flex justify-between w-full gap-5 my-5">
            <div className="flex w-[50%] items-center justify-center h-64 bg-gray-400 animate-pulse">
              <div className="p-6">
                <div className="w-2/3 h-6 mb-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="w-[50%] mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="p-6 animate-pulse">
                <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="w-5/6 h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 mb-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full gap-5">
            <div className="w-[50%] mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="p-6 animate-pulse">
                <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="w-5/6 h-4 mb-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 mb-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex w-[50%] items-center justify-center h-64 bg-gray-400 animate-pulse">
              <div className="p-6">
                <div className="w-2/3 h-6 mb-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="mt-5 animate-pulse">
            <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
            <div className="h-4 mb-4 bg-gray-300 rounded"></div>
            <div className="w-5/6 h-4 mb-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 mb-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Skeleton
