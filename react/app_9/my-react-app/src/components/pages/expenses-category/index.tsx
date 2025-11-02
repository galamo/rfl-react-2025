export function Expenses() {
  return (
    <div>
      <h1> Expenses </h1>
      <CategoriesDropdown
        jwt={localStorage.getItem("token") || ""}
        onChange={() => { }}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";

const CategoriesDropdown = ({
  jwt,
  onChange,
}: {
  jwt: string;
  onChange: () => void;
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/expenses/categories",
          {
            headers: {
              Authorization: `${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [jwt]);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  if (loading) return <CircularProgress />;

  return (
    <FormControl fullWidth>
      <InputLabel id="categories-label">Category</InputLabel>
      <Select
        labelId="categories-label"
        value={selected}
        label="Category"
        onChange={handleChange}
      >
        {categories.map(({ category }) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CategoriesDropdown.propTypes = {
  jwt: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default CategoriesDropdown;
