import React from "react";

export const getColor = props => {
    const { map, id, i ,j} = props;
    const ownTeam = map.teams.filter(team => team.teamID === id)[0],
        opponentTeam = map.teams.filter(team => team.teamId !== id)[0];

    if (map.tiled[i][j] === 0) return 'white';

    if (id === map.tiled[i][j]) {
        ownTeam.agents.forEach(agent => {
            if (agent.x === j - 1 && agent.y === i - 1) return '#7ecb20';
        });
        return '#b2ff59';
    } else {
        opponentTeam.agents.forEach(agent => {
            if (agent.x === j - 1 && agent.y === i-1) return '#c50e29';
        });
        return '#ff5252';
    }
};

export const RenderMap = props => {
    const { id, map } = props.AppReducers;
    const width = map.width, height = map.height;
    let ResTable = [];
    for (let i = 0 ; i < height ; i ++) {
        let Column = [];
        for (let j = 0 ; j < width ; j ++) {
            const element = (
                <th key={j} style={{
                    backgroundColor: getColor({id, map, i , j}),
                    color: 'blue'
                }}>
                    {map.points[i][j]}
                </th>
            );
            Column.push(element)
        }
        ResTable.push(Column);
    }
    return ResTable;
};