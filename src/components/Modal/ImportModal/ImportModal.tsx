import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useItemsTable } from "../../../Budget/Items/useItemsTable";
import { ItemType } from "../../../types/item.type";
import FormComponent from "../../Form/FormComponent";
import StepperComponent from "../../Step/StepComponent";
import Table from "../../Table/Table";
import ModalComponent from "../ModalComponent";
import { ModalLegacyProps, openModal } from "../modal.ctx";
import { formatImportData } from "./importModal.utils";
import Textarea from "react-textarea-autosize";
import { FaFileImport } from "react-icons/fa";
import CustomSelect from "../../../Budget/Items/CompactSelect";

const steps = [
  {
    label: "Fichier",
  },
  {
    label: "Mapping",
  },
  {
    label: "Validation",
  },
];

type Props = {};

interface ImportModalProps extends Props, ModalLegacyProps {}

const ImportModal: React.FC<ImportModalProps> = (props) => {
  const { onCancel, onConfirm } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [importedData, setImportedData] = useState<any>([]);
  const [items, setItems] = useState<Partial<ItemType>[]>([]);
  const [dateFormat, setDateFormat] = useState<string>("yyyy-mm-dd");
  const dateFormats = [
    {
      label: "2000-01-01",
      value: "yyyy-mm-dd",
    },
    {
      label: "01/01/2000",
      value: "dd/mm/yyyy",
    },
    {
      label: "01-01-2000",
      value: "dd-mm-yyyy",
    },
    {
      label: "01.01.2000",
      value: "dd.mm.yyyy",
    },
    {
      label: "2000.01.01",
      value: "yyyy.mm.dd",
    },
    {
      label: "2000/01/01",
      value: "yyyy/mm/dd",
    },
  ];
  const { columns } = useItemsTable();
  const itemKeys: string[] = [
    "title",
    "description",
    "date",
    "status",
    "value",
    "category",
    "isExpense",
  ];

  const handleFileRead = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      });

      if (jsonData.length > 0) {
        setActiveStep(1);
      }
      setImportedData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handlePaste = (e: any) => {
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const data = pastedData.split("\n").map((row: string) => row.split("\t"));
    setImportedData(data);
    setActiveStep(1);
  };

  const render = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className=" space-y-4">
            <div className=" text-xl">Importer un fichier xlsx</div>
            <div className="relative border h-40 w-full flex flex-col justify-center items-center rounded bg-gray-50  dark:border-primary-600 dark:bg-primary-900">
              <input
                type="file"
                className="cursor-pointer absolute block opacity-0 w-full h-full"
                onInput={handleFileRead}
                accept=".xls,.xlsx,.csv"
              />
              <FaFileImport size={40} />
              <span className=" text-xl font-semibold">Select Files</span>
            </div>
            <div className=""> Choix du format de la date </div>
            <CustomSelect
              options={dateFormats}
              initialValue={dateFormat}
              onChange={(value) => {
                setDateFormat(value as string);
              }}
            />
            <div>Coller les données</div>
            <Textarea
              className="w-full bg-gray-50 dark:bg-primary-900 border border-gray-300 rounded focus:outline-none dark:border-primary-600 p-2"
              minRows={4}
              placeholder="Coller les données"
              onPaste={handlePaste}
            ></Textarea>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col">
            <div className="">
              <FormComponent
                onSubmit={(formState) => {
                  setActiveStep(2);
                  setItems(formatImportData(formState, importedData));
                }}
                fields={importedData[0].map((item: string) => {
                  return {
                    label: item,
                    name: item,
                    type: "select",
                    options: itemKeys,
                    defaultValue: itemKeys.find((key) => key === item),
                  };
                })}
              />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <Table
              tableData={items}
              setRowSelection={() => {}}
              onChange={(data) => {
                const newItems = items.map((item) => {
                  if (data.id === item.id) {
                    return data;
                  }
                  return item;
                });
                setItems(newItems);
              }}
              columns={columns}
              actions={[]}
            />
          </div>
        );
    }
  };

  return (
    <ModalComponent
      as="modal"
      size="full"
      onClose={() => onCancel()}
      footer={
        <>
          <button className="btn-gray" onClick={() => onCancel()}>
            Annuler
          </button>
          <button className="btn-primary" onClick={() => onConfirm(items)}>
            Importer
          </button>
        </>
      }
      title="Importer"
      body={
        <div>
          <div className="flex">
            <StepperComponent
              items={steps}
              activeStep={activeStep}
              onStepChange={setActiveStep}
              clickable
            />
          </div>
          {render()}
        </div>
      }
    />
  );
};

export default ImportModal;

export const importModal = async (props: Props) => {
  return await openModal(ImportModal, props);
};
