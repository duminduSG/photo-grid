import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from 'react-photo-gallery';
import Button from './Button';
import { moveStep } from '../store/action';
import { STEP } from '../store/types';

const UserGrid = () => {
    const dispatch = useDispatch();
    const { grid } = useSelector((state) => state);

    return (
        <div>
            <div>
                <div>My Grid</div>
                <Button
                    onClick={() => {
                        localStorage.removeItem('grid');
                        dispatch(moveStep(STEP.GALLERY));
                    }}>
                    {' '}
                    Edit{' '}
                </Button>
            </div>
            <Gallery photos={grid} />
        </div>
    );
};

export default UserGrid;
