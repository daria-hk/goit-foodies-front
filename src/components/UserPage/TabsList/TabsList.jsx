const TabsList = () => {
  const tabs = [
    { id: "recipes", label: "Recipes" },
    { id: "followers", label: "Followers" },
    { id: "following", label: "Following" },
  ];

  return (
    <div>
      {tabs.map((tab) => (
        <button key={tab.id} type="button">
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsList;
