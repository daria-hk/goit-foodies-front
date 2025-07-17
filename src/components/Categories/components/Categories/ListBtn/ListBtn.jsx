// import Icon from 'src/components/shared/Icon/Icon.jsx';
// Додати іконки і потім цю логіку

import styles from './ListBtn.module.css';

export const ListBtn = ({ category, imgUrl, imgUrl2x, onClick }) => {
  const isRetina = window.devicePixelRatio > 1;
  const backgroundImage = isRetina && imgUrl2x ? imgUrl2x : imgUrl;

  return (
    <button
      className={styles['recipe-list-btn']}
      type="button"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      onClick={onClick}
    >
      <div className={styles['labels-wrapper']}>
        <p className={styles['category']}>{category}</p>
        {/* <div className={styles['icon-wrapper']}>
          <Icon
            customStyle={styles['icon']}
            iconId={'icon-arrow-up-right'}
            width={20}
            height={20}
          />
        </div> */}
      </div>
    </button>
  );
};
