import React, { useState } from "react";
import Head from 'next/head';
import { SketchPicker } from 'react-color';

import styles from './shapeShifter.module.scss';
import { SHAPES, storageKeys } from "../../constant";
import { useFormSubmission } from "../../lib/useForm";
import { Shape } from "../../components/Shapes";
import Header from "../../components/Header";
import {composeClasses} from "../../lib/utils";

let savedShaped;

export interface IShape {
  shape: string;
  width: string;
  height?: string;
  color: string;
}

if (typeof window !== "undefined") {
  savedShaped = window.localStorage.getItem(storageKeys.shapes)
}

const Home: React.FC<{}> = () => {
  const shapes = savedShaped && JSON.parse(savedShaped) || [];
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Shape shifter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Header />

          <section className={styles.content}>
            <ShapeDescription shapes={shapes} />
            <ShapeView shapes={shapes} />
          </section>
        </main>
      </div>
    </>
  )
};

const ShapeDescription: React.FC<{shapes: IShape[]}> = ({shapes}) => {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [error, setError] = useState('');

  const generateShape = (payload) => {
    if (!selectedColor) {
      setError('Please choose a color');
      return
    }
    const generatedShapes = [];
    generatedShapes.push({
      shape: payload.shape, width: payload.width, height: payload.height, color: selectedColor
    });

    const toSave = generatedShapes.concat(shapes);
    window.localStorage.setItem(storageKeys.shapes, JSON.stringify(toSave));

    window.location.reload();
  };

  const clearShape = () => {
    window.localStorage.removeItem(storageKeys.shapes);
    window.location.reload();
  };

  const {submit} = useFormSubmission();

  const [selectedShape, setSelectedShape] = useState('');

  return (
    <div className={styles.shapeDescriptions}>
      <h3>Enter your shape descriptions (<em>All units are in pixels(px)</em>)</h3>

      <form
        onSubmit={(e) => submit(e, (payload) => generateShape(payload))}
        onReset={() => clearShape()}
      >
        <div>
          <div>
            <label className={styles.label}>Shape type</label>
            <div className={styles.selectionInput}>
              <select name='shape' onChange={(e) => setSelectedShape(e.target.value)}>
                <option value=''>Choose shape</option>
                {
                  SHAPES.map((shape, i) => (
                    <option key={i} value={shape.value}>{shape.label}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {
            selectedShape !== '' && (selectedShape === 'circle' ?
              <div>
                <label className={styles.label}>Radius</label>
                <div className={styles.selectionInput}>
                  <input name='width' placeholder='enter the Radius' />
                </div>
              </div>
              :
              selectedShape === 'square' ?
                <div>
                  <label className={styles.label}>Width</label>
                  <div className={styles.selectionInput}>
                      <input name='width' placeholder='enter the width' />
                  </div>
                </div>
                :
                <>
                  <div>
                    <label className={styles.label}>Width</label>
                    <div className={styles.selectionInput}>
                      <input name='width' placeholder='enter the width' />
                    </div>
                  </div>

                  <div>
                    <label className={styles.label}>Height</label>
                    <div className={styles.selectionInput}>
                      <input name='height' placeholder='enter the height'/>
                    </div>
                  </div>
                </>)
          }

          {
            selectedShape !== '' &&
              <>
                <div>
                  <label className={styles.label}>Pick colour</label>
                  <SketchPicker
                      color={selectedColor}
                      onChangeComplete={(selectedColor) => setSelectedColor(selectedColor.hex)}
                  />
                </div>

                {
                  error !== '' && <div className={styles.errorMsg}>{error}</div>
                }

                <div className={styles.btnWrapper}>
                  <button type='submit' className={composeClasses(styles.primaryBtn, styles.marginRight10)}>Generate</button>
                  <button type='reset' className={styles.secondaryBtn}>Clear</button>
                </div>
              </>
          }

        </div>
      </form>

    </div>
  )
}

const ShapeView: React.FC<{shapes: IShape[]}> = ({shapes}) => {
  return (
    <div className={styles.shapeView}>
      {
        Array.isArray(shapes) && shapes?.map((generatedShape: any, i) => (
          <Shape
            key={i}
            width={generatedShape.width}
            height={generatedShape.height}
            color={generatedShape.color}
            shape={generatedShape.shape}
          />
        ))
      }
    </div>
  )
}

export default Home;


