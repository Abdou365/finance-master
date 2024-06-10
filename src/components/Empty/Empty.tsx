import React from "react";
import image from "../../assets/empy.webp";

type EmptyProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

const Empty: React.FC<EmptyProps> = ({
  action,
  description = "Désolé, il n'y a aucune donnée à afficher pour le moment.",
  title = "Aucune donnée disponible",
}) => {
  return (
    <div className=" w-full h-full bg-white dark:bg-primary-900 dark:border-primary-600 rounded border flex flex-col place-content-center place-items-center justify-items-center gap-4 p-4">
      <img
        src={image}
        className=" w-48 rounded border dark:border-primary-600"
      />
      <h1 className=" font-semibold text-xl">{title}</h1>
      <p>{description}</p>
      {action && <div> {action} </div>}
    </div>
  );
};

export default Empty;
