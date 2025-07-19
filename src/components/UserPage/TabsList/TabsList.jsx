import styles from "./TabsList.module.css";

const TabsList = () => {
  const tabs = [
    { id: "recipes", label: "My recipes" },
    { id: "followers", label: "My followers" },
    { id: "following", label: "My following" },
    { id: "favorites", label: "My favorites" },
  ];

  return (
    <div className={styles.tabsWrapper}>
      {tabs.map((tab) => (
        <button className={styles.tabsList} key={tab.id} type="button">
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsList;
