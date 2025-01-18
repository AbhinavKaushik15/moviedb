import Found404 from "/Found404.gif";
const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#000]">
      <img className="h-[100vh] object-cover" src={Found404} alt="" />
    </div>
  )
}

export default NotFound;