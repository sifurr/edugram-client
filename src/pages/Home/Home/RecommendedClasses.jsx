import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Spinner from '../../../components/Spinner';

const RecommendedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: popularClasses, isLoading } = useQuery(
    {
      queryKey: ['topSalesClasses'],
      queryFn: async () => {
        const response = await axiosPublic.get('/api/v1/top-sale');
        return response.data.topSalesClasses;
      }
    }
  );

  // console.log(popularClasses)

  if (isLoading) {
    return <Spinner/>
  }

 

  return (
    <div className="container mx-auto my-8">
      
      <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">Recommended Classes</span>
                        </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {
          popularClasses?.slice(0, 6)?.map(classInfo =>
            <SwiperSlide key={classInfo._key}>          

              <div key={classInfo._id}
                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-indigo-500/10 hover:shadow-indigo-500/10"
                to="/"
              >
                <img src={classInfo?.image} alt="" />
                <h2 className="mt-4 text-xl font-bold">{classInfo?.title}</h2>

                <p className="mt-1 text-sm ">
                  <b>Posted by:  </b> {classInfo?.name}
                </p>

                <div className="mt-12 text-center">

                  <Link
                    to={`/class/${classInfo._id}`}
                    className="group relative inline-block overflow-hidden border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"

                  >
                    <span
                      className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500 transition-all group-hover:w-full group-active:bg-indigo-500"
                    ></span>
                    <span
                      className="relative text-sm font-medium text-indigo-500 transition-colors group-hover:text-white"
                    >
                      Enroll
                    </span>
                  </Link>
                </div>

              </div>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  );
};

export default RecommendedClasses;
