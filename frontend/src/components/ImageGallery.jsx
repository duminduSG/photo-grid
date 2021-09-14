import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gallery from 'react-photo-gallery';
import * as _ from 'lodash';
import { moveStep } from '../store/action';
import SelectedImage from './SelectedImage';
import { getSelectedImagesSize } from '../store/selector';
import Button from './Button';
import config from '../config';
import { STEP } from '../store/types';

const ImageGallery = () => {
    const dispatch = useDispatch();
    const { images, grid } = useSelector((state) => state);
    const photos = _.merge(images, grid);
    const selectImagesLength = useSelector((state) => getSelectedImagesSize(state));

    const imageRenderer = ({ index, left, top, photo }) => (
        <SelectedImage
            selected={photo.isSelected}
            key={photo.id}
            margin="2px"
            index={index}
            photo={photo}
            left={left}
            top={top}
            selectImagesLength={selectImagesLength}
        />
    );

    return (
        <>
            <Button
                onClick={() => dispatch(moveStep(STEP.SORTABLE_GRID))}
                disabled={selectImagesLength !== config.gridSize}>
                {' '}
                Next{' '}
            </Button>
            <Gallery photos={photos} renderImage={imageRenderer} />
        </>
    );
};

export default ImageGallery;
