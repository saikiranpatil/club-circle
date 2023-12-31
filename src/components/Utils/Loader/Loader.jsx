import MetaData from "../../Layout/MetaData"

const Loader = () => {
    return (
        <>
            <MetaData title={"Loading... - Club Circle"} />
            <div className="h-screen bg-white">
                <div className="flex justify-center items-center h-full">
                    <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                </div>
            </div>
        </>
    )
}

export default Loader
