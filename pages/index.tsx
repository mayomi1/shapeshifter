import {useState} from "react";
import Head from 'next/head';
import { SketchPicker } from 'react-color';

import styles from '../styles/Home.module.css'
import {SHAPES} from "../constant";
import {useFormSubmission} from "../lib/useForm";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [generatedShapes, setGeneratedShapes] = useState([]);

  const generateShape = (payload) => {
    generatedShapes.push({
      shape: payload.shape, width: payload.width, height: payload.height, color: selectedColor
    })
  };

  console.log(generatedShapes);

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

          <form onSubmit={(e) => submit(e, (payload) => generateShape(payload))}>
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
            </div>
          </form>


          {/*show shape*/}
          <div>
            {
              generatedShapes.map((generatedShape: any, i) => (
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
        }
        
        .rectangle {
          width: ${width}px;
          height: ${height}px;
          background: ${color};
        }
        
        .circle {
          width: ${width}px;
          height: ${width}px;
          background: ${color};
          border-radius: 50%
        }
      `}</style>
    </div>
  )
}
