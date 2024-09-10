import { FieldType } from "../../components/Form/FormComponent";
import { useGetItemsCategory } from "../../store.tsx/useItems";

export const useObjectifField = () => {
  const { data: categorie } = useGetItemsCategory();

  const objectifFields: FieldType[] = [
    {
      type: "select",
      name: "type",
      label: "Type d'objectif",
      description:
        "Vous souhaiter économiser de l'argent ou augmenter vos revenus ?",
      options: [
        { value: "savings", label: "Économiser de l'argent" },
        { value: "income", label: "Augmenter les revenus" },
      ],
    },
    {
      type: "select",
      name: "categories",
      label: "Catégorie",
      description:
        "Choisissez parmis quelle type de dépense ou revenus cet objectif s'applique",
      multiple: true, // Permet les sélections multiples
      options: categorie || [],
    },
    {
      type: "select",
      name: "isRecurrent",
      label: "Est-ce un objectif récurrent ?",
      description: "Si oui, l'objectif sera répété chaque mois",
      options: [
        { value: true, label: "Oui" },
        { value: false, label: "Non" },
      ],
    },
    {
      type: "select",
      name: "recurrence",
      label: "Fréquence de récurrence",
      options: [
        { value: "month", label: "Mensuel" },
        { value: "year", label: "Annuel" },
        { value: "week", label: "Hebdomadaire" },
        { value: "day", label: "Journalier" },
      ],
      condition: (data) => {
        return data.isRecurrent;
      },
    },
    {
      type: "number",
      name: "recurrenceInterval",
      label: "Intervalle de récurrence",
      description: "Combien de fois l'objectif doit être répété",
      condition: (data) => data.isRecurrent,
      defaultValue: 1,
      min: 1,
      max: (data) => {
        if (data.recurrence === "month") {
          return 12;
        }
        if (data.recurrence === "week") {
          return 4;
        }
        if (data.recurrence === "day") {
          return 31;
        }
        return 1;
      },
    },
    {
      type: "text",
      name: "title",
      description: "Quelle est le titre de votre objectif ?",
      label: "Titre de l'objectif",
    },
    {
      type: "textarea",
      name: "description",
      description: "Décrivez votre objectif en quelques mots",
      label: "Description de l'objectif",
    },

    {
      type: "date",
      name: "from",
      label: "Date de début",
      condition: (data) => !data.isRecurrent,
    },
    {
      type: "date",
      name: "to",
      label: "Date de fin",
      condition: (data) => !data.isRecurrent,
    },
    {
      type: "number",
      name: "targetAmount",
      label: "Montant cible",
    },
  ];
  return objectifFields;
};
