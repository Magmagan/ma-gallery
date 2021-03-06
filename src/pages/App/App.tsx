import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import ImageViewer from '../../components/ImageViewer';
import {
  nextImage,
  previousImage,
} from '../../store/actions';
import { State } from '../../store';
import './App.css';

interface IProps {
  currentFile: string,
  directoryFiles: string[],
  imageNumber: number,

  nextImage: () => object,
  previousImage: () => object,
}

class App extends React.Component<IProps> {
  public keyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft': {
        this.changeImageToLeft();
        break;
      }
      case 'ArrowRight': {
        this.changeImageToRight();
        break;
      }
      default: {
        break;
      }
    }
  }

  public changeImageToRight = () => {
    const { props } = this;
    props.nextImage();
  }

  public changeImageToLeft = () => {
    const { props } = this;
    props.previousImage();
  }

  public render() {
    return (
      <main
        className='App'
        onKeyDown={this.keyPress}
        tabIndex={0}
      >
        <Toolbar />
        <ImageViewer />
      </main>
    );
  }
}

const MappedState = (state: State) => ({
  currentFile: state.currentFile,
  directoryFiles: state.directoryFiles,
  imageNumber: state.index,
});

const MappedActions = {
  nextImage,
  previousImage,
};

export default connect(
  MappedState,
  MappedActions,
)(App);
