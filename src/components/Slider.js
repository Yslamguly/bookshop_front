import React, { useLayoutEffect, useState } from "react";
import "../style/slider.css";

const thumbsize = 10;

export const Slider = (props) => {
    const [avg, setAvg] = useState((props.min + props.max) / 2);

    const width = 200;
    const minWidth =
        thumbsize + ((avg - props.min) / (props.max - props.min)) * (width - 2 * thumbsize);
    const minPercent = ((props.priceFrom - props.min) / (avg - props.min)) * 100;
    const maxPercent = ((props.priceTo - avg) / (props.max - avg)) * 100;
    const styles = {
        min: {
            width: minWidth,
            left: 0,
            "--minRangePercent": `${minPercent}%`
        },
        max: {
            width: thumbsize + ((props.max - avg) / (props.max - props.min)) * (width - 2 * thumbsize),
            left: minWidth,
            "--maxRangePercent": `${maxPercent}%`
        }
    };

    useLayoutEffect(() => {
        setAvg((props.priceTo + props.priceFrom) / 2);
    }, [props.priceFrom, props.priceTo]);
    return (
        <div className="min-max-slider">
            <span className="float-left pt-2">{Math.round(props.priceFrom) + "$"}</span>
            <label htmlFor="min">{props.min}</label>
            <input
                id="min"
                className="min"
                style={styles.min}
                name="min"
                type="range"
                step="1"
                min={props.min}
                max={avg}
                value={props.priceFrom}
                onChange={({target})=>props.setPriceFrom(Math.round(Number(target.value)))}
            />
            <span className="float-right pt-2">{Math.round(props.priceTo) + "$"}</span>
            <label htmlFor="max">{props.max}</label>
            <input
                id="max"
                className="max"
                style={styles.max}
                name="max"
                type="range"
                step="1"
                min={avg}
                max={props.max}
                value={props.priceTo}
                onChange={({ target }) => props.setPriceTo(Math.round(Number(target.value)))}
            />
        </div>
    );
};
