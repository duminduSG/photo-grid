import { get, post } from '../helpers/api-helper';
import config from '../config';
import {
    FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_ERROR,
    TOGGLE_IMAGE,
    MOVE_STEP,
    SAVE_GRID,
    SAVE_GRID_ERROR,
    SAVE_GRID_SUCCESS,
    STEP
} from './types';

export const fetchImages = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_IMAGES });

        const { data } = await get(`${config.backendUrl}/images`);

        dispatch({
            type: FETCH_IMAGES_SUCCESS,
            payload: data
        });
    } catch (e) {
        dispatch({ type: FETCH_IMAGES_ERROR });
    }
};

export const toggleImage = (id) => (dispatch) => {
    dispatch({ type: TOGGLE_IMAGE, payload: { id } });
};

export const moveStep = (step) => (dispatch) => {
    dispatch({ type: MOVE_STEP, payload: { step } });
};

export const editGrid = () => (dispatch) => {
    dispatch(moveStep(STEP.GALLERY));
};

export const keepGrid = (grid) => (dispatch) => {
    dispatch({ type: SAVE_GRID_SUCCESS, payload: grid });
};

export const saveGrid = (sortedImages) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_GRID });

        const {
            data: { grid }
        } = await post(`${config.backendUrl}/grid`, sortedImages);
        const formattedGrid = grid.map(({ _id, ...rest }) => ({ ...rest, isSelected: true }));

        await dispatch(keepGrid(formattedGrid));

        localStorage.setItem('grid', JSON.stringify(formattedGrid));

        dispatch(moveStep(STEP.USER_GRID));
    } catch (e) {
        dispatch({ type: SAVE_GRID_ERROR });
    }
};
