import { FaTrophy } from "react-icons/fa";
import Wait from "../../components/Wait/Wait";
import { upsertObjectif, useGetAllObjectif } from "../../store.tsx/useObject";
import { ObjectifCard } from "./ObjectifCard";
import "./Objectif.scss"; // Importez le fichier SCSS pour les styles
import { createObjectif, updateObjectif } from "../../Modal/ObjectifDrawer";
import { useParams } from "react-router-dom";
import store from "../../store.tsx/store";
import { v4 as uuidv4 } from "uuid";
import { omit, uniqueId } from "lodash";
import { useState } from "react";
import { ObjectifType } from "../../types/objectif.type";
import { ObjectifInfo } from "./ObjectifInfo";
import Button from "../../components/Button/Button";

const Objectif: React.FC = () => {
  const { accountId } = useParams();
  const [setselected, setSetselected] = useState<ObjectifType[]>([]);
  const { user } = store;
  const { data, refetch } = useGetAllObjectif();
  const { objectifs, summary } = data;

  const handleCreate = async () => {
    const res: any = await createObjectif();

    if (res) {
      const newObjectif = await upsertObjectif({
        id: uuidv4(),
        accountId,
        userId: user()?.id,
        title: res?.title || "Objectif" + uniqueId(),
        description: res?.description || null,
        categories: res.categories || [],
        from: res?.from ? new Date(res.from).toISOString() : null,
        to: res?.to ? new Date(res.to).toISOString() : null,
        targetAmount: res.targetAmount || 1,
        type: res?.type || "savings",
      });

      if (newObjectif?.statusCode === 201) {
        refetch();
      }
    }
  };

  if (!objectifs) {
    return <Wait />;
  }

  const handleSelect = (obj: ObjectifType) => {
    if (setselected.includes(obj)) {
      setSetselected(setselected.filter((select) => select === obj));
    } else {
      setSetselected((select) => [...select, obj]);
    }
  };

  const handleEdit = async (obj: ObjectifType) => {
    const res: any = await updateObjectif(obj);
    const cleanObj = omit(obj, "currentAmount", "progress");

    if (res) {
      const update = await upsertObjectif({
        ...cleanObj,
        ...res,
      });

      if (update?.statusCode === 201) {
        refetch();
      }
    }
  };

  return (
    <section className="bg-gray-100 h-full p-3 overflow-auto objectif">
      <div className="container mx-auto space-y-3">
        <div className="flex items-baseline justify-between flex-wrap">
          <h3 className="objectif__title">Objectif</h3>
          <div className=" flex gap-3 flex-wrap">
            <Button
              onClick={handleCreate}
              className="objectif__button btn-primary"
            >
              <FaTrophy /> Ajouter un Objectif
            </Button>
            <Button color="red">Supprimer</Button>
          </div>
        </div>
        <div className="objectif__content">
          <div className="objectif__list">
            {objectifs.map((objectif, index) => (
              <ObjectifCard
                key={index}
                objectif={objectif}
                onSelect={handleSelect}
                onEdit={handleEdit}
              />
            ))}
          </div>
          <ObjectifInfo
            completed={summary.completed}
            length={summary.total}
            progress={summary.progress}
          />
        </div>
      </div>
    </section>
  );
};

export default Objectif;
