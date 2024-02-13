function OptionsGroup({filterName}) {
    return (
       <>
           {filterName.map((optionItem) => (
               <option key={optionItem} value={optionItem}>{optionItem}</option>
           ))}
       </>
    );
}

export {OptionsGroup}
