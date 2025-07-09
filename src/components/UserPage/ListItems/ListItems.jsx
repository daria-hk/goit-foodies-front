const ListItems = () => {
  // Mock data
  const items = [
    { id: 1, type: "recipe", title: "Recipe 1" },
    { id: 2, type: "user", name: "User 1" },
    { id: 3, type: "recipe", title: "Recipe 2" },
  ];

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.type === "recipe" ? (
            <div>RecipePreview: {item.title}</div>
          ) : (
            <div>UserCard: {item.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListItems;
