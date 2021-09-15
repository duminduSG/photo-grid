import { Thunk } from 'redux-testkit';
import axios from "axios";
import { toggleImage, moveStep, keepGrid, saveGrid, fetchImages} from './action';
import {
    STEP,
    TOGGLE_IMAGE,
    MOVE_STEP,
    SAVE_GRID_SUCCESS,
    FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS,
    SAVE_GRID,
    SAVE_GRID_ERROR, FETCH_IMAGES_ERROR
} from './types';

jest.mock('axios');

describe('actions', () => {
    let state = null;
    const id = 204900001;
    const gridObject = {
        id,
        'picture': 'https://placeimg.com/2560/2560/any',
        'width': 200,
        'height': 200
    };
    beforeEach(() => {
        state = { images: [],
            errors: {},
            isLoading: false,
            step: STEP.GALLERY,
            grid: []
        };
        jest.resetAllMocks();
    });

    it('toggleImage', async () => {
        const dispatches = await Thunk(toggleImage)
            .withState(state)
            .execute(id);
        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual({
            type: TOGGLE_IMAGE,
            payload: { id }
        });
    });

    it('moveStep', async () => {
        const dispatches = await Thunk(moveStep)
            .withState(state)
            .execute(STEP.SORTABLE_GRID);
        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual({
            type: MOVE_STEP,
            payload: { step: STEP.SORTABLE_GRID }
        });
    });

    it('keepGrid', async () => {
        const dispatches = await Thunk(keepGrid)
            .withState(state)
            .execute([]);
        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual({
            type: SAVE_GRID_SUCCESS,
            payload: []
        });
    });

    describe('fetchImages', () => {
        it('when success', async () => {
            axios.get.mockResolvedValueOnce({ data: [gridObject]});
            const dispatches = await Thunk(fetchImages)
                .withState(state)
                .execute();
            expect(dispatches.length).toBe(2);
            expect(dispatches[0].getAction()).toEqual({type: FETCH_IMAGES});
            expect(dispatches[1].getAction()).toEqual({
                type: FETCH_IMAGES_SUCCESS,
                payload: [gridObject]
            });
        });

        it('when fail', async () => {
            axios.get.mockImplementation(new Error('Error'));
            const dispatches = await Thunk(fetchImages)
                .withState(state)
                .execute();
            expect(dispatches.length).toBe(2);
            expect(dispatches[0].getAction()).toEqual({type: FETCH_IMAGES});
            expect(dispatches[1].getAction()).toEqual({type: FETCH_IMAGES_ERROR});
        });
    });

    describe('saveGrid', () => {
        it('when success', async () => {
            axios.post.mockResolvedValueOnce({ data: {grid: [gridObject] }});
            const dispatches = await Thunk(saveGrid)
                .withState(state)
                .execute([gridObject]);
            expect(dispatches.length).toBe(3);
            expect(dispatches[0].getAction()).toEqual({type: SAVE_GRID});
            expect(dispatches[1].isFunction()).toBeTruthy();
            expect(dispatches[2].isFunction()).toBeTruthy();

        });

        it('when fail', async () => {
            axios.post.mockResolvedValueOnce(new Error('Error'));
            const dispatches = await Thunk(saveGrid)
                .withState(state)
                .execute([gridObject]);
            expect(dispatches.length).toBe(2);
            expect(dispatches[0].getAction()).toEqual({type: SAVE_GRID});
            expect(dispatches[1].getAction()).toEqual({type: SAVE_GRID_ERROR});

        });
    });
});
