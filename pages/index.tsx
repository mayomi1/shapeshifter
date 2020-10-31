import {useEffect, useState} from "react";
import Head from 'next/head';
import { SketchPicker } from 'react-color';

import styles from '../styles/Home.module.css'
import {SHAPES, storageKeys} from "../constant";
import {useFormSubmission} from "../lib/useForm";


let savedShaped;

if (typeof window !== "undefined") {
  savedShaped = window.localStorage.getItem(storageKeys.shapes)
}
export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [generatedShapes, setGeneratedShapes] = useState([]);


  const theShapes = savedShaped && JSON.parse(savedShaped) || [];

  const generateShape = (payload) => {
    generatedShapes.push({
      shape: payload.shape, width: payload.width, height: payload.height, color: selectedColor
    })
    const toSave = generatedShapes.concat(theShapes)
    window.localStorage.setItem(storageKeys.shapes, JSON.stringify(toSave));

    window.location.reload();
  };

  const clearShape = () => {
    window.localStorage.removeItem(storageKeys.shapes);
    window.location.reload();
  }
  const {submit} = useFormSubmission();
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Shape shifter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to shape shifter
          </h1>

          <form onSubmit={(e) => submit(e, (payload) => generateShape(payload))}
                onReset={() => clearShape()}
          >
            <div>
              <div>
                <label>Shape type</label>
                <select name='shape'>
                  <option value='Choose shape'>Choose shape</option>
                  {
                    SHAPES.map((shape, i) => (
                      <option key={i} value={shape.value}>{shape.label}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label>Width</label>
                <input name='width' />
              </div>

              <div>
                <label>Height</label>
                <input name='height' />
              </div>

              <div>
                <label>Pick colour</label>
                <SketchPicker
                  color={selectedColor}
                  onChangeComplete={(selectedColor) => setSelectedColor(selectedColor.hex)}
                />
              </div>

              <button type='submit'>Generate Shape</button>
              <button type='reset'>Clear shapes</button>
            </div>
          </form>


          {/*show shape*/}
          <div>
            {
              Array.isArray(theShapes) && theShapes?.map((generatedShape: any, i) => (
                <Shape
                  width={generatedShape.width}
                  height={generatedShape.height}
                  color={generatedShape.color}
                  shape={generatedShape.shape}
                />
              ))
            }
          </div>
        </main>
      </div>
    </>
  )
}

const Shape = ({width, height, color, shape}) => {
  return (
    <div className={shape}>

      {/* dynamics styling */}
      <style jsx>{`
        .square {
          width: ${width}px;
          height: ${height}px;
          background: ${color};
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        .rectangle {
          width: ${width}px;
          height: ${height}px;
          background: ${color};
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        .circle {
          width: ${width}px;
          height: ${width}px;
          background: ${color};
          border-radius: 50%;
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        @keyframes easeIn {
          0% { 
            width: 0;
            height: 0;
          }
          100% {
           width: ${width}px;
           height: ${height}px;
          }
        }
        
        
        
        
      `}</style>
    </div>
  )
}
