import { createSelector } from 'reselect';

export const getSelectedImages = (state) => state.images.filter((image) => image.isSelected);

export const getSelectedImagesSize = createSelector(getSelectedImages, (images) => images.length);
