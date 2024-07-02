import { format } from "date-fns";
import BoxComponent from "../components/Box/BoxComponent";
import Button from "../components/Button/Button";
import ListComponent from "../components/List/ListComponent";
import ListItemComponent from "../components/List/ListItemComponent";
import store from "../store.tsx/store";

const Profile = () => {
  const user = store.user();
  return (
    <div className=" space-y-4">
      <BoxComponent>
        <ListComponent title="Information de profile">
          <ListItemComponent>
            <span>email</span>
            <span>{user && user.email}</span>
          </ListItemComponent>
          <ListItemComponent>
            <span>password</span>
            <span>******</span>
          </ListItemComponent>
          <ListItemComponent>
            <span>Inscrit depuis</span>
            <span>{user && format(user?.createdAt, "dd MMMM yyy")}</span>
          </ListItemComponent>
          <Button>Modifier le profile</Button>
        </ListComponent>
      </BoxComponent>
      {/* <Box>
            <h3 className='flex items-baseline text-lg gap-2 font-semibold'><span><FaAward/></span> <span>Formule Premium</span></h3>
            <Button variant='link'>Activer</Button>
        </Box> */}
    </div>
  );
};

export default Profile;
