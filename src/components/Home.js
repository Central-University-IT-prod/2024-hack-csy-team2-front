import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Добро пожаловать на [Название сайта]</h1>
                <p>Ваш надежный помощник в управлении продуктами!</p>
            </header>
            <main className="home-main">
                <section className="home-description">
                    <h2>Наши функции:</h2>
                    <div className="function-wrapper">
                        {functionData.map((item, index) => (
                            <FunctionItem key={index} {...item} />
                        ))}
                    </div>
                </section>
                <section className="home-call-to-action">
                    <p>С [Название сайта] вы всегда будете уверены, что ваши продукты свежие, а запасы – оптимальны. Начните управлять своим холодильником и морозильником с легкостью уже сегодня!</p>
                </section>
            </main>
            <footer className="home-footer">
                <p>&copy; 2024 [Название сайта]. Все права защищены.</p>
            </footer>
        </div>
    );
};

const functionData = [
    {
        title: "Отслеживание сроков хранения",
        description: "Узнайте, сколько времени осталось до истечения срока годности ваших продуктов.",
        imageSrc: "http://surl.li/vzylok"
    },
    {
        title: "Напоминания",
        description: "Настраивайте уведомления о приближающихся сроках годности."
    },
    {
        title: "База рецептов",
        description: "Ищите любимые рецепты, чтобы готовить с удовольствием!",
        imageSrc: "http://surl.li/ntjysu"
    },
    {
        title: "Удобный интерфейс",
        description: "Легко добавляйте и управляйте списком продуктов."
    },
    {
        title: "Персонализированные списки",
        description: "Создавайте списки покупок и отслеживайте продукты.",
    
    }
];

const FunctionItem = ({ title, description, imageSrc }) => (
    <div className="function-list">
        {imageSrc && <img className="function-image" src={imageSrc} alt={title} />}
        <div className="function-text">
            <strong>{title}:</strong> {description}
        </div>
    </div>
);

export default Home;
