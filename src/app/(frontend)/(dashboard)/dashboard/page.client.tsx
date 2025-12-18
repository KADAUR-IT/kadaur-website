'use client'

import React, { useEffect } from "react";

export default function DashboardClientPage({ metrics }: { metrics: any })
{
    return(
        <div className="dashboard-home">
            <h1>Dashboard</h1>
            <div className="dashboard-metrics">
                <div className="metrics-card">
                    <p>Utilisateurs actifs</p>
                    <p className="value-metric">10</p>
                </div>
                <div className="metrics-card">
                    <p>Utilisateurs actifs</p>
                    <p className="value-metric">10</p>
                </div>
                <div className="metrics-card">
                    <p>Utilisateurs actifs</p>
                    <p className="value-metric">10</p>
                </div>
                <div className="metrics-card">
                    <p>Utilisateurs actifs</p>
                    <p className="value-metric">10</p>
                </div>
            </div>
        </div>
    )
}