import * as _ from 'lodash';
import {
    FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_ERROR,
    TOGGLE_IMAGE,
    STEP,
    MOVE_STEP,
    SAVE_GRID,
    SAVE_GRID_ERROR,
    SAVE_GRID_SUCCESS
} from './types';

const initialState = {
    images: [],
    errors: {},
    isLoading: false,
    step: STEP.GALLERY,
    grid: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_GRID:
        case FETCH_IMAGES: {
            return {
                ...state,
                isLoading: true
            };
        }

        case FETCH_IMAGES_SUCCESS: {
            const data = _.cloneDeep(state);
            data.images = action.payload;
            data.errors = {};
            data.isLoading = false;
            return { ...data };
        }

        case SAVE_GRID_ERROR:
        case FETCH_IMAGES_ERROR: {
            const data = _.cloneDeep(state);
            data.errors = action.payload;
            data.isLoading = false;
            return { ...data };
        }

        case TOGGLE_IMAGE: {
            const { images, ...rest } = _.cloneDeep(state);
            const updatedImages = images.map((image) => {
                if (image.id === action.payload.id) {
                    return { ...image, isSelected: !image.isSelected };
                }
                return { ...image };
            });
            return { ...rest, images: updatedImages };
        }

        case MOVE_STEP: {
            const data = _.cloneDeep(state);
            data.step = action.payload.step;
            return { ...data };
        }

        case SAVE_GRID_SUCCESS: {
            const data = _.cloneDeep(state);
            data.grid = action.payload;
            data.errors = {};
            data.isLoading = false;
            return { ...data };
        }

        default: {
            return state;
        }
    }
}
