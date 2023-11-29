import useClass from "../../../../hooks/useClass";
import Class from "./Class";


const MyClasses = () => {
    const { data, refetch, isLoading } = useClass();
    console.log("classes: ", data)
    return (
        <div>
            <h2 className="text-center text-2xl my-10 font-bold text-indigo-600 sm:text-3xl">
                My Classes
            </h2>
            
            <div>
                <div className="grid grid-cols-1 gap-4 px-10 lg:grid-cols-2 lg:gap-8">
                    {data?.map(classInfo =>
                            
                        <Class key={classInfo._id} refetch={refetch} classInfo={classInfo} />
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default MyClasses;