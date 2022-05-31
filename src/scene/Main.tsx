import Phaser from "phaser";
import React, { useEffect, useState } from "react";

let game: Phaser.Game | undefined = undefined;

interface MainType {
  someState: any;
  scene: any;
}

export const Phaser3GameComponent = ({ someState, scene }: MainType) => {
  // Optional: useful to delay appearance and avoid canvas flicker.
  const [isReady, setReady] = useState(false);
  /*
  // Just an example... do what you do here. 
  const dataService = (changedState) => {
    // I'm not sure how to use stores, but you'll know better what to do here.
    store.dispatch(
      {
        ...someState,
        ...changedState,
      },
      { type: ACTION_TYPE }
    )
  }
  */
  // This is where the fun starts.
  useEffect(() => {
    const config = {
      callbacks: {
        preBoot: (game) => {
          // A good way to get data state into the game.
          game.registry.merge(someState);
          // This is a good way to catch when that data changes.
          game.registry.events.on(
            "changedata",
            (_par, _key, _val, _prevVal) => {
              // Simply call whatever functions you want outside.
              // dataService({ [key]: val });
            }
          );
        },
      },
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 450 },
          debug: true,
        },
      },
      scene: [scene],
    };
    game = new Phaser.Game(config);
    // Triggered when game is fully READY.
    game.events.on("READY", setReady);
    // If you don't do this, you get duplicates of the canvas piling up.
    return () => {
      setReady(false);
      if (game) game.destroy(true);
    };
  }, []); // Keep the empty array otherwise the game will restart on every render.

  const handleClick = () => {
    const scene = game && game.scene.keys.helloworld;
    if (scene && scene.createEmitter) scene.createEmitter();
  };

  return (
    <>
      <div id="phaser-example" className={isReady ? "visible" : "invisible"} />
      <button type="button" onClick={handleClick}>
        Phaser Button
      </button>
    </>
  );
};
