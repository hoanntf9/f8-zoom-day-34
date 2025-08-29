function Counter() {
  const [count, setCount] = React.useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return <>
    <h1 className="counter-heading">Counter App</h1>

    {/* Cách 1: Sử dụng style với điều kiện */}
    <div style={{ color: count > 0 ? "green" : count < 0 ? "red" : "gray" }}>
      <p>Count: {count}</p>
      <div>{count > 0 ? "Dương" : count < 0 ? "Âm" : "Bằng không"}</div>
    </div>

    {/* Cách 2: Sử dụng class với điều kiện */}
    {/* <div className={count > 0 ? "positive" : count < 0 ? "negative" : "zero"}>
      Count: {count}
      <div>{count > 0 ? "Dương" : count < 0 ? "Âm" : "Bằng không"}</div>
    </div> */}

    <div className="button-wrapper">
      <button onClick={decrease}>Giảm (-1)</button>
      <button onClick={reset}>Reset (0)</button>
      <button onClick={increase}>Tăng (+1)</button>
    </div>
  </>;
}

const app = <Counter />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);