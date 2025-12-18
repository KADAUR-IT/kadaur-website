import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowTrendDown, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface MetricProps {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | null;
    icon?: IconProp
}

export default function Metric({label, value, trend = null, icon}: MetricProps)
{
    const trendRender = () => {
        return(
            <span className={`metric-trend ${trend ?? "hidden"}`}>{(trend && trend === 'up') ? <FontAwesomeIcon icon={faArrowTrendUp} /> : <FontAwesomeIcon icon={faArrowTrendDown} />}</span>
        )
    }

    return(
        <div className="metrics-card">
            <p>{label}</p>
            <p className="value-metric">{value} {trendRender()}</p>
            {icon && <FontAwesomeIcon icon={icon} className="metric-icon" />}
        </div>
    )
}