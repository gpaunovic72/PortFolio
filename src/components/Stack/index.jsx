import stackList from "../../data/stackList";
import "../Stack/Stack.scss";

export default function Stack() {
  return (
    <div className="stack">
      <h2 className="stack__title">STACK</h2>
      <hr className="stack__separation" />
      <div className="stack__cards">
        {stackList.map((item) => (
          <div className="stack__cards--onCard" key={item.id}>
            <img src={item.icon} alt={item.name} className="icon" />
            <p className="text">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
