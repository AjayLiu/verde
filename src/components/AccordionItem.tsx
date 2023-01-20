const AccordionItem = ({ challenges }) => {
    const {prompt, description} = challenges;
    return (
        <li className = "accordion_item">
            <button classNAme="button">
                {prompt}
                <span classNAme="control">-</span>
            </button>
            <div className="answer_wrapper">
                <div className="answer">{answer}</div>
            </div>
        <li>
    )
}