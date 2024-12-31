import { useContext } from "react";
import { FormContext } from "../App";
import Sidebar from "./SideBar";

export const CreateForm = () => {
  const context = useContext(FormContext);

  if (!context) {
    console.error('FormContext not found!');
    return <div>Error: Context not available.</div>;
  }

  const { folders } = context;
  console.log(folders, 'folders');

  return (
    <>
      <Sidebar/>
    </>
  );
};