import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gallery from 'react-photo-gallery';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { getSelectedImages } from '../store/selector';
import Photo from './Photo';
import { moveStep, saveGrid } from '../store/action';
import { STEP } from '../store/types';
import Button from './Button';

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={(props) => <SortablePhoto {...props} />} />
));

const SortableGrid = () => {
    const dispatch = useDispatch();
    const selectedImages = useSelector((state) => getSelectedImages(state));
    const [sortedImages, setSortedImages] = useState(selectedImages);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setSortedImages(arrayMove(sortedImages, oldIndex, newIndex));
    };

    return (
        <div>
            <Button onClick={() => dispatch(moveStep(STEP.GALLERY))}> Back </Button>
            <Button onClick={() => dispatch(saveGrid(sortedImages))}> Save </Button>
            <SortableGallery items={sortedImages} onSortEnd={onSortEnd} axis="xy" />
        </div>
    );
};

export default SortableGrid;
