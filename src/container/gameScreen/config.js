export const movingConstant = {
    move: "move",
    stay: "stay",
    remove: "remove",
    Left: {
        name: "Left",
        move: {
            dx: -1,
            dy: 0
        }
    },
    Right: {
        name: "Right",
        move: {
            dx: 1,
            dy: 0
        }
    },
    Up: {
        name: "Up",
        move: {
            dx: 0,
            dy: -1
        }
    },
    Down: {
        name: "Down",
        move: {
            dx: 0,
            dy: 1
        }
    },
    LeftDown: {
        name: "LeftDown",
        move: {
            dx: -1,
            dy: 1
        }
    },
    RightDown: {
        name: "RightDown",
        move: {
            dx: 1,
            dy: 1
        }
    },
    LeftUp: {
        name: "LeftUp",
        move: {
            dx: -1,
            dy: -1
        }
    },
    RightUp: {
        name: "RightUp",
        move: {
            dx: 1,
            dy: -1
        }
    }
};

export const convertRequest = (rawAction) => {
    const d = (rawAction) => {
        if (rawAction.type === movingConstant.stay) return {};
        console.log(rawAction.direction);
        switch (rawAction.direction) {
            case movingConstant.LeftUp.name:
                return movingConstant.LeftUp.move;

            case movingConstant.Up.name:
                return movingConstant.Up.move;

            case movingConstant.RightUp.name:
                return movingConstant.RightUp.move;

            case movingConstant.Left.name:
                return movingConstant.Left.move;

            case movingConstant.Right.name:
                return  movingConstant.Right.move;

            case movingConstant.LeftDown.name:
                return movingConstant.LeftDown.move;

            case movingConstant.Down.name:
                return movingConstant.Down.move;

            case movingConstant.RightDown.name:
                return movingConstant.RightDown.move
            default:
                return {};
        }
    };
    return {
        agentID: rawAction.agentID,
        type: rawAction.type,
        ...d(rawAction)
    }
};