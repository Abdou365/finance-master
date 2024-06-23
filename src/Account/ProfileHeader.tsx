import store from "../store.tsx/store";


export const ProfileHeader = () => {
  return (
    <div>
      <div className=" relative flex flex-col place-items-center mb-8">
        <div className="h-32 w-full">
          <img className=" h-full w-full object-cover" src="https://cdn.pixabay.com/photo/2017/07/10/19/30/lines-2491184_1280.jpg" alt="" srcset="" />
        </div>
        <div className="h-24 w-24 bg-red-400 rounded-full absolute top-16  ">
          <img className=" h-full w-full object-cover rounded-full" src="https://cdn.pixabay.com/photo/2016/08/23/16/16/wallpaper-1614874_1280.jpg" alt="" srcset="" />
        </div>
      </div>
      <h3 className=" font-medium text-center ">
        <span className=" block">Bonjour</span> <span className=" block break-all text-2xl ">{store.user()?.email}</span>
      </h3> </div>
  );
};
