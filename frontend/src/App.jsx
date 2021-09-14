import React, { useEffect } from 'react';
import './App.css';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useSelector, useDispatch } from 'react-redux';
import SortableGrid from './components/SortableGrid';
import ImageGallery from './components/ImageGallery';
import { STEP } from './store/types';
import UserGrid from './components/UserGrid';
import { fetchImages, keepGrid, moveStep } from './store/action';

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
};

function App() {
    const { isLoading, step } = useSelector((state) => state);
    const dispatch = useDispatch();
    const savedGrid = localStorage.getItem('grid');

    useEffect(() => {
        if (savedGrid) {
            dispatch(keepGrid(JSON.parse(savedGrid)));
            dispatch(moveStep(STEP.USER_GRID));
        }
    }, []);

    useEffect(() => {
        if (step === STEP.GALLERY && !savedGrid) {
            dispatch(fetchImages());
        }
    }, [step]);

    const renderSwitch = () => {
        switch (step) {
            case STEP.GALLERY:
                return <ImageGallery />;
            case STEP.SORTABLE_GRID:
                return <SortableGrid />;
            case STEP.USER_GRID:
                return <UserGrid />;
            default:
                return <div>Something went wrong.</div>;
        }
    };

    return (
        <div className="App">
            <Provider template={AlertTemplate} {...options}>
                {isLoading ? <div>Loading...</div> : renderSwitch()}
            </Provider>
        </div>
    );
}

export default App;
