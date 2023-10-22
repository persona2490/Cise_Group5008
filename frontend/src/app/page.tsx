"use client";
import React from "react";
import AppBar from "./components/navigation/AppBar";
import styles from "./HomePage.module.css"; // 导入CSS样式文件

const HomePage: React.FC = () => {
  return (
    <div>
      <AppBar title="Home Page" />

      <div className={styles.welcomeContainer}>
        <h1>Welcome to Speed</h1>
        <p>
        Meet SPEED, the ultimate resource for evidence-backed software engineering choices. It offers quick summaries of the latest research on diverse methods like Test-Driven Development. Designed for developers, researchers, and students, SPEED empowers you to make informed decisions, enhancing efficiency and reducing risks. Say goodbye to uncertainty and embrace evidence-based software engineering with SPEED!
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h2>Waterfall</h2>
            <p>
              Embrace the structured approach of Waterfall methodology for
              detailed project planning and execution. Achieve milestones
              seamlessly and ensure project success.
            </p>
          </div>
          <div className={styles.feature}>
            <h2>Agile</h2>
            <p>
              Experience the flexibility and adaptability of Agile methodology.
              Respond quickly to changes, enhance collaboration, and deliver
              high-quality results in iterative cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
