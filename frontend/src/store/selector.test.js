import { Selector } from 'redux-testkit';
import { getSelectedImages, getSelectedImagesSize } from './selector'
import { STEP } from "./types";

describe('selectors ', () => {
    let state;
    const id = 204900001;
    const gridObject = {
        id,
        'picture': 'https://placeimg.com/2560/2560/any',
        'width': 200,
        'height': 200,
        'isSelected': true
    };

    beforeEach(() => {
        state = {
            images: [gridObject],
            errors: {},
            isLoading: false,
            step: STEP.GALLERY,
            grid: [gridObject]
        }
        jest.resetAllMocks();
    });

    it('getSelectedImages', () => {
        const result = Selector(getSelectedImages).execute(state);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(gridObject);
    });

    it('getSelectedImagesSize', () => {
        const result = Selector(getSelectedImagesSize).execute(state);
        expect(result).toBe(1);
    });
});
