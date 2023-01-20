import { useState } from 'react';
import AccordionItem from "./AccordionItem";

const Accordion = () => {
    // Will populate challenges here
    return (
        <ul className="accordion">
            {challenges.map((challenges, index) => (
                <AccordionItem key={index} challenges={challenges} />
            ))}

const Accordion = () => {
    const [clicked, setClicked] = useState("0");

    return (
        //...
    );
    };

export default Accordion;