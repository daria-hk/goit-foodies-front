import CategoryList from '../CategoryList/CategoryList';
import styles from './Categories.module.css';

const Categories = ({ error, onCategorySelect }) => (
  <section className={styles['categories-section']}>
    <div className={styles['categories-wrapper']}>
      <h2 className={styles['categories-title']}>Categories</h2>
      <p className={styles['categories-description']}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </p>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
    <CategoryList onCategorySelect={onCategorySelect} />
  </section>
);

export default Categories;
