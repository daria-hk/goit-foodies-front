
import css from './ItemsListContainer.module.css';

const ItemsListContainer = ({ children, getItemIdByIndex }) => {
    if (children.length === 0) {
        return <div className={css.empty}>No items found</div>;
    }

    return (
        <div>
            <ul>
                {children.map((child, index) => (
                    <li key={getItemIdByIndex(index)} className={css.item}>
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsListContainer;
