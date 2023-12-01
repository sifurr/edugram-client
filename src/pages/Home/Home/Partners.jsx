import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Spinner from "../../../components/Spinner";

const Partners = () => {
  const axiosPublic = useAxiosPublic()

  const { data: partners, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/partners`);
      return res.data;
    }
  });

  if (isLoading) {
    return <Spinner />
  }



  return (
    <div className="container drop-shadow-xl mx-auto my-10 flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3">        
        <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">Our Partners!</span>
                        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-gray-300 text-neutral-900 dark:text-neutral-900 rounded-md">
              <img
                src={partner?.logoUrl}
                alt={`${partner?.name} Logo`}
                className="max-w-full h-auto mb-4 object-contain"
                style={{ maxHeight: '100px' }}
              />
              <h3 className="font-bold text-center pb-2">{partner?.title}</h3>
              <p className="text-center text-sm">{partner?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
