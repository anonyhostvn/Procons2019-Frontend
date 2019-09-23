export const setNewActions = (prevActions, newActions) => {
    const result = prevActions.filter(item => item.agentID !== newActions.agentID);
    return [
        ...result,
        newActions
    ]
};