import { useCallback, useEffect, useReducer } from "react";
import { reducer, initialState, ACTIONS } from "../../app/store";
import { itemsRepository } from "../../data/repository/itemsRepository.js";

export function useCatalogData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const runQuery = useCallback(
    async (queryFn) => {
      dispatch({ type: ACTIONS.FETCH_ITEMS_START });
      try {
        const items = await queryFn();
        dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, payload: items });
      } catch (err) {
        dispatch({ type: ACTIONS.FETCH_ITEMS_ERROR, payload: err.message });
      }
    },
    [dispatch],
  );

  const filterByPopularity = useCallback(() => {
    return runQuery(() => itemsRepository.getByPopularity());
  }, [runQuery]);

  const filterByPriceRange = useCallback(
    (min, max) => {
      return runQuery(() => itemsRepository.getByPriceRange(min, max));
    },
    [runQuery],
  );

  useEffect(() => {
    runQuery(() => itemsRepository.getAll());
  }, [runQuery]);

  return {
    state,
    dispatch,
    filterByPopularity,
    filterByPriceRange,
  };
}

export default useCatalogData;
