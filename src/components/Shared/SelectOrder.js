const SelectOrder = ({ sortCriteria, handleClick }) => {
  return (
    <div>
      <select onChange={handleClick}>
        <option value="">Ordenar por</option>
        {sortCriteria.map((sortBy) => (
          <option value={sortBy.value}>{sortBy.text}</option>
        ))}
      </select>
    </div>)
}
export default SelectOrder;