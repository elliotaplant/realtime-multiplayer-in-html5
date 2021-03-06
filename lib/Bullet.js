'use strict';

const uuid = require('node-uuid');

function Bullet ({ firedBy, speed = 220, distance = 500 }) {
    const id = uuid.v4();
    let { x, y } = firedBy.getPosition();
    const angle = firedBy.getAngle();
    let travelledDistance = 0;
    let dead = false;

    function update (delta) {
        if (travelledDistance >= distance) {
            dead = true;
        } else {
            travelledDistance += speed * (delta / 1000);
            x += speed * Math.cos(angle) * (delta / 1000);
            y += speed * Math.sin(angle) * (delta / 1000);
        }
    }

    function getId () {
        return id;
    }

    function isDead () {
        return dead;
    }

    function getFiredBy () {
        return firedBy;
    }

    function getPosition () {
        return {
            x,
            y
        };
    }

    function toJSON () {
        return {
            id,
            x,
            y,
            dead,
            angle,
            speed
        };
    }

    return Object.freeze({
        update,
        getFiredBy,
        getPosition,
        getId,
        isDead,
        toJSON
    });
}

module.exports = { create: Bullet };
