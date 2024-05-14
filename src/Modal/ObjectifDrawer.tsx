import React, { useState } from "react";
import { ObjectifType } from "../types/objectif.type";
import Drawer from "./Drawer";
import { ModalLegacyProps, openModal } from "./modal.ctx";
import FormComponent from "../components/Form/Form";

const fields = [
  {
    type: "select",
    name: "type",
    label: "Type d'objectif",
    options: [
      { value: "savings", label: "Économiser de l'argent" },
      { value: "income", label: "Augmenter les revenus" },
    ],
  },
  {
    type: "select",
    name: "categories",
    label: "Catégorie",
    multiple: true, // Permet les sélections multiples
    options: [
      { value: "alimentation", label: "Alimentation" },
      { value: "transport", label: "Transport" },
      { value: "logement", label: "Logement" },
      { value: "loisirs", label: "Loisirs" },
    ],
  },
  {
    type: "text",
    name: "title",
    label: "Titre de l'objectif",
  },
  {
    type: "textarea",
    name: "description",
    label: "Description de l'objectif",
  },
  {
    type: "date",
    name: "from",
    label: "Date de début",
  },
  {
    type: "date",
    name: "to",
    label: "Date de fin",
  },
  {
    type: "number",
    name: "targetAmount",
    label: "Montant cible",
  },
];

interface Props extends ModalLegacyProps, Partial<ObjectifType> {}

export const ObjectifDrawer: React.FC<Props> = (props) => {
  const { onCancel, onConfirm } = props;
  const [formState, setFormState] = useState({});
  console.log(formState);

  const onClose = () => {
    onCancel();
  };
  return (
    <Drawer
      title={props.title || "Créer un objectif"}
      onClose={onClose}
      body={
        <FormComponent
          fields={fields}
          onChange={({ name, value }) => {
            setFormState((obj) => ({ ...obj, [name]: value }));
          }}
        />
      }
      footer={
        <>
          <div className="btn-primary-outlined">Anunler</div>
          <div className="btn-primary" onClick={() => onConfirm(formState)}>
            Valider
          </div>
        </>
      }
    />
  );
};

export const createObjectif = async () => {
  return await openModal(ObjectifDrawer, {});
};
