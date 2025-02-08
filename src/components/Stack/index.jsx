import "../Stack/Stack.scss";

export default function Stack() {
  const stackList = [
    { id: 1, name: "React", icon: "../../../public/assets/React.webp" },
    { id: 2, name: "JavaScript", icon: "../../../public/assets/JS.webp" },
    { id: 3, name: "Sass", icon: "../../../public/assets/Sass.webp" },
    { id: 4, name: "NodeJS", icon: "../../../public/assets/NodeJS.webp" },
    { id: 5, name: "MongoDB", icon: "../../../public/assets/MongoDB.webp" },
    { id: 6, name: "Postman", icon: "../../../public/assets/Postman.webp" },
    { id: 7, name: "VsCode", icon: "../../../public/assets/VSCode.webp" },
    { id: 8, name: "Figma", icon: "../../../public/assets/Figma.webp" },
  ];
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
