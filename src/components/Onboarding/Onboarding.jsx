import {onboardingStuff} from "../../utils/constants.js";
import styles from './Onboarding.module.scss';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Onboarding() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const isLastSlide = currentSlide === onboardingStuff.length - 1;
    const navigate = useNavigate();
    const nextSlide = () => {
        setCurrentSlide(currentSlide + 1);
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const skipAll = () => {
        setCurrentSlide(onboardingStuff.length - 1);
    };

    const redirectTo = () => {
        navigate('/registration')
    };

    return (
        <div className={styles.onboardingContainer}>
            <img src={onboardingStuff[currentSlide].slide} alt={onboardingStuff[currentSlide].id}/>
            <div className={styles.title}>{onboardingStuff[currentSlide].title}</div>
            <p className={styles.text}>{onboardingStuff[currentSlide].text}</p>
            <div className={styles.slideSwitching}>
                <button onClick={prevSlide} disabled={currentSlide === 0}>← Previous</button>
                <button onClick={nextSlide} disabled={currentSlide === onboardingStuff.length - 1}>Next →</button>
            </div>
            {isLastSlide ? (
                <button onClick={redirectTo} className={styles.skipBtn}>Go to user data</button>
            ) : (
                <>
                    {currentSlide < onboardingStuff.length - 1 && <button className={styles.skipBtn} onClick={skipAll}>Skip All</button>}
                </>
            )}
        </div>
    );
}

export {Onboarding};
