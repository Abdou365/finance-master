import { omit, uniqueId } from "lodash";
import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { openConfirmModal } from "../../Modal/ConfirModal";
import { formModal } from "../../Modal/FormModal";
import Button from "../../components/Button/Button";
import Empty from "../../components/Empty/Empty";
import store from "../../store.tsx/store";
import { upsertObjectif, useGetAllObjectif } from "../../store.tsx/useObject";
import { ObjectifType } from "../../types/objectif.type";
import "./Objectif.scss";
import { ObjectifCard } from "./ObjectifCard";
import { ObjectifInfo } from "./ObjectifInfo";
import { useObjectifField } from "./useObjectifField";

const Objectif: React.FC = () => {
  const { accountId } = useParams();
  const itemFields = useObjectifField();
  const [setselected, setSetselected] = useState<ObjectifType[]>([]);
  const { user } = store;
  const { data, refetch } = useGetAllObjectif();
  const { objectifs, summary } = data;

  const handleCreate = async () => {
    const res: any = await formModal({
      fields: itemFields,
      variant: "drawer",
      title: "Créer un objectif",
    });

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

  /**
   * Handles the selection of an objectif.
   * If the objectif is already selected, it will be removed from the selected list.
   * If the objectif is not selected, it will be added to the selected list.
   *
   * @param obj - The objectif to be selected or deselected.
   */
  const handleSelect = (obj: ObjectifType) => {
    if (setselected.includes(obj)) {
      setSetselected(setselected.filter((select) => select === obj));
    } else {
      setSetselected((select) => [...select, obj]);
    }
  };

  /**
   * Handles the deletion of an objectif.
   * @param obj - The objectif to be deleted.
   */
  const handleDelete = async (obj: ObjectifType) => {
    const confirm: boolean = await openConfirmModal({
      message:
        "Voulez-vous vraiment supprimer cet objectif? Cette action est irréversible",
    });

    if (!confirm) {
      return;
    }

    const deletedObjectif = await upsertObjectif({
      ...omit(obj, "currentAmount", "progress"),
      status: "deleted",
    });

    if (deletedObjectif?.statusCode === 201) {
      refetch();
    }
  };

  /**
   * Deletes the selected objectives.
   */
  const handdeleteSelected = async () => {
    const confirm: boolean = await openConfirmModal({
      message:
        "Voulez-vous vraiment supprimer cet objectif? Cette action est irréversible",
    });

    if (!confirm) {
      return;
    }
    const deletedObjectif = await Promise.all(
      setselected.map(async (obj) => {
        return await upsertObjectif({
          ...omit(obj, "currentAmount", "progress"),
          status: "deleted",
        });
      })
    );

    if (deletedObjectif?.[0]?.statusCode === 201) {
      refetch();
    }
  };

  /**
   * Handles the edit operation for an objectif.
   * @param obj - The objectif to be edited.
   */
  const handleEdit = async (obj: ObjectifType) => {
    const cleanObj = omit(obj, "currentAmount", "progress");

    const res: any = await formModal({
      fields: itemFields,
      variant: "drawer",
      title: obj.title || "Modifier l'objectif",
      data: cleanObj,
    });

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
    <section className="h-full p-3 overflow-auto objectif">
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
            <Button color="red" onClick={handdeleteSelected}>
              Supprimer
            </Button>
          </div>
        </div>
        {!objectifs && <Empty />}
        {objectifs && (
          <div className="objectif__content">
            <div className="objectif__list">
              {objectifs.map((objectif, index) => (
                <ObjectifCard
                  key={index}
                  objectif={objectif}
                  onSelect={handleSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <ObjectifInfo
              completed={summary?.completed}
              length={summary?.total}
              progress={summary?.progress}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Objectif;
