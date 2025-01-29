import { useState } from "react";
import axios from "axios";

const App = () => {
    const emptyBundle = {
        skin: { name: "", image: "" },
        backbling: { name: "", image: "" },
        pickaxe: { name: "", image: "" },
        glider: { name: "", image: "" },
        emote: { name: "", image: "" },
    };

    const [bundle, setBundle] = useState(emptyBundle);

    const random = (items, type) => {
        const filtered = items.filter((i) => i.type.value === type);
        if (filtered.length === 0) return { name: "Не найдено", image: "" };

        const randomIndex = Math.floor(Math.random() * filtered.length);
        return {
            name: filtered[randomIndex].name,
            image: filtered[randomIndex].images.icon,
        };
    };

    const randomBundle = () => {
        axios
            .get("https://fortnite-api.com/v2/cosmetics/br")
            .then((res) => res.data.data)
            .then((data) => {
                setBundle({
                    skin: random(data, "outfit"),
                    backbling: random(data, "backpack"),
                    pickaxe: random(data, "pickaxe"),
                    glider: random(data, "glider"),
                    emote: random(data, "emote"),
                });
            })
            .catch((err) => console.error("Ошибка при получении данных:", err));
    };

    return (
        <>
            <div className="container">
                <h1>RANDOM BUNDLE</h1>
                <div className="items">
                    {Object.entries(bundle).map(([key, item]) => (
                        <div className="item" key={key}>
                            {item.image && (
                                <img src={item.image} alt={item.name} />
                            )}
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <button onClick={randomBundle}>GENERATE</button>
            </div>
        </>
    );
};

export default App;
