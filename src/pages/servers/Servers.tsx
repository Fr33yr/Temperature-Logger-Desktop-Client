import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhook";
import { addServer } from "../../redux/features/serversSlice";
import {exists, BaseDirectory} from '@tauri-apps/plugin-fs'

import "./Server.css";

export default function Servers() {
  const [showForm, setShowForm] = useState(false);
  const { selectedServer, servers } = useAppSelector(
    (state) => state.serversReducer
  );
  const dispatch = useAppDispatch();

  const isServersEmpty = !servers || servers.length <= 0;

  return (
    <>
      <h2 className="title">Servers</h2>
      {isServersEmpty && !showForm ? <NonServerExists /> : ""}
      {!showForm && (
        <button className="addsvbtn" onClick={() => setShowForm(true)}>Add Server</button>
      )}
      {!showForm && servers?.map((item) => (
        <div className="serverlistitem">
          <span>{item.name}</span>
          <li>{item.url}</li>
        </div>
      ))}
      {showForm && <ServerForm />}
    </>
  );

  // Empty server list Message
  function NonServerExists() {
    return (
      <div className="emptylistwarning">
        <h3>No servers added yet</h3>
      </div>
    );
  }

  // ServerForm
  function ServerForm() {
    interface FormState {
      name: string;
      url: string;
    }
    const [formData, setFormData] = useState<FormState>({
      name: "",
      url: "",
    });

    const disableSubmit = formData.name.length == 0 || formData.url.length == 0;

    const handleFormCancel = () => {
      setFormData({ name: "", url: "" });
      setShowForm(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
      dispatch(addServer(formData));
      setFormData({ name: "", url: "" });
      setShowForm(false);
    };

    return (
      <div className="formcontainer">
        <form className="serverform" onSubmit={handleSubmit}>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="formdivider"></span>
          <label htmlFor="serverurl">server url</label>
          <input
            type="text"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleChange}
          />
          <div className="buttons">
            <button
              type="submit"
              className="submitbtn"
              disabled={disableSubmit}
            >
              Confirm
            </button>
            <button className="closebtn" onClick={handleFormCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
