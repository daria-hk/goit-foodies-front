import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectRecipesPage as selectPage,
    selectRecipesTotalPages as selectTotalPages,
    selectSelectedArea,
    selectSelectedCategory,
    selectSelectedIngredients,
    setPage,
} from '@/redux/slices/recipesSlice';

import { fetchRecipes } from '@/redux/ops/recipesOps';
import css from './ListPagination.module.css';

const ListPagination = ({
                            variant = 'all', // 'all', 'owner', 'user', 'favorites'
                            page: propPage,
                            totalPages: propTotalPages,
                            selectedArea: propArea,
                            selectedCategory: propCategory,
                            selectedIngredients: propIngredients,
                            userId,
                            onPageChange,
                        }) => {
    const dispatch = useDispatch();

    const reduxPage = useSelector(selectPage);
    const reduxTotalPages = useSelector(selectTotalPages);
    const reduxSelectedCategory = useSelector(selectSelectedCategory);
    const reduxSelectedArea = useSelector(selectSelectedArea);
    const reduxSelectedIngredients = useSelector(selectSelectedIngredients);

    const page = propPage ?? reduxPage;
    const totalPages = propTotalPages ?? reduxTotalPages;
    const selectedCategory = propCategory ?? reduxSelectedCategory;
    const selectedArea = propArea ?? reduxSelectedArea;
    const selectedIngredients = propIngredients ?? reduxSelectedIngredients;

    const loadPage = (targetPage) => {
        dispatch(setPage(targetPage));

        const commonPayload = { page: targetPage };

        switch (variant) {
            case 'owner':
                dispatch(fetchRecipes(commonPayload));
                break;
            case 'user':
                if (userId) {
                    dispatch(fetchRecipes({ ...commonPayload, userId }));
                } else {
                    console.warn('[Pagination] Missing userId for "user" variant');
                }
                break;
            case 'favorites':
                dispatch(fetchRecipes(commonPayload));
                break;
            case 'all':
            default:
                dispatch(
                    fetchRecipes({
                        ...commonPayload,
                        category: selectedCategory?.id ?? null,
                        area: selectedArea?.value ?? null,
                        ingredients: selectedIngredients?.map((i) => i.value) ?? [],
                    })
                );
                break;
        }
    };

    useEffect(() => {
        loadPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant, userId, selectedCategory, selectedArea, selectedIngredients]);

    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        if (typeof onPageChange === 'function') {
            onPageChange(newPage);
        }
        loadPage(newPage);
    };

    return (
        <div>
            {totalPages > 1 && (
                <ReactPaginate
                    previousLabel={null}
                    nextLabel={null}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    breakLabel="..."
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    containerClassName={css.paginationContainer}
                    pageClassName={css.paginationItem}
                    pageLinkClassName={css.pageLink}
                    activeClassName={css.paginationItemActive}
                    breakClassName={css.break}
                    breakLinkClassName={css.breakLink}
                    forcePage={page - 1}
                />
            )}
        </div>
    );
};

export default ListPagination;
