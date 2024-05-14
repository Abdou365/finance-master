import { FaTrophy } from "react-icons/fa";
import CircleProgress from "../../components/CircleProgress/CircleProgress";
import Wait from "../../components/Wait/Wait";
import { upsertObjectif, useGetAllObjectif } from "../../store.tsx/useObject";
import { ObjectifCard } from "./ObjectifCard";
import "./Objectif.scss"; // Importez le fichier SCSS pour les styles
import { createObjectif } from "../../Modal/ObjectifDrawer";
import { useParams } from "react-router-dom";
import store from "../../store.tsx/store";
import { v4 as uuidv4 } from "uuid";
import { uniqueId } from "lodash";

const Objectif: React.FC = () => {
  const { accountId } = useParams();
  const { user } = store;
  const objectifs = useGetAllObjectif();
  const handleCreate = async () => {
    const res: any = await createObjectif();
    console.log(res);

    upsertObjectif({
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
  };

  if (!objectifs) {
    return <Wait />;
  }

  return (
    <section className="bg-gray-100 h-full p-3 overflow-auto objectif">
      <div className="container mx-auto space-y-3">
        <div className="flex items-baseline justify-between flex-wrap">
          <h3 className="objectif__title">Objectif</h3>
          <button
            onClick={handleCreate}
            className="objectif__button btn-primary"
          >
            <FaTrophy /> Ajouter un Objectif
          </button>
        </div>
        <div className="objectif__content">
          <div className="objectif__list">
            {objectifs.map((objectif, index) => (
              <ObjectifCard key={index} objectif={objectif} />
            ))}
          </div>
          <div className="objectif__info">
            <div className="objectif__circle-progress">
              <div>
                <span className="objectif__progress-number">21</span>
                <span className="objectif__progress-label">/21</span>
              </div>
              <span className="objectif__progress-label">Budget respecté</span>
            </div>
            <div>
              <CircleProgress size={200} strokeWidth={10} progress={75} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectif;
