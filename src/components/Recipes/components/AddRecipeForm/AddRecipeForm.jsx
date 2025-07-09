import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  image: yup.mixed().required("Image is required"),
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .max(200, "Description must be less than 200 characters")
    .required("Description is required"),
  category: yup.string().required("Category is required"),
  cookingTime: yup
    .number()
    .min(1, "Cooking time must be at least 1 minute")
    .required("Cooking time is required"),
  instructions: yup
    .string()
    .max(200, "Instructions must be less than 200 characters")
    .required("Instructions is required"),
});

const AddRecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const description = watch("description", "");
  const instructions = watch("instructions", "");

  // Mock data
  const categories = [
    { id: 1, name: "Salads" },
    { id: 2, name: "Soups" },
    { id: 3, name: "Desserts" },
  ];

  const availableIngredients = [
    { id: 1, name: "Potato", image: "https://via.placeholder.com/40" },
    { id: 2, name: "Carrot", image: "https://via.placeholder.com/40" },
    { id: 3, name: "Chicken", image: "https://via.placeholder.com/40" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddIngredient = () => {
    if (selectedIngredient && ingredientAmount) {
      const ingredient = availableIngredients.find(
        (ing) => ing.id === parseInt(selectedIngredient)
      );
      if (ingredient) {
        setIngredients([
          ...ingredients,
          { ...ingredient, amount: ingredientAmount },
        ]);
        setSelectedIngredient("");
        setIngredientAmount("");
      }
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleClearForm = () => {
    reset();
    setIngredients([]);
    setImagePreview("");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("cookingTime", data.cookingTime);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", data.instructions);

      // TODO: Send request to backend
      console.log("Form data:", formData);
      alert("Recipe created successfully!");
      // TODO: Navigate to UserPage
    } catch (error) {
      alert("Error creating recipe: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Recipe Image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: 100, height: 100 }}
          />
        )}
        {errors.image && (
          <span style={{ color: "red" }}>{errors.image.message}</span>
        )}
      </div>

      <div>
        <label>Title:</label>
        <input type="text" {...register("title")} />
        {errors.title && (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        )}
      </div>

      <div>
        <label>Description ({description.length}/200):</label>
        <input type="text" {...register("description")} />
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description.message}</span>
        )}
      </div>

      <div>
        <label>Category:</label>
        <select {...register("category")}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span style={{ color: "red" }}>{errors.category.message}</span>
        )}
      </div>

      <div>
        <label>Cooking Time (minutes):</label>
        <input type="number" min="1" {...register("cookingTime")} />
        {errors.cookingTime && (
          <span style={{ color: "red" }}>{errors.cookingTime.message}</span>
        )}
      </div>

      <div>
        <label>Add Ingredient:</label>
        <select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
        >
          <option value="">Select ingredient</option>
          {availableIngredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Amount"
          value={ingredientAmount}
          onChange={(e) => setIngredientAmount(e.target.value)}
        />
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient +
        </button>
      </div>

      <div>
        <label>Ingredients List:</label>
        <ul>
          {ingredients.map((ing, index) => (
            <li key={index}>
              <img
                src={ing.image}
                alt={ing.name}
                style={{ width: 20, height: 20 }}
              />
              {ing.name} - {ing.amount}
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label>Instructions ({instructions.length}/200):</label>
        <textarea {...register("instructions")} />
        {errors.instructions && (
          <span style={{ color: "red" }}>{errors.instructions.message}</span>
        )}
      </div>

      <div>
        <button type="button" onClick={handleClearForm}>
          🗑️ Clear
        </button>
        <button type="submit">Publish</button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
