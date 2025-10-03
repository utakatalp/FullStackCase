export const initialState = {
    items: [],
    selectedColors: {},
    loading: false,
    error: null,
    carouselIndex: 0,
};

export const ACTIONS = {
    FETCH_ITEMS_START: "FETCH_ITEMS_START",
    FETCH_ITEMS_SUCCESS: "FETCH_ITEMS_SUCCESS",
    FETCH_ITEMS_ERROR: "FETCH_ITEMS_ERROR",
    SELECT_ITEM_COLOR: "SELECT_ITEM_COLOR",
    SET_CAROUSEL_INDEX: "SET_CAROUSEL_INDEX",
};

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_ITEMS_START:
            return { ...state,
                 loading: true, 
                 error: null, 
                 items: [] };
        case ACTIONS.FETCH_ITEMS_SUCCESS:
            return { ...state,
                  loading: false,
                  items: action.payload };
        case ACTIONS.FETCH_ITEMS_ERROR:
            return { ...state, loading: false, error: action.payload };
        case ACTIONS.SELECT_ITEM_COLOR:
            return {
                ...state,
                selectedColors: {
                    ...state.selectedColors,
                    [action.payload.itemName]: action.payload.color,
                }
            }
        case ACTIONS.SET_CAROUSEL_INDEX:
            return { ...state, carouselIndex: action.payload}
        default:
            return state;
    }
}
