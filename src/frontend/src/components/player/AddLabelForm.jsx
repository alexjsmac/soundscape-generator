import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { generalActions } from "../../core/general";
import { Button } from "../lib";

const AddLabelForm = () => {
  const [newKeyword, setNewKeyword] = useState("");
  const keywords = useSelector((state) => state.general.keywords);
  const dispatch = useDispatch();

  const onKeywordChange = (e) => {
    setNewKeyword(e.target.value);
  };

  const addNewKeyword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (newKeyword === "") return;
    if (keywords.filter((k) => k === newKeyword).length > 0) return;

    dispatch(generalActions.addKeyword(newKeyword));
    setNewKeyword("");
  };

  return (
    <form onSubmit={addNewKeyword}>
      <label htmlFor="add-label" className="text-xs">
        <b>New Audio Label</b>
      </label>
      <div className="flex w-[80%]">
        <Input
          id="add-label"
          type="text"
          size="small"
          value={newKeyword}
          onChange={onKeywordChange}
          style={{
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
          }}
        />
        <Button
          className="px-2 py-0 h-[24px] m-0 rounded-tl-none rounded-l-none"
          onClick={addNewKeyword}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddLabelForm;
