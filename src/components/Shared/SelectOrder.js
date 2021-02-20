const SelectOrder = ({ searchCriteria, handleClick }) => {
  return (
    <div>
      <select onChange={handleClick}>
        <option value="">Ordenar por</option>
        {searchCriteria.map((searchBy) => (
          <option value={searchBy.value}>{searchBy.text}</option>
        ))}
      </select>
    </div>)
}
export default SelectOrder;