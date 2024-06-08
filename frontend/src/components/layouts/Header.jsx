import React from "react";

const Header = () => {
  function googleOnclick() {}

  return (
    <header>
      <h1>Header</h1>
      <button onClick={googleOnclick}>Google</button>
    </header>
  );
};

export default Header;
