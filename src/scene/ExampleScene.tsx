import Phaser from "phaser";
import React, { useEffect, useState } from "react";

/** @tutorial I made this! This answers how you get your image. */
import logoImage from "/Warframe0000.jpg";

export default class ExampleScene extends Phaser.Scene {
  constructor() {
    super("ExampleScene");
  }

  preload() {
    // this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("background", logoImage);
    this.load.image(
      "logo",
      "https://labs.phaser.io/assets/sprites/phaser3-logo.png"
    );
    this.load.image("red", "https://labs.phaser.io/assets/particles/red.png");
  }

  create() {
    // You made this!
    const text = this.add.text(250, 250, "Phaser");
    text.setInteractive({ useHandCursor: true });
    this.add.image(200, 200, "background");
    /** @tutorial I made this! */
    // Get all that lovely dataState into your scene,
    let { clickCount } = this.registry.getAll();
    text.on("pointerup", () => {
      // This will trigger the "changedata" event handled by the component.
      this.registry.merge({ clickCount: clickCount++ });
    });
    // This will trigger the scene as now being ready.
    this.game.events.emit("READY", true);
  }

  createEmitter() {
    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });
    console.log(this);

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
