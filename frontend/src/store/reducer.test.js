import { Reducer } from 'redux-testkit';

import {
    FETCH_IMAGES_ERROR,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES,
    TOGGLE_IMAGE,
    MOVE_STEP,
    SAVE_GRID,
    SAVE_GRID_SUCCESS,
    SAVE_GRID_ERROR, STEP
} from './types';
import reducer from './reducer';


describe('reducers', () => {

    let initialState;
    const id = 204900001;
    const gridObject = {
        id,
        'picture': 'https://placeimg.com/2560/2560/any',
        'width': 200,
        'height': 200,
        'isSelected': false
    };
    const errorObject = { error: 'Error' };

    beforeEach(() => {
        initialState = {
            images: [gridObject],
            errors: {},
            isLoading: false,
            step: STEP.GALLERY,
            grid: [gridObject]
        };
        jest.resetAllMocks();
    });

    it('SAVE_GRID', () => {
        Reducer(reducer).expect({ type: SAVE_GRID})
            .toChangeInState({ isLoading: true });
    });

    it('FETCH_IMAGES', () => {
        Reducer(reducer).expect({ type: FETCH_IMAGES})
            .toChangeInState({ isLoading: true });
    });

    it('FETCH_IMAGES_SUCCESS', () => {
        Reducer(reducer).expect({ type: FETCH_IMAGES_SUCCESS, payload: [gridObject]})
            .toChangeInState({ images: [gridObject] });
    });

    it('SAVE_GRID_ERROR', () => {
        Reducer(reducer).expect({ type: SAVE_GRID_ERROR, payload: errorObject})
            .toChangeInState({ errors: errorObject });
    });

    it('FETCH_IMAGES_ERROR', () => {
        Reducer(reducer).expect({ type: FETCH_IMAGES_ERROR, payload: errorObject})
            .toChangeInState({ errors: errorObject });
    });

    it('TOGGLE_IMAGE', () => {
        Reducer(reducer).withState(initialState).expect({ type: TOGGLE_IMAGE, payload: { id }})
            .toReturnState({ ...initialState, images: [{...gridObject, isSelected: true}] });
    });

    it('MOVE_STEP', () => {
        Reducer(reducer).expect({ type: MOVE_STEP, payload: { step: STEP.USER_GRID}})
            .toChangeInState({ step: STEP.USER_GRID });
    });

    it('SAVE_GRID_SUCCESS', () => {
        Reducer(reducer).expect({ type: SAVE_GRID_SUCCESS, payload: [gridObject]})
            .toChangeInState({ grid: [gridObject] });
    });

});
