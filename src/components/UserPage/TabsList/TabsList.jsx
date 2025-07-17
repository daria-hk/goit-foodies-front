export const USER_LIST_VARIANTS = {
  followers: 'followers',
  following: 'following',
  my_recipes: 'my_recipes',
  my_favorites: 'my_favorites',
}

const TABS_VARIANTS = [
  { id: USER_LIST_VARIANTS.my_recipes, label: "My recipes" },
  { id: USER_LIST_VARIANTS.my_favorites, label: "My favorites" },
  { id: USER_LIST_VARIANTS.followers, label: "Followers" },
  { id: USER_LIST_VARIANTS.following, label: "Following" },
];

const TabsList = ({ variant, onChange }) => {
  return (
    <div>
      {TABS_VARIANTS.map((tab) => (
        <button key={tab.id} type="button" onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsList;
