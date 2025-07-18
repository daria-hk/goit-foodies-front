import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/slices/categoriesSlice";
import { selectIngredients } from "../../../../redux/slices/ingredientsSlice";
import { createRecipe } from "../../../../redux/ops/recipesOps";
import css from "./AddRecipeForm.module.css";
import { toast } from "react-toastify";
import { fetchCategories } from "../../../../redux/ops/categoriesOps";
import { fetchIngredients } from "../../../../redux/ops/ingredientsOps";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [cookingTime, setCookingTime] = useState(10);

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

  const categories = useSelector(selectCategories);
  const availableIngredients = useSelector(selectIngredients);

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
    data.cookingTime = cookingTime;
    try {
      const formData = new FormData();
      formData.append("thumb", data.image[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("area", data.area || 4);
      formData.append("category", data.category);
      formData.append("time", data.cookingTime);
      formData.append(
        "ingredients",
        JSON.stringify(
          ingredients.map((itm) => ({
            id: itm.id,
            measure: itm.amount,
          }))
        )
      );
      formData.append("instructions", data.instructions);

      const result = await dispatch(createRecipe(formData)).unwrap();
      console.log("Recepi created:", result);

      reset();
      setIngredients([]);
      setImagePreview("");
      setCookingTime(10);
      toast.success("Recipe successfully created!");
    } catch (error) {
      console.log(error.message);
      toast.error("Error creating recipe: " + error.message);
    }
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.imageUploadWrapper}>
        <input
          id="recipe-image"
          className={css.imgInput}
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="recipe-image" className={css.customFileLabel}>
          {imagePreview ? (
            <img className={css.imageUpload} src={imagePreview} alt="Preview" />
          ) : (
            <span>Upload a photo</span>
          )}
        </label>
        {errors.image && (
          <span style={{ color: "red" }}>{errors.image.message}</span>
        )}
      </div>

      <div>
        <input
          className={css.nameOfRec}
          placeholder="The name of the recipe"
          type="text"
          {...register("title")}
        />
        {errors.title && (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        )}
      </div>

      <div className={css.addDescrptn}>
        <input
          placeholder="Enter a description of the dish"
          type="text"
          {...register("description")}
        />
        <label>({description.length}/200)</label>

        {errors.description && (
          <span style={{ color: "red" }}>{errors.description.message}</span>
        )}
      </div>
      <div className={css.flexRowContainer}>
        <div className={css.subContainer}>
          <label className={css.titleAddRecipePage}>Category</label>
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

        <div className={css.subContainer}>
          <label className={css.titleAddRecipePage}>
            Cooking Time (minutes):
          </label>
          <div className={css.cookingTimeWrapper}>
            <button
              type="button"
              className={css.timeBtn}
              onClick={() => setCookingTime((prev) => Math.max(1, prev - 1))}
            >
              –
            </button>
            <input
              className={css.cookingTime}
              type="number"
              min="1"
              value={cookingTime}
              onChange={(e) => setCookingTime(Number(e.target.value))}
              {...register("cookingTime")}
              style={{ textAlign: "center", width: "80px" }}
            />
            <button
              type="button"
              className={css.timeBtn}
              onClick={() => setCookingTime((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          {errors.cookingTime && (
            <span style={{ color: "red" }}>{errors.cookingTime.message}</span>
          )}
        </div>
      </div>
      <div className={css.subContainer}>
        <label className={css.titleAddRecipePage}>Ingredients:</label>
        <div className={css.flexRowContainer}>
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
            className={css.addDescrptn}
            type="text"
            placeholder="Enter quantity"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
          />
        </div>
        <button
          className={css.formButton}
          type="button"
          onClick={handleAddIngredient}
        >
          Add ingredient +
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className={css.ingridientsWrapper}>
          <label className={css.titleAddRecipePage}>Ingredients List</label>
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
                  className={css.timeBtn}
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className={css.titleAddRecipePage}>Recipe Preparation</label>
      </div>
      <div className={css.addDescrptn}>
        <input
          placeholder="Enter recipe"
          type="text"
          {...register("instructions")}
        />
        <label>({instructions.length}/200)</label>

        {errors.instructions && (
          <span style={{ color: "red" }}>{errors.instructions.message}</span>
        )}
      </div>

      <div className={css.buttonsContainer}>
        <button
          type="button"
          className={css.clearButton}
          onClick={handleClearForm}
        >
          🗑️
        </button>
        <button className={css.publishButton} type="submit">
          Publish
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
