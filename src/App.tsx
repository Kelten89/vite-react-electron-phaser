import { useState } from "react";

import { Phaser3GameComponent } from "./scene/Main";
import PlatformerScene from "./scene/PlatformerScene";
import ExampleScene from "./scene/ExampleScene";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Phaser3GameComponent someState={undefined} scene={PlatformerScene} />
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
    </div>
  );
}

export default App;
