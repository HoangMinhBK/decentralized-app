import MyWallet from "./MyWallet";
import Explorer from "./Explorer";

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <MyWallet />
        <Explorer />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 style={{ fontWeight: "normal" }}>
          Demo Front-End Decentralized Application
        </h5>
        <a href="https://techfi.tech/author/nguyen-luu-hoang-minh/">
          By Nguyen Luu Hoang Minh - TechFi
        </a>
      </div>
    </div>
  );
}

export default App;
